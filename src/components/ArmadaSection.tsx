"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, BadgeCheck, Check, Fuel, UserCheck, Key, ShieldCheck, MessageSquare } from "lucide-react";

export default function ArmadaSection() {
  const [packageType, setPackageType] = useState<"driver" | "allin" | "selfdrive">("driver");

  const armadas = [
    {
      id: "avanza",
      name: "Toyota Avanza",
      type: "MPV (6 Penumpang)",
      imagePath: "/Asset/AVANZA.webp",
      description: "Mobil keluarga sejuta umat yang hemat bahan bakar, sangat cocok untuk perjalanan dalam kota maupun luar kota.",
      prices: {
        driver: 350000,
        allin: 600000,
        selfdrive: 275000,
      },
      features: {
        driver: ["AC Double Blower", "Driver Profesional", "BBM Sesuai Pemakaian", "Garansi Kebersihan Unit"],
        allin: ["AC Double Blower", "Driver Profesional", "BBM Free Sepenuhnya", "Bebas Biaya Tol & Parkir"],
        selfdrive: ["Unit Matic/Manual 24 Jam", "Lepas Kunci Tanpa Driver", "Syarat E-KTP & SIM A", "Asuransi Perjalanan"],
      },
    },
    {
      id: "innova",
      name: "Toyota Innova Reborn",
      type: "MPV Premium (7 Penumpang)",
      imagePath: "/Asset/INOVA_REBORNN.webp",
      description: "Lebih lega, nyaman, suspensi empuk, dan tampilan elegan untuk perjalanan dinas kantor maupun keluarga.",
      prices: {
        driver: 650000,
        allin: 950000,
        selfdrive: 500000,
      },
      features: {
        driver: ["Kabin Nyaman & Senyap", "Driver Senior Berpengalaman", "Audio System Premium", "AC Triple Blower"],
        allin: ["Kabin Nyaman & Senyap", "Driver Senior Berpengalaman", "BBM Free Sepenuhnya", "Bebas Biaya Tol & Parkir"],
        selfdrive: ["Unit Diesel Reborn 24 Jam", "Lepas Kunci Tanpa Driver", "Syarat E-KTP & SIM A", "Asuransi Perjalanan"],
      },
    },
    {
      id: "hiace",
      name: "Toyota Hiace Commuter",
      type: "Minibus (14 Penumpang)",
      imagePath: "/Asset/HIACE.webp",
      description: "Pilihan terbaik untuk rombongan wisata skala medium dengan kenyamanan suspensi empuk layaknya sedan.",
      prices: {
        driver: 1100000,
        allin: 1550000,
        selfdrive: null, // Minibus wajib dengan Driver
      },
      features: {
        driver: ["Kapasitas 14 Reclining Seats", "Driver Bus Profesional", "AC Ducting Dingin Merata", "Bagasi Rombongan Luas"],
        allin: ["Kapasitas 14 Reclining Seats", "Driver Bus Profesional", "BBM Minibus Free", "Bebas Biaya Tol & Parkir"],
        selfdrive: ["Wajib Menggunakan Driver Resmi Demi Keselamatan Rombongan"],
      },
    },
    {
      id: "elf",
      name: "Isuzu Elf Long",
      type: "Minibus (19 Penumpang)",
      imagePath: "/Asset/ELF_LONG.webp",
      description: "Sangat cocok untuk rombongan wisata ziarah wali, kunjungan kerja instansi, atau reuni keluarga besar.",
      prices: {
        driver: 1200000,
        allin: 1700000,
        selfdrive: null, // Minibus wajib dengan Driver
      },
      features: {
        driver: ["Kapasitas 19 Seats Spasios", "Driver Spesialis Minibus", "AC Per Kepala Colding", "Audio Karaoke Rombongan"],
        allin: ["Kapasitas 19 Seats Spasios", "Driver Spesialis Minibus", "BBM Minibus Free", "Bebas Biaya Tol & Parkir"],
        selfdrive: ["Wajib Menggunakan Driver Resmi Demi Keselamatan Rombongan"],
      },
    },
  ];

  const handleBookingWA = (mobilName: string, price: number | null) => {
    let typeName = packageType === "driver" ? "Mobil + Driver" : packageType === "allin" ? "ALL-IN (Mobil + Driver + BBM + Tol)" : "Lepas Kunci 24 Jam";
    let msg = `Halo Mustika Travel, saya ingin sewa unit *${mobilName}*:\n`;
    msg += `- *Paket Sewa:* ${typeName}\n`;
    if (price) {
      msg += `- *Harga Sewa:* Rp ${price.toLocaleString("id-ID")}/hari\n`;
    }
    msg += `Mohon info ketersediaan unit untuk tanggal yang saya butuhkan. Terima kasih!`;

    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section 
      id="armada" 
      className="bg-brand-cream pt-32 pb-16 md:pt-40 md:pb-24 border-y border-slate-200 relative overflow-hidden"
      aria-labelledby="armada-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange/10 font-sans text-xs font-bold tracking-widest text-brand-orange uppercase">
            <BadgeCheck className="h-3.5 w-3.5" />
            Pilihan Armada & Paket Sewa
          </span>

          <h2 
            id="armada-title" 
            className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-3 font-nunito"
          >
            Sewa Mobil Nyaman & Terawat
          </h2>
          <p className="text-base text-brand-dark/70 mt-4 font-light leading-relaxed">
            Pilih opsi paket sewa sesuai kebutuhan Anda: Lepas kunci hemat, dengan supir profesional, atau paket All-In tanpa pusing biaya BBM & Tol!
          </p>
        </div>

        {/* INTERACTIVE PACKAGE SELECTOR TOGGLE */}
        <div className="max-w-2xl mx-auto mb-14 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-2">
          {[
            { id: "driver", label: "👨‍✈️ Mobil + Supir", badge: "Favorit" },
            { id: "allin", label: "⛽ ALL-IN (Free BBM & Tol)", badge: "Corporate Choice" },
            { id: "selfdrive", label: "🔑 Lepas Kunci 24 Jam", badge: "Self-Drive" },
          ].map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setPackageType(pkg.id as any)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                packageType === pkg.id
                  ? "bg-brand-orange text-white border-brand-orange shadow-md shadow-brand-orange/20"
                  : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100"
              }`}
            >
              <span>{pkg.label}</span>
            </button>
          ))}
        </div>

        {/* ARMADA CARDS GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {armadas.map((mobil) => {
            const currentPrice = mobil.prices[packageType];
            const currentFeatures = mobil.features[packageType];
            const isUnavailableSelfdrive = packageType === "selfdrive" && currentPrice === null;

            return (
              <div 
                key={mobil.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-brand-orange flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full p-4 flex items-center justify-center">
                    <Image
                      src={mobil.imagePath}
                      alt={mobil.name}
                      fill
                      priority={mobil.id === "avanza" || mobil.id === "innova"}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase font-extrabold text-brand-orange bg-brand-cream px-2.5 py-1 rounded-full border border-brand-orange/15">
                        {mobil.type}
                      </span>

                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {packageType === "driver" ? "Plus Driver" : packageType === "allin" ? "All-In BBM" : "Self-Drive"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-dark font-nunito group-hover:text-brand-orange transition-colors">
                      {mobil.name}
                    </h3>

                    <p className="text-sm text-brand-dark/65 leading-relaxed mt-3 font-light">{mobil.description}</p>
                    
                    {/* Features List for Selected Package */}
                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                      {currentFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${isUnavailableSelfdrive ? "text-amber-500" : "text-brand-orange"}`} />
                          <span className={isUnavailableSelfdrive ? "text-slate-400 italic" : ""}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Booking Footer */}
                  <div className="mt-6 border-t border-slate-100 pt-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {isUnavailableSelfdrive ? "Status Unit" : "Tarif Sewa"}
                      </span>
                      {currentPrice ? (
                        <span className="text-xl font-extrabold text-brand-dark">
                          Rp {currentPrice.toLocaleString("id-ID")}<span className="text-xs font-normal text-slate-400">/hari</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                          Khusus Driver
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookingWA(mobil.name, currentPrice)}
                      disabled={isUnavailableSelfdrive}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-light disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{isUnavailableSelfdrive ? "Hanya Plus Driver" : "Pesan Paket Ini via WA"}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM BANNER */}
        <div className="mt-16 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-2xl bg-brand-cream border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 shadow-xs">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-base">Butuh Penyesuaian Durasi atau Rute Luar Kota?</h4>
              <p className="text-xs text-brand-dark/60 mt-1 font-light">Tim CS Mustika Travel siap 24 jam membantu menghitungkan paket hemat khusus rombongan Anda.</p>
            </div>
          </div>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-orange px-6 py-3.5 text-xs font-bold text-white hover:bg-brand-orange-light transition-colors shadow-md shadow-brand-orange/20 shrink-0"
          >
            <span>Konsultasi Gratis via WA</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
