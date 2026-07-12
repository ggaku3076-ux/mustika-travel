"use client";

import { useState, useMemo } from "react";
import { Users, Calendar, Award, CheckCircle2, ChevronRight, Car, Compass, Plane } from "lucide-react";

interface TransportService {
  id: string;
  name: string;
  maxCapacity: number;
  features: string[];
  description: string;
}

export default function AboutSection() {
  const [passengers, setPassengers] = useState<number>(4);
  const [serviceType, setServiceType] = useState<string>("rental");
  const [date, setDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("1");
  const [clientName, setClientName] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const services: TransportService[] = [
    {
      id: "avanza",
      name: "Toyota Avanza (MPV)",
      maxCapacity: 6,
      description: "Mobil keluarga ber-AC dingin, hemat BBM, dan lincah.",
      features: ["Kapasitas 6 Penumpang", "AC Dingin", "Driver Profesional", "Cocok Dalam & Luar Kota"],
    },
    {
      id: "innova",
      name: "Toyota Innova Reborn",
      maxCapacity: 7,
      description: "Kendaraan MPV premium dengan suspensi ternyaman di kelasnya.",
      features: ["Kapasitas 7 Penumpang", "Sangat Lega", "Driver Profesional", "Audio Premium"],
    },
    {
      id: "hiace",
      name: "Toyota Hiace / Elf",
      maxCapacity: 19,
      description: "Minibus ideal untuk rombongan wisata, ziarah, atau dinas kantor.",
      features: ["Kapasitas 14-19 Penumpang", "AC Ducting Dingin", "Suspensi Nyaman", "Bagasi Luas"],
    },
  ];

  // Recommendations based on passenger count
  const recommendedService = useMemo(() => {
    if (passengers <= 6) {
      return services.find((s) => s.id === "avanza") || services[0];
    } else if (passengers <= 7) {
      return services.find((s) => s.id === "innova") || services[1];
    } else {
      return services.find((s) => s.id === "hiace") || services[2];
    }
  }, [passengers]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !date) return;

    const typeLabel = 
      serviceType === "rental" ? "Rental Mobil + Driver" : 
      serviceType === "paket" ? "Paket Wisata Kustom" : 
      "Antar Jemput Bandara";

    let message = `Halo Mustika Travel, saya ingin menanyakan ketersediaan & booking armada:\n\n`;
    message += `- *Nama Pemesan:* ${clientName}\n`;
    message += `- *Layanan:* ${typeLabel}\n`;
    message += `- *Jumlah Penumpang:* ${passengers} orang\n`;
    message += `- *Tanggal Perjalanan:* ${date}\n`;
    message += `- *Durasi Sewa:* ${duration} Hari\n`;
    message += `- *Rekomendasi Armada:* ${recommendedService.name}\n\n`;
    message += `Mohon info harga total dan konfirmasi jadwal ketersediaan. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/628123456789?text=${encoded}`, "_blank");

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setClientName("");
      setDate("");
    }, 3000);
  };

  return (
    <section 
      id="booking" 
      className="bg-brand-cream pt-32 pb-16 md:pt-40 md:pb-24 border-y border-slate-200"
      aria-labelledby="booking-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold tracking-widest text-brand-orange uppercase">
            Form Pemesanan Mudah
          </span>
          <h2 
            id="booking-title" 
            className="text-3xl font-extrabold text-brand-dark sm:text-4xl mt-3 font-nunito"
          >
            Simulasi & Hubungi Kami
          </h2>
          <p className="text-base text-brand-dark/70 mt-4 font-light">
            Isi simulasi penumpang di bawah untuk melihat rekomendasi armada yang paling tepat dan hemat untuk kebutuhan Anda.
          </p>
        </div>

        {/* Form & Recommendation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">Nama Pemesan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange"
                />
              </div>

              {/* Jenis Layanan Custom Radio Cards */}
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-3">Jenis Layanan</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Option 1: Rental */}
                  <button
                    type="button"
                    onClick={() => setServiceType("rental")}
                    className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                      serviceType === "rental"
                        ? "border-brand-orange bg-brand-cream/50 ring-2 ring-brand-orange/20"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className={`p-2 rounded-xl mb-3 ${serviceType === "rental" ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-500"}`}>
                      <Car className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-brand-dark">Sewa Mobil</span>
                    <span className="text-[10px] text-slate-400 mt-1">Sewa unit mobil + driver harian</span>
                  </button>

                  {/* Option 2: Paket */}
                  <button
                    type="button"
                    onClick={() => setServiceType("paket")}
                    className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                      serviceType === "paket"
                        ? "border-brand-orange bg-brand-cream/50 ring-2 ring-brand-orange/20"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className={`p-2 rounded-xl mb-3 ${serviceType === "paket" ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-500"}`}>
                      <Compass className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-brand-dark">Paket Wisata</span>
                    <span className="text-[10px] text-slate-400 mt-1">Tur destinasi pilihan kustom</span>
                  </button>

                  {/* Option 3: Drop */}
                  <button
                    type="button"
                    onClick={() => setServiceType("drop")}
                    className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                      serviceType === "drop"
                        ? "border-brand-orange bg-brand-cream/50 ring-2 ring-brand-orange/20"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className={`p-2 rounded-xl mb-3 ${serviceType === "drop" ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-500"}`}>
                      <Plane className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-brand-dark">Antar-Jemput</span>
                    <span className="text-[10px] text-slate-400 mt-1">Layanan drop-off bandara/hotel</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">Jumlah Penumpang</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2">Durasi Sewa (Hari)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">Tanggal Berangkat</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-orange"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Membuka WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <span>Hubungi CS via WhatsApp</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Recommendation Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-orange text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/15 px-3 py-1 rounded-full">
                Rekomendasi Armada Anda
              </span>

              <h3 className="text-2xl font-bold mt-4 font-nunito">{recommendedService.name}</h3>
              <p className="text-xs text-white/85 mt-1 font-light">{recommendedService.description}</p>

              <div className="mt-6 space-y-3">
                {recommendedService.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex gap-4 items-center">
              <div className="h-10 w-10 bg-brand-cream border border-brand-orange/20 flex items-center justify-center text-brand-orange rounded-xl shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-brand-dark">Garansi Pelayanan</h4>
                <p className="text-xs text-slate-400 font-light">Armada mogok saat perjalanan? Kami kirim unit pengganti segera.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
