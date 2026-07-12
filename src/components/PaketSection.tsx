"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Compass, Check, ArrowRight } from "lucide-react";

interface PaketTour {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  imagePath: string;
  features: string[];
  isPopular?: boolean;
}

export default function PaketSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const paketList: PaketTour[] = [
    {
      id: "pkg-1",
      name: "Paket Wisata Bali Premium",
      category: "wisata",
      price: 1850000,
      duration: "3 Hari 2 Malam",
      description: "Menjelajahi keindahan Kuta, Ubud, Tanah Lot, Uluwatu, dan kuliner khas Jimbaran dengan hotel bintang 3.",
      imagePath: "/Asset/BALI.png",
      features: ["Transportasi AC PP Jombang", "Hotel Bintang 3", "Tiket Masuk Wisata", "Makan & Driver Profesional"],
      isPopular: true,
    },
    {
      id: "pkg-2",
      name: "Trip Gunung Bromo Eksotis",
      category: "wisata",
      price: 450000,
      duration: "1 Hari (Midnight)",
      description: "Menikmati golden sunrise Bromo, Kawah Bromo, Pasir Berbisik, dan Bukit Teletubbies menggunakan Jeep 4x4.",
      imagePath: "/Asset/BROMO.png",
      features: ["Jeep Bromo", "Tiket Masuk TNBTS", "Driver & BBM", "Dokumentasi & Snack"],
      isPopular: true,
    },
    {
      id: "pkg-3",
      name: "Paket Wisata Yogyakarta Heritage",
      category: "wisata",
      price: 750000,
      duration: "2 Hari 1 Malam",
      description: "Destinasi Candi Borobudur, Malioboro, Kraton Yogyakarta, Tebing Breksi, dan Pantai Parangtritis.",
      imagePath: "/Asset/JOGJA.png",
      features: ["Penginapan AC", "Tiket Masuk Wisata", "Makan & Transportasi", "Driver Guide"],
    },
  ];

  const filteredPaket = useMemo(() => {
    return paketList.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  return (
    <section className="py-24 bg-brand-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">Destinasi Populer</span>
          <h2 className="text-4xl font-extrabold text-brand-dark mt-2 font-nunito">Paket Wisata Mustika Travel</h2>
          <p className="text-slate-500 mt-4 text-base font-light">
            Temukan berbagai rute pilihan terbaik dengan harga kompetitif dan fasilitas lengkap untuk liburan Anda.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="text-sm font-semibold text-slate-500">
            Menampilkan {filteredPaket.length} Paket Wisata Pilihan
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari destinasi wisata..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm text-slate-800 focus:outline-none focus:border-brand-orange"
            />
            <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        {/* Paket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPaket.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Header */}
              <div className="relative h-56 w-full bg-slate-100">
                <Image
                  src={pkg.imagePath}
                  alt={pkg.name}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Card Top */}
              <div className="p-6 md:p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-brand-orange bg-brand-cream px-3 py-1.5 rounded-full border border-brand-orange/10">
                    {pkg.duration}
                  </span>
                  {pkg.isPopular && (
                    <span className="text-xs font-bold text-white bg-brand-orange px-3 py-1.5 rounded-full">
                      Terlaris
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-brand-dark mb-3 font-nunito">{pkg.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 font-light">{pkg.description}</p>

                {/* Features List */}
                <div className="space-y-2.5">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-brand-orange shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-5 md:px-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mulai Dari</span>
                  <span className="text-lg font-extrabold text-brand-dark">
                    Rp {pkg.price.toLocaleString("id-ID")}
                  </span>
                </div>

                <a
                  href={`/booking?paket=${pkg.id}`}
                  className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                >
                  <span>Pesan</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPaket.length === 0 && (
          <div className="text-center py-20">
            <Compass className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Paket wisata tidak ditemukan.</p>
          </div>
        )}

      </div>
    </section>
  );
}
