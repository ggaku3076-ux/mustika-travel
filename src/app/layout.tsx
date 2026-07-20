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
  title: "Mustika Travel | Jelajahi Keindahan Gunung Bromo",
  description: "Mustika Travel melayani rental mobil, paket tour wisata Gunung Bromo, dan layanan perjalanan antarkota berkualitas di Jombang.",
  keywords: [
    "Mustika Travel",
    "Rental Mobil Jombang",
    "Paket Wisata Bromo",
    "Ziarah Wali Songo",
    "Sewa Hiace Jombang",
    "Sewa Mobil Murah Jombang"
  ],
  authors: [{ name: "Mustika Travel Team" }],
  openGraph: {
    title: "Mustika Travel | Jelajahi Keindahan Gunung Bromo",
    description: "Mustika Travel melayani rental mobil, paket tour wisata Gunung Bromo, dan layanan perjalanan antarkota berkualitas di Jombang.",
    siteName: "Mustika Travel",
    locale: "id_ID",
    type: "website",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

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
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-dark selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

