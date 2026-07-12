"use client";

import Image from "next/image";
import { useState } from "react";
import { Compass, Calendar, Users, MapPin, Sparkles, Camera, Map } from "lucide-react";

export default function Hero() {
  const [location, setLocation] = useState("Mount Bromo, East Java");
  const [date, setDate] = useState("2026-05-24");
  const [guests, setGuests] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Mustika Travel, saya ingin memesan paket wisata:\n- Destinasi: ${location}\n- Tanggal: ${date}\n- Jumlah Pax: ${guests} Orang`;
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(message)}`, "_blank");
  };

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

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-brand-dark/30 pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-brand-dark/85 via-brand-dark/40 to-transparent pointer-events-none z-10" />

      {/* BACKGROUND WATERMARK TEXT */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 select-none hidden lg:block overflow-hidden">
        <span className="font-nunito font-black text-[22vw] text-white/5 tracking-widest leading-none uppercase">
          BROMO
        </span>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 md:px-8 flex-grow flex flex-col justify-end pt-28 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
          
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 md:gap-6 lg:mb-8">
            <h1 
              id="hero-title" 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-nunito filter drop-shadow-md"
            >
              Explore the Beauty of <br className="hidden sm:inline" />
              <span className="text-brand-orange">Mount Bromo.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl font-light filter drop-shadow-sm">
              Saksikan keindahan matahari terbit yang menakjubkan, bentangan pasir berbisik yang dramatis, dan petualangan yang tak terlupakan di destinasi paling ikonik Jawa Timur.
            </p>
          </div>

          {/* Right Column: Search Widget */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end lg:mb-8">
            <form 
              onSubmit={handleSearch}
              className="w-full max-w-md bg-white text-brand-dark p-6 rounded-3xl border border-slate-100 shadow-2xl flex flex-col gap-4"
            >
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Cari Tujuan</span>
                <h3 className="font-nunito font-bold text-lg text-slate-800">Mulai Petualangan</h3>
              </div>

              {/* Location Input */}
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-brand-orange" />
                  <span>Lokasi Destinasi</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-brand-orange"
                >
                  <option value="Mount Bromo, East Java">📍 Gunung Bromo, Jawa Timur</option>
                  <option value="Kuta Beach, Bali">📍 Pantai Kuta, Bali</option>
                  <option value="Yogyakarta, Central Java">📍 Candi Borobudur, Yogyakarta</option>
                  <option value="Wali Songo Pilgrimage">📍 Ziarah Wali Songo, Jawa</option>
                </select>
              </div>

              {/* Date & Guest row */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-brand-orange" />
                    <span>Tanggal</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-brand-orange" />
                    <span>Jumlah Orang</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md shadow-brand-orange/15 flex items-center justify-center gap-2 mt-2"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Now</span>
              </button>
            </form>
          </div>

        </div>

        {/* HERO FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/10 mt-8 items-center text-left w-full">
          <div className="md:col-span-5 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Best Experience</span>
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

          <div className="md:col-span-7">
            <p className="text-xs text-white/75 leading-relaxed">
              Dari pemandangan matahari terbit yang memukau hingga hamparan laut pasir dan kawah vulkanik yang megah, Bromo menawarkan pengalaman ajaib yang tidak akan pernah Anda lupakan sepanjang hidup.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
