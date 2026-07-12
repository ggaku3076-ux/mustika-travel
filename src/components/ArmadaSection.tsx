import { ShieldCheck, UserCheck, Settings, Fuel, Heart } from "lucide-react";

export default function ArmadaSection() {
  const armadas = [
    {
      name: "Toyota Avanza",
      type: "MPV",
      capacity: "6 Penumpang",
      price: 350000,
      description: "Mobil keluarga sejuta umat yang hemat bahan bakar, sangat cocok untuk perjalanan dalam kota maupun luar kota.",
      features: ["AC Double Blower", "Driver Profesional", "BBM Tidak Termasuk"],
    },
    {
      name: "Toyota Innova Reborn",
      type: "MPV Premium",
      capacity: "7 Penumpang",
      price: 650000,
      description: "Lebih lega, nyaman, suspensi empuk, dan tampilan elegan untuk perjalanan dinas maupun keluarga.",
      features: ["AC Dingin Nyaman", "Driver Profesional", "Audio System Premium"],
    },
    {
      name: "Toyota Hiace Commuter",
      type: "Minibus",
      capacity: "14 Penumpang",
      price: 1100000,
      description: "Pilihan terbaik untuk rombongan wisata skala medium dengan kenyamanan suspensi layaknya sedan.",
      features: ["Kapasitas Lega", "Driver Berpengalaman", "Reclining Seats"],
    },
    {
      name: "Isuzu Elf Long",
      type: "Minibus",
      capacity: "19 Penumpang",
      price: 1200000,
      description: "Sangat cocok untuk rombongan wisata ziarah wali, kunjungan kerja instansi, atau reuni keluarga besar.",
      features: ["AC Ducting Dingin", "Driver & BBM Opsional", "Bagasi Luas"],
    },
  ];

  return (
    <section 
      id="armada" 
      className="bg-brand-blue-bg pt-32 pb-16 md:pt-40 md:pb-24 border-y border-brand-blue/10"
      aria-labelledby="armada-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold tracking-widest text-brand-blue uppercase">
            Pilihan Armada Terbaik
          </span>
          <h2 
            id="armada-title" 
            className="text-3xl font-extrabold text-brand-dark sm:text-4xl mt-3 font-nunito"
          >
            Sewa Mobil Nyaman & Terawat
          </h2>
          <p className="text-base text-brand-dark/70 mt-4">
            Mustika Travel berkomitmen menyajikan armada terawat, bersih, dan ber-AC dingin guna menjamin kelancaran aktivitas perjalanan Anda.
          </p>
        </div>

        {/* Armada Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {armadas.map((mobil, index) => {
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-brand-blue/10 hover:border-brand-blue transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-brand-blue bg-brand-blue-bg px-2.5 py-1 rounded-full">
                    {mobil.type}
                  </span>
                  <h3 className="text-xl font-bold text-brand-dark mt-4 font-nunito">{mobil.name}</h3>
                  <span className="text-xs text-slate-400 block mt-1">{mobil.capacity}</span>
                  <p className="text-sm text-brand-dark/60 leading-relaxed mt-4">{mobil.description}</p>
                  
                  {/* Mini Features */}
                  <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
                    {mobil.features.map((feat, idx) => (
                      <span key={idx} className="block text-xs text-slate-500">• {feat}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mulai Dari</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-extrabold text-brand-dark">
                      Rp {mobil.price.toLocaleString("id-ID")}<span className="text-xs font-normal text-slate-400">/hari</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-white border-2 border-brand-blue/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="h-10 w-10 rounded-full bg-brand-blue-bg flex items-center justify-center text-brand-blue shrink-0">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark">Butuh Driver Tambahan atau Lepas Kunci?</h4>
              <p className="text-xs text-brand-dark/60">Hubungi CS kami untuk konsultasi detail syarat lepas kunci atau ketersediaan driver berpengalaman.</p>
            </div>
          </div>
          <a
            href="/booking"
            className="rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-light transition-colors shrink-0"
          >
            Hubungi Admin
          </a>
        </div>
      </div>
    </section>
  );
}
