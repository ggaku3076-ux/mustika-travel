"use client";

import Image from "next/image";
import { Compass, Sparkles, Camera, Map } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="beranda" 
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark text-white"
      aria-labelledby="hero-title"
    >
      {/* BACKGROUND IMAGES */}
      <div className="absolute inset-0 hidden lg:block z-0" aria-hidden="true">
        <Image
          src="/Asset/BACKGROUND DEKSTOP.png"
          alt="Mustika Travel Desktop Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 block lg:hidden z-0" aria-hidden="true">
        <Image
          src="/Asset/BACKGROUND MOBILE.png"
          alt="Mustika Travel Mobile Background"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* SUBTLE OVERLAY FOR READABILITY (Very light, non-clashing) */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-10" />

      {/* MAIN CONTENT AREA */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-8 flex-grow flex flex-col justify-end pt-32 pb-4 lg:pb-6">
        <div className="max-w-lg text-center lg:text-left flex flex-col items-center lg:items-start gap-4 md:gap-6 mb-2 lg:mb-3">
          
          <h1 
            id="hero-title" 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight font-sans filter drop-shadow-md"
          >
            Explore the Beauty of <br className="hidden sm:inline" />
            <span className="text-white">Mount Bromo.</span>
          </h1>

          <p className="text-xs sm:text-sm lg:text-sm text-white/95 leading-relaxed max-w-md font-light filter drop-shadow-sm">
            Saksikan keindahan matahari terbit yang menakjubkan, bentangan pasir berbisik yang dramatis, dan petualangan yang tak terlupakan di destinasi paling ikonik Jawa Timur.
          </p>
        </div>

        {/* HERO FOOTER - Hidden on mobile to keep the mobile background clean and fully visible */}
        <div className="hidden md:grid grid-cols-12 gap-6 pt-3 border-t border-white/10 mt-3 items-center text-left w-full">
          <div className="col-span-5 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange-light">Best Experience</span>
              <span className="text-[11px] text-white/70">Tersedia Sepanjang Tahun</span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-2 text-white/80">
              <Camera className="h-4.5 w-4.5" />
              <Compass className="h-4.5 w-4.5" />
              <Map className="h-4.5 w-4.5" />
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </div>
          </div>

          <div className="col-span-7">
            <p className="text-xs text-white/75 leading-relaxed">
              Dari pemandangan matahari terbit yang memukau hingga hamparan laut pasir dan kawah vulkanik yang megah, Bromo menawarkan pengalaman ajaib yang tidak akan pernah Anda lupakan sepanjang hidup.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
