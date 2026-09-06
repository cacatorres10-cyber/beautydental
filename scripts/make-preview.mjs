/**
 * Builds the single-file clickable preview from the running production site.
 *
 *   npm run build && npx next start -p 3111
 *   node scripts/make-preview.mjs
 *
 * It was written after a hand-maintained copy of the site drifted out of sync
 * with the real one. Everything is inlined because the preview is opened as a
 * standalone file with no server behind it: stylesheets, scripts and every
 * asset as a data URI.
 *
 * PREVIEW_OUT             where to write the file (default ./preview.html)
 * PREVIEW_LIGHT_MEDIA     a folder of smaller re-encodes, matched by file
 *                         name, used instead of the originals. Each asset
 *                         lands in the page twice, once in the markup and
 *                         once in the payload React hydrates from, so the
 *                         testimonial clips are worth shrinking first.
 */
import fs from "node:fs";
import path from "node:path";

const ORIGIN = "http://localhost:3111";
const OUT = process.env.PREVIEW_OUT ?? "preview.html";
const PUBLIC = path.join(process.cwd(), "public");

const MIME = {
  ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".svg": "image/svg+xml", ".avif": "image/avif",
  ".mp4": "video/mp4", ".webm": "video/webm", ".woff2": "font/woff2",
};

const text = async (u) => (await fetch(ORIGIN + u)).text();

// The preview carries every byte inline, and each asset lands in the page
// twice (once in the markup, once in the payload React hydrates from), so the
// testimonial clips are re-encoded small for this file only.
const LIGHT = process.env.PREVIEW_LIGHT_MEDIA ?? "";

const dataUri = (publicPath) => {
  const decoded = decodeURIComponent(publicPath);
  const light = LIGHT ? path.join(LIGHT, path.basename(decoded)) : "";
  const file = light && fs.existsSync(light) ? light : path.join(PUBLIC, decoded);
  const ext = path.extname(file).toLowerCase();
  const mime = MIME[ext];
  if (!mime || !fs.existsSync(file)) return null;
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
};

let html = await text("/");

// ---- Inline the stylesheets ----
const styleLinks = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)];
for (const [tag] of styleLinks) {
  const href = tag.match(/href="([^"]+)"/)?.[1];
  if (!href?.startsWith("/_next/")) continue;
  const css = await text(href);
  html = html.replace(tag, () => `<style>${css}</style>`);
}

// ---- Inline the scripts, keeping their order ----
const scriptTags = [...html.matchAll(/<script[^>]+src="([^"]+)"[^>]*><\/script>/g)];
for (const [tag, src] of scriptTags) {
  if (!src.startsWith("/_next/")) continue;
  if (/polyfills/.test(src)) { html = html.replace(tag, ""); continue; }
  // A literal </script inside a bundle would close the tag early.
  const js = (await text(src)).replace(/<\/script/gi, "<\\/script");
  html = html.replace(tag, () => `<script>${js}</script>`);
}

// The payload also asks the browser to preload the stylesheet that is now
// inlined; point it at nothing so it cannot 404.
html = html.replace(/\/_next\/static\/css\/[^"\\]+\.css/g, "data:text/css,");

// ---- Preloads point at files that will not exist; drop them ----
html = html.replace(/<link[^>]+rel="(preload|prefetch|preconnect|dns-prefetch)"[^>]*>/g, "");

// ---- Every local asset becomes a data URI ----
// The RSC payload escapes the surrounding quotes, so a match can pick up a
// trailing backslash, and a <video> src can carry a #t= fragment.
const assets = new Set();
for (const m of html.matchAll(/["'(\\](\/(?:images|media|brand)\/[^"')\\]+)/g)) {
  assets.add(m[1].replace(/#.*$/, ""));
}
// With an image opening, the video loop is never rendered: leaving its ~1MB
// out of the page costs nothing.
if (!html.includes('<video src="/media/hero.mp4')) assets.delete("/media/hero.mp4");

let embedded = 0;
const skipped = [];
for (const asset of [...assets].sort((a, b) => b.length - a.length)) {
  const uri = dataUri(asset);
  if (!uri) { skipped.push(asset); continue; }
  if (!html.includes(asset)) continue;
  html = html.split(asset).join(uri);
  embedded++;
}

// ---- The artifact viewer blocks outside frames ----
// The live site embeds Google Maps; here it would render blank, so the
// preview shows a card that opens the same map in a new tab instead.
html = html.replace(
  /<iframe[^>]*src="(https:\/\/www\.google\.com\/maps[^"]*)"[^>]*><\/iframe>/g,
  (_m, src) =>
    `<a href="${src.replace("&output=embed", "")}" target="_blank" rel="noopener noreferrer" ` +
    `style="display:flex;align-items:center;justify-content:center;min-height:22rem;height:100%;` +
    `background:linear-gradient(135deg,#f2ece0,#e6dcc4);color:#2a2620;text-decoration:none;` +
    `font:600 14px system-ui,sans-serif;letter-spacing:.02em;text-align:center;padding:24px">` +
    `<span><span style="display:block;font-size:30px;line-height:1">&#128205;</span>` +
    `<span style="display:block;margin-top:10px">La Romana, Rep. Dominicana</span>` +
    `<span style="display:block;margin-top:6px;font-weight:500;color:#b8912f">Abrir en Google Maps</span>` +
    `</span></a>`
);

// ---- Reshape into artifact body content ----
// Next puts most of its chunks in <head>, which the artifact host replaces
// with its own, so they move to the end of the page: by then the webpack
// runtime and the whole payload are on the page and the app hydrates.
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];

const keep = [...head.matchAll(/<(title|style)[\s\S]*?<\/\1>/g)].map((m) => m[0]).join("\n");
// A noModule polyfill bundle never runs in a browser that supports modules.
const headScripts = [...head.matchAll(/<script>[\s\S]*?<\/script>/g)].map((m) => m[0]);

const out = `${keep}
<meta name="viewport" content="width=device-width, initial-scale=1" />
${body}
${headScripts.join("\n")}`;

fs.writeFileSync(OUT, out);
console.log("styles:", styleLinks.length, "scripts inlined:", scriptTags.length,
  "| moved from head:", headScripts.length);
console.log("assets embedded:", embedded, "skipped:", skipped.length);
console.log("size:", (out.length / 1024 / 1024).toFixed(2), "MB");
