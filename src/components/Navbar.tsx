"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Paket Wisata", href: "/paket" },
    { name: "Armada", href: "/armada" },
    { name: "Booking", href: "/booking" },
    { name: "Kontak", href: "/lokasi" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent border-b border-white/10">
        <div className="mx-auto flex items-center justify-between max-w-7xl p-4 md:px-8">
          
          {/* Left: Logo Transparan */}
          <Link 
            href="/" 
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Mustika Travel - Kembali ke Beranda"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Asset/LOGO.png"
                alt="Mustika Travel Logo"
                className="h-full w-full object-contain filter drop-shadow-sm mix-blend-multiply bg-transparent"
              />
            </div>
            <span className="font-nunito font-semibold text-lg tracking-tight text-white leading-none">
              Mustika Travel
            </span>
          </Link>

          {/* Center: Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-brand-orange after:transition-all after:duration-300 ${
                    active 
                      ? "text-white after:w-1/2" 
                      : "text-white/80 hover:text-white after:w-0 hover:after:w-1/2"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all duration-300 bg-brand-orange text-white hover:bg-brand-orange-light shadow-sm"
            >
              <span>Booking Sekarang</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile: Hamburger / X toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center p-2 md:hidden text-white relative w-10 h-10"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            <Menu 
              className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`} 
              aria-hidden="true" 
            />
            <X 
              className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`} 
              aria-hidden="true" 
            />
          </button>
        </div>
      </header>

      {/* === MOBILE FULLSCREEN POPUP MENU === */}
      <div 
        className={`fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[998] md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-menu"
        className={`fixed inset-0 z-[999] flex items-center justify-center md:hidden pointer-events-none transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Mobile Navigation"
      >
        <div 
          className={`bg-brand-cream rounded-3xl shadow-2xl w-[85vw] max-w-sm p-8 flex flex-col items-center gap-5 transition-all duration-400 ease-out ${
            isOpen 
              ? "scale-100 translate-y-0 opacity-100 pointer-events-auto" 
              : "scale-90 translate-y-8 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Asset/LOGO.png"
                alt="Mustika Travel Logo"
                className="h-full w-full object-contain mix-blend-multiply bg-transparent"
              />
            </div>
            <span className="font-nunito font-semibold text-lg text-brand-dark tracking-tight">
              Mustika Travel
            </span>
          </div>

          <div className="w-12 h-0.5 bg-brand-orange/20 rounded-full" />

          {navLinks.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold tracking-wide transition-all duration-200 py-1.5 ${
                  active ? "text-brand-orange font-bold" : "text-brand-dark/70 hover:text-brand-orange"
                }`}
                style={{ transitionDelay: isOpen ? `${(i + 1) * 50}ms` : "0ms" }}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="w-12 h-0.5 bg-brand-orange/20 rounded-full" />

          <Link
            href="/booking"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-brand-orange py-3 text-sm font-bold text-white hover:bg-brand-orange-light transition-colors duration-200"
          >
            <span>Booking Sekarang</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
