"use client";

import { useState, useMemo } from "react";
import { Users, Calendar, Award, CheckCircle2, ChevronRight, Car, Compass, Plane, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="bg-brand-cream pt-32 pb-16 md:pt-40 md:pb-24 border-y border-slate-200 relative overflow-hidden"
      aria-labelledby="booking-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 font-sans text-xs font-bold tracking-widest text-brand-orange uppercase">
            <BadgeCheck className="h-3.5 w-3.5" />
            Form Pemesanan Mudah
          </span>

          <h2 
            id="booking-title" 
            className="text-3xl font-extrabold text-brand-dark sm:text-4xl mt-3 font-nunito"
          >
            Simulasi & Hubungi Kami
          </h2>
          <p className="text-base text-brand-dark/70 mt-4 font-light leading-relaxed">
            Isi simulasi penumpang di bawah untuk melihat rekomendasi armada yang paling tepat dan hemat untuk kebutuhan Anda.
          </p>
        </motion.div>

        {/* Form & Recommendation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-2">Nama Pemesan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 transition-all"
                />
              </div>

              {/* Jenis Layanan Custom Radio Cards with layoutId smooth selector */}
              <div>
                <label className="block text-sm font-bold text-brand-dark mb-3">Jenis Layanan</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Option 1: Rental */}
                  <button
                    type="button"
                    onClick={() => setServiceType("rental")}
                    className="relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all overflow-hidden cursor-pointer"
                  >
                    {serviceType === "rental" && (
                      <motion.div 
                        layoutId="activeServiceIndicator"
                        className="absolute inset-0 bg-brand-cream/80 border-2 border-brand-orange rounded-2xl"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-start">
                      <div className={`p-2.5 rounded-xl mb-3 transition-colors ${serviceType === "rental" ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-500"}`}>
                        <Car className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-brand-dark">Sewa Mobil</span>
                      <span className="text-[10px] text-slate-500 mt-1 font-light">Sewa unit mobil + driver harian</span>
                    </div>
                  </button>

                  {/* Option 2: Paket */}
                  <button
                    type="button"
                    onClick={() => setServiceType("paket")}
                    className="relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all overflow-hidden cursor-pointer"
                  >
                    {serviceType === "paket" && (
                      <motion.div 
                        layoutId="activeServiceIndicator"
                        className="absolute inset-0 bg-brand-cream/80 border-2 border-brand-orange rounded-2xl"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-start">
                      <div className={`p-2.5 rounded-xl mb-3 transition-colors ${serviceType === "paket" ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-500"}`}>
                        <Compass className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-brand-dark">Paket Wisata</span>
                      <span className="text-[10px] text-slate-500 mt-1 font-light">Tur destinasi pilihan kustom</span>
                    </div>
                  </button>

                  {/* Option 3: Drop */}
                  <button
                    type="button"
                    onClick={() => setServiceType("drop")}
                    className="relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all overflow-hidden cursor-pointer"
                  >
                    {serviceType === "drop" && (
                      <motion.div 
                        layoutId="activeServiceIndicator"
                        className="absolute inset-0 bg-brand-cream/80 border-2 border-brand-orange rounded-2xl"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-start">
                      <div className={`p-2.5 rounded-xl mb-3 transition-colors ${serviceType === "drop" ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-500"}`}>
                        <Plane className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-brand-dark">Antar-Jemput</span>
                      <span className="text-[10px] text-slate-500 mt-1 font-light">Layanan drop-off bandara/hotel</span>
                    </div>
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
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 transition-all"
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
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 transition-all"
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitted}
                className="w-full py-4 rounded-2xl bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-brand-orange/20 cursor-pointer"
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
              </motion.button>

            </form>
          </motion.div>

          {/* Right Column: Recommendation Preview with AnimatePresence */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-brand-orange text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full">
                Rekomendasi Armada Anda
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={recommendedService.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold mt-4 font-nunito">{recommendedService.name}</h3>
                  <p className="text-xs text-white/90 mt-1.5 font-light leading-relaxed">{recommendedService.description}</p>

                  <div className="mt-6 space-y-3">
                    {recommendedService.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-medium">
                        <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex gap-4 items-center shadow-xs">
              <div className="h-11 w-11 bg-brand-cream border border-brand-orange/20 flex items-center justify-center text-brand-orange rounded-2xl shrink-0 shadow-xs">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-brand-dark">Garansi Pelayanan</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Armada mogok saat perjalanan? Kami kirim unit pengganti segera.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

