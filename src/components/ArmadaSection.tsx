import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, BadgeCheck } from "lucide-react";

export default function ArmadaSection() {
  const armadas = [
    {
      name: "Toyota Avanza",
      type: "MPV",
      capacity: "6 Penumpang",
      price: 350000,
      imagePath: "/Asset/AVANZA.webp",
      description: "Mobil keluarga sejuta umat yang hemat bahan bakar, sangat cocok untuk perjalanan dalam kota maupun luar kota.",
      features: ["AC Double Blower", "Driver Profesional", "BBM Tidak Termasuk"],
    },
    {
      name: "Toyota Innova Reborn",
      type: "MPV Premium",
      capacity: "7 Penumpang",
      price: 650000,
      imagePath: "/Asset/INOVA_REBORNN.webp",
      description: "Lebih lega, nyaman, suspensi empuk, dan tampilan elegan untuk perjalanan dinas maupun keluarga.",
      features: ["AC Dingin Nyaman", "Driver Profesional", "Audio System Premium"],
    },
    {
      name: "Toyota Hiace Commuter",
      type: "Minibus",
      capacity: "14 Penumpang",
      price: 1100000,
      imagePath: "/Asset/HIACE.webp",
      description: "Pilihan terbaik untuk rombongan wisata skala medium dengan kenyamanan suspensi layaknya sedan.",
      features: ["Kapasitas Lega", "Driver Berpengalaman", "Reclining Seats"],
    },
    {
      name: "Isuzu Elf Long",
      type: "Minibus",
      capacity: "19 Penumpang",
      price: 1200000,
      imagePath: "/Asset/ELF_LONG.webp",
      description: "Sangat cocok untuk rombongan wisata ziarah wali, kunjungan kerja instansi, atau reuni keluarga besar.",
      features: ["AC Ducting Dingin", "Driver & BBM Opsional", "Bagasi Luas"],
    },
  ];

  return (
    <section 
      id="armada" 
      className="bg-brand-cream pt-32 pb-16 md:pt-40 md:pb-24 border-y border-slate-200 relative overflow-hidden"
      aria-labelledby="armada-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 font-sans text-xs font-bold tracking-widest text-brand-orange uppercase">
            <BadgeCheck className="h-3.5 w-3.5" />
            Pilihan Armada Terbaik
          </span>

          <h2 
            id="armada-title" 
            className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-3 font-nunito"
          >
            Sewa Mobil Nyaman & Terawat
          </h2>
          <p className="text-base text-brand-dark/70 mt-4 font-light leading-relaxed">
            Mustika Travel berkomitmen menyajikan armada terawat, bersih, dan ber-AC dingin guna menjamin kelancaran aktivitas perjalanan Anda.
          </p>
        </div>

        {/* Armada Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {armadas.map((mobil, index) => {
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl border border-slate-200 hover:border-brand-orange flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full p-4 flex items-center justify-center">
                    <Image
                      src={mobil.imagePath}
                      alt={mobil.name}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-brand-orange bg-brand-cream px-3 py-1 rounded-full border border-brand-orange/15 shadow-xs">
                      {mobil.type}
                    </span>
                    <h3 className="text-xl font-bold text-brand-dark mt-3 font-nunito group-hover:text-brand-orange transition-colors">
                      {mobil.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-400 block mt-1">{mobil.capacity}</span>
                    <p className="text-sm text-brand-dark/65 leading-relaxed mt-3 font-light">{mobil.description}</p>
                    
                    {/* Mini Features */}
                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                      {mobil.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mulai Dari</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-xl font-extrabold text-brand-dark">
                        Rp {mobil.price.toLocaleString("id-ID")}<span className="text-xs font-normal text-slate-400">/hari</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-2xl bg-brand-cream border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 shadow-xs">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-base">Butuh Driver Tambahan atau Lepas Kunci?</h4>
              <p className="text-xs text-brand-dark/60 mt-1 font-light">Hubungi CS kami untuk konsultasi detail syarat lepas kunci atau ketersediaan driver berpengalaman.</p>
            </div>
          </div>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-orange px-6 py-3.5 text-xs font-bold text-white hover:bg-brand-orange-light transition-colors shadow-md shadow-brand-orange/20 shrink-0"
          >
            <span>Hubungi Admin</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
