"use client";

import { useState, useMemo } from "react";
import { 
  Wand2, Users, Calendar, Sparkles, Download, MessageSquare, 
  BadgeCheck, Car, ShieldCheck, CheckCircle2, ChevronRight, Info 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateItineraryPDF } from "@/lib/pdfGenerator";

export default function AITripCustomizer() {
  const [destination, setDestination] = useState<string>("Gunung Bromo");
  const [duration, setDuration] = useState<string>("3D2N");
  const [passengers, setPassengers] = useState<number>(4);
  const [tripStyle, setTripStyle] = useState<"opentrip" | "family" | "luxury">("family");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Instant AI Customizer Calculation Engine
  const tripCalculation = useMemo(() => {
    let basePricePerPerson = 450000; // default Bromo midnight

    if (destination.includes("Bromo")) {
      basePricePerPerson = duration === "1D" ? 450000 : duration === "2D1N" ? 850000 : 1250000;
    } else if (destination.includes("Bali")) {
      basePricePerPerson = duration === "2D1N" ? 1250000 : duration === "3D2N" ? 1850000 : 2450000;
    } else if (destination.includes("Yogyakarta")) {
      basePricePerPerson = duration === "2D1N" ? 750000 : duration === "3D2N" ? 1150000 : 1550000;
    } else if (destination.includes("Malang")) {
      basePricePerPerson = duration === "2D1N" ? 650000 : duration === "3D2N" ? 950000 : 1350000;
    } else {
      basePricePerPerson = duration === "2D1N" ? 700000 : duration === "3D2N" ? 1100000 : 1500000;
    }

    // Adjust price multipliers based on Trip Style & Passenger Group Size
    let styleMultiplier = tripStyle === "opentrip" ? 0.85 : tripStyle === "family" ? 1.0 : 1.45;
    
    // Scale discount for larger group sizes
    let groupDiscount = passengers >= 15 ? 0.8 : passengers >= 7 ? 0.88 : passengers >= 4 ? 0.95 : 1.0;

    const pricePerPerson = Math.round((basePricePerPerson * styleMultiplier * groupDiscount) / 10000) * 10000;
    const totalPrice = pricePerPerson * passengers;
    const downPayment = Math.round(totalPrice * 0.3);

    // Fleet Recommendation logic
    let vehicle = "Toyota Avanza (MPV)";
    if (passengers <= 6) {
      vehicle = tripStyle === "luxury" ? "Toyota Innova Reborn Premium" : "Toyota Avanza (MPV)";
    } else if (passengers <= 7) {
      vehicle = "Toyota Innova Reborn";
    } else if (passengers <= 14) {
      vehicle = "Toyota Hiace Commuter (Minibus 14 Seat)";
    } else {
      vehicle = "Isuzu Elf Long (Minibus 19 Seat)";
    }

    // Dynamic Day-by-Day Itinerary Generation
    const dayByDay = [];
    if (duration === "1D") {
      dayByDay.push({
        day: "Hari 1",
        title: `Eksplorasi Midnight ${destination}`,
        activities: [
          `00:00 - Penjemputan peserta di area Jombang / Surabaya oleh driver profesional.`,
          `03:30 - Tiba di lokasi transit & penjelajahan wisata utama ${destination}.`,
          `06:00 - Nikmati pemandangan matahari terbit & spot foto terbaik.`,
          `10:00 - Kuliner lokal khas & perjalanan kembali ke kota asal.`,
        ],
      });
    } else if (duration === "2D1N") {
      dayByDay.push({
        day: "Hari 1",
        title: `Penjemputan & Check-In Hotel ${destination}`,
        activities: [
          `07:00 - Berangkat dari Jombang menuju ${destination} dengan armada AC nyaman.`,
          `12:00 - Makan siang kuliner khas lokal & check-in penginapan.`,
          `15:00 - Mengunjungi destinasi populer & wisata sunset.`,
        ],
      });
      dayByDay.push({
        day: "Hari 2",
        title: `Wisata Utama & Belanja Oleh-Oleh`,
        activities: [
          `07:30 - Breakfast hotel & check-out penginapan.`,
          `09:00 - Mengunjungi pusat kerajinan & pusat oleh-oleh khas.`,
          `14:00 - Perjalanan kembali ke Jombang, tour selesai dengan berkesan.`,
        ],
      });
    } else {
      dayByDay.push({
        day: "Hari 1",
        title: `Keberangkatan & Eksplorasi ${destination}`,
        activities: [
          `06:30 - Penjemputan peserta tour di Jombang & perjalanan nyaman.`,
          `13:00 - Check-in hotel bintang pilihan & istirahat sejenak.`,
          `16:00 - Wisata pantai / spot kuliner malam terfavorit.`,
        ],
      });
      dayByDay.push({
        day: "Hari 2",
        title: `Full Day Tour Destinasi Ikonik`,
        activities: [
          `08:00 - Penjelajahan 3 destinasi wisata utama & wahana rekreasi.`,
          `12:30 - Makan siang resto lokal include dalam paket.`,
          `18:00 - Sunset dinner & acara bebas ramah tamah rombongan.`,
        ],
      });
      dayByDay.push({
        day: "Hari 3",
        title: `Pusat Oleh-Oleh & Kepulangan`,
        activities: [
          `08:30 - Breakfast, check-out hotel, & wisata souvenir khas.`,
          `13:00 - Perjalanan kembali ke Jombang, pengantaran peserta ke titik asal.`,
        ],
      });
    }

    const highlights = [
      `Transportasi AC PP dari Jombang (${vehicle})`,
      tripStyle === "opentrip" ? "Penginapan sharing room AC" : tripStyle === "family" ? "Hotel Bintang 3 Nyaman" : "Hotel Bintang 4 VIP",
      "Tiket Masuk Semua Objek Wisata",
      "Driver Profesional, BBM, & Parkir Tol",
      "Makan Sesuai Program & Air Mineral Free",
    ];

    return {
      pricePerPerson,
      totalPrice,
      downPayment,
      recommendedVehicle: vehicle,
      dayByDay,
      highlights,
    };
  }, [destination, duration, passengers, tripStyle]);

  const handleBookingWA = () => {
    let msg = `Halo Mustika Travel, saya ingin booking Paket Custom Trip hasil AI Customizer:\n\n`;
    msg += `- *Destinasi:* ${destination}\n`;
    msg += `- *Durasi:* ${duration}\n`;
    msg += `- *Jumlah Peserta:* ${passengers} orang\n`;
    msg += `- *Gaya Trip:* ${tripStyle === "opentrip" ? "Open Trip Budget" : tripStyle === "family" ? "Family Private Trip" : "Private Luxury VIP"}\n`;
    msg += `- *Rekomendasi Armada:* ${tripCalculation.recommendedVehicle}\n`;
    msg += `- *Estimasi Harga:* Rp ${tripCalculation.pricePerPerson.toLocaleString("id-ID")}/orang (Total: Rp ${tripCalculation.totalPrice.toLocaleString("id-ID")})\n`;
    msg += `- *DP 30%:* Rp ${tripCalculation.downPayment.toLocaleString("id-ID")}\n\n`;
    msg += `Mohon konfirmasi jadwal & bantuan penguncian unit. Terima kasih!`;

    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      generateItineraryPDF({
        title: `Paket Custom ${destination} (${duration})`,
        destination,
        duration,
        passengerCount: passengers,
        tripStyle: tripStyle === "opentrip" ? "Open Trip Budget" : tripStyle === "family" ? "Family Private Trip" : "Private Luxury VIP",
        pricePerPerson: tripCalculation.pricePerPerson,
        totalPrice: tripCalculation.totalPrice,
        downPayment: tripCalculation.downPayment,
        recommendedVehicle: tripCalculation.recommendedVehicle,
        highlights: tripCalculation.highlights,
        dayByDay: tripCalculation.dayByDay,
      });
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setTimeout(() => setIsGeneratingPdf(false), 800);
    }
  };

  return (
    <section 
      id="ai-customizer" 
      className="py-16 md:py-24 bg-gradient-to-b from-brand-cream via-white to-brand-cream border-y border-slate-200 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 font-sans text-xs font-bold tracking-widest text-brand-orange uppercase shadow-2xs">
            <Wand2 className="h-4 w-4 animate-pulse" />
            AI Smart Budget & Trip Customizer
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-3 font-nunito tracking-tight">
            Rancang Paket Wisata Impian Anda <span className="text-brand-orange">Dalam 3 Detik</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Pilih destinasi, durasi, dan budget. AI kami secara instan meracik rincian jadwal, estimasi biaya total, dan brosur PDF resmi tanpa buat admin pusing!
          </p>
        </div>

        {/* MAIN CUSTOMIZER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INPUT CONTROLS */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <h3 className="font-nunito font-bold text-lg text-brand-dark flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="h-5 w-5 text-brand-orange" />
              Atur Kriteria Perjalanan
            </h3>

            {/* 1. DESTINATION SELECTOR */}
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                1. Pilih Destinasi Wisata
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-brand-dark focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 cursor-pointer"
              >
                <option value="Gunung Bromo">🌋 Gunung Bromo (Sunrise & Kawah)</option>
                <option value="Pulau Bali">🏖️ Pulau Bali (Kuta, Ubud, Jimbaran)</option>
                <option value="Yogyakarta">🏛️ Yogyakarta (Borobudur & Malioboro)</option>
                <option value="Malang & Batu">🎡 Malang & Kota Batu (Jatim Park)</option>
                <option value="Ziarah Wali Songo">🕌 Ziarah Wali Songo / Kustom</option>
              </select>
            </div>

            {/* 2. DURATION SELECTOR */}
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                2. Durasi Perjalanan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "1D", label: "1 Hari (Midnight)" },
                  { id: "2D1N", label: "2 Hari 1 Malam" },
                  { id: "3D2N", label: "3 Hari 2 Malam" },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      duration === d.id
                        ? "bg-brand-orange text-white border-brand-orange shadow-md shadow-brand-orange/20"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. PASSENGER COUNT STEPPER */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                  3. Jumlah Peserta Rombongan
                </label>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange font-extrabold text-xs">
                  {passengers} Orang
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span>1 Orang</span>
                <span>15 Orang (Minibus)</span>
                <span>30 Orang</span>
              </div>
            </div>

            {/* 4. TRIP STYLE RADIO */}
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                4. Gaya & Kelas Trip
              </label>
              <div className="space-y-2">
                {[
                  { id: "opentrip", title: "🎒 Open Trip Budget", desc: "Sharing group, hemat & ekonomis" },
                  { id: "family", title: "👨‍👩‍👧‍👦 Family Private Trip", desc: "Unit eksklusif, driver & hotel *3" },
                  { id: "luxury", title: "👑 Private Luxury VIP", desc: "Armada VIP, hotel *4, makan & dokumentasi" },
                ].map((style) => (
                  <label
                    key={style.id}
                    onClick={() => setTripStyle(style.id as any)}
                    className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                      tripStyle === style.id
                        ? "bg-brand-orange/5 border-brand-orange ring-1 ring-brand-orange/30"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="tripStyle"
                      checked={tripStyle === style.id}
                      onChange={() => {}}
                      className="mt-1 accent-brand-orange"
                    />
                    <div>
                      <span className="block text-xs font-bold text-brand-dark">{style.title}</span>
                      <span className="block text-[11px] text-slate-500">{style.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: AI INSTANT OUTPUT CARD */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-orange/30 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-orange/10 to-transparent w-48 h-48 rounded-bl-full pointer-events-none" />

            <div>
              {/* OUTPUT TITLE BAR */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand-orange">
                    <BadgeCheck className="h-3.5 w-3.5" /> Hasil Rekomendasi AI Instan
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-brand-dark font-nunito mt-0.5">
                    Paket {destination} ({duration})
                  </h4>
                </div>

                <div className="bg-brand-cream px-3.5 py-1.5 rounded-2xl border border-brand-orange/20 text-right">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Armada Rekomendasi</span>
                  <span className="text-xs font-extrabold text-brand-orange flex items-center gap-1">
                    <Car className="h-3.5 w-3.5" /> {tripCalculation.recommendedVehicle}
                  </span>
                </div>
              </div>

              {/* PRICING BREAKDOWN BANNER */}
              <div className="bg-brand-dark text-white rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-md">
                <div>
                  <span className="text-[10px] text-white/70 font-semibold uppercase block">Estimasi Per Orang</span>
                  <span className="text-lg font-extrabold text-white">
                    Rp {tripCalculation.pricePerPerson.toLocaleString("id-ID")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/70 font-semibold uppercase block">Total Biaya ({passengers} Orang)</span>
                  <span className="text-lg font-extrabold text-brand-orange-light">
                    Rp {tripCalculation.totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/70 font-semibold uppercase block">DP Wajib (30%)</span>
                  <span className="text-lg font-extrabold text-emerald-400">
                    Rp {tripCalculation.downPayment.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* DAY BY DAY RUNDOWN PREVIEW */}
              <div className="space-y-4 mb-6">
                <h5 className="text-xs font-bold text-brand-dark uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-brand-orange" />
                  Pratinjau Jadwal & Itinerary Interaktif
                </h5>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {tripCalculation.dayByDay.map((day, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-brand-orange text-white font-extrabold text-[10px]">
                          {day.day}
                        </span>
                        <span className="text-xs font-bold text-brand-dark">{day.title}</span>
                      </div>
                      <ul className="space-y-1 pl-1">
                        {day.activities.map((act, aIdx) => (
                          <li key={aIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <span className="text-brand-orange font-bold">•</span> {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleBookingWA}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold transition-all shadow-md shadow-brand-orange/25 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Booking Hasil AI via WA</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-brand-dark hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Download className="h-4 w-4 text-brand-orange-light" />
                <span>{isGeneratingPdf ? "Menyiapkan PDF..." : "Download E-Itinerary PDF Resmi"}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
