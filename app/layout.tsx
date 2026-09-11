import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beautydentalskin.example"),
  title: {
    default:
      "Beauty Dental & Skin — Odontología Estética y Armonización Facial | La Romana",
    template: "%s · Beauty Dental & Skin",
  },
  description:
    "Dra. Sindy Silvestre — Odontología estética y armonización facial en La Romana, República Dominicana. Diseño de sonrisa, carillas, blanqueamiento, implantes, toxina botulínica y rellenos con ácido hialurónico.",
  keywords: [
    "odontología estética",
    "armonización facial",
    "diseño de sonrisa",
    "carillas dentales",
    "blanqueamiento dental",
    "toxina botulínica",
    "ácido hialurónico",
    "estética facial",
    "Dra. Sindy Silvestre",
    "La Romana",
    "República Dominicana",
    "Beauty Dental Skin",
  ],
  authors: [{ name: "Beauty Dental & Skin" }],
  openGraph: {
    title: "Beauty Dental & Skin — La Romana",
    description:
      "Odontología estética y armonización facial en La Romana, República Dominicana. Dra. Sindy Silvestre.",
    type: "website",
    locale: "es_DO",
  },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/favicon.png",
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
