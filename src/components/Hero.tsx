import { Calendar, Car, Shield, Award } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="beranda" 
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-brand-dark text-white pt-24"
      aria-labelledby="hero-title"
    >
      {/* Background color placeholder/visual layer without asset image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-dark via-slate-900 to-brand-blue/30" />

      {/* Main Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            
            <span className="px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/35 text-xs sm:text-sm font-bold text-brand-blue-light uppercase tracking-wider">
              Mustika Travel Jombang
            </span>

            <h1 
              id="hero-title" 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-nunito"
            >
              Perjalanan Nyaman,<br />
              <span className="text-brand-blue-light">Armada Terpercaya</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Kami melayani jasa rental mobil harian, bulanan, paket wisata kustom, ziarah wali songo, dan antar-jemput bandara dengan jaminan pelayanan prima & armada prima.
            </p>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mt-2">
              <a
                href="/booking"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-brand-blue px-8 py-4 text-sm font-bold text-white hover:bg-brand-blue-light transition-all duration-200 shadow-lg shadow-brand-blue/20"
              >
                <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
                <span>Booking Sekarang</span>
              </a>
              
              <a
                href="/paket"
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/20 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
              >
                <Car className="h-5 w-5 text-white" aria-hidden="true" />
                <span>Lihat Paket Tour</span>
              </a>
            </div>

            {/* Badges/USP */}
            <div className="grid grid-cols-3 gap-6 pt-8 w-full border-t border-white/10 mt-4">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <Shield className="h-5 w-5 text-brand-blue-light" />
                <span className="text-xs font-semibold text-slate-300">Aman & Nyaman</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <Award className="h-5 w-5 text-brand-blue-light" />
                <span className="text-xs font-semibold text-slate-300">Driver Profesional</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <Car className="h-5 w-5 text-brand-blue-light" />
                <span className="text-xs font-semibold text-slate-300">Armada Terbaru</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual illustration placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-brand-blue/20 to-brand-blue/5 border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white font-black text-xl">M</div>
                <span className="text-xs font-semibold px-3 py-1 bg-white/5 rounded-full border border-white/10 text-slate-400">Jombang, Jawa Timur</span>
              </div>
              <div className="flex flex-col gap-2 z-10">
                <h3 className="text-xl font-bold text-white font-nunito">Mau Liburan Kemana?</h3>
                <p className="text-xs text-slate-400">Tentukan destinasi Anda dan kami yang atur semuanya secara aman.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
