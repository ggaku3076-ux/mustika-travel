import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mustika Travel | Agen Perjalanan & Rental Mobil Terpercaya",
  description: "Mustika Travel melayani rental mobil, paket tour wisata, dan layanan travel antarkota berkualitas dengan armada lengkap dan pelayanan prima.",
  keywords: [
    "Mustika Travel",
    "Rental Mobil Jombang",
    "Paket Tour Wisata",
    "Travel Antarkota",
    "Sewa Mobil Murah",
    "Mustika Travel Jombang"
  ],
  authors: [{ name: "Mustika Travel Team" }],
  openGraph: {
    title: "Mustika Travel | Agen Perjalanan & Rental Mobil Terpercaya",
    description: "Mustika Travel melayani rental mobil, paket tour wisata, dan layanan travel antarkota berkualitas dengan armada lengkap dan pelayanan prima.",
    siteName: "Mustika Travel",
    locale: "id_ID",
    type: "website",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-light text-brand-dark selection:bg-brand-blue selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
