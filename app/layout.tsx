import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beautydentalskin.example"),
  title: {
    default: "Beauty Dental & Skin — Odontología estética y facial | La Romana",
    template: "%s · Beauty Dental & Skin",
  },
  description:
    "Clínica de odontología estética y estética facial en La Romana, República Dominicana. Diseño de sonrisa, carillas, blanqueamiento, ortodoncia, implantes y tratamientos de piel. Aesthetic dentistry and facial care.",
  keywords: [
    "odontología estética",
    "diseño de sonrisa",
    "carillas dentales",
    "blanqueamiento dental",
    "estética facial",
    "La Romana",
    "República Dominicana",
    "Beauty Dental Skin",
    "aesthetic dentistry",
  ],
  authors: [{ name: "Beauty Dental & Skin" }],
  openGraph: {
    title: "Beauty Dental & Skin — La Romana",
    description:
      "Odontología estética y estética facial de lujo en La Romana, República Dominicana.",
    type: "website",
    locale: "es_DO",
  },
  icons: {
    icon: "/brand/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
