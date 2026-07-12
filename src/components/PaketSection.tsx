"use client";

import { useState, useMemo } from "react";
import { Search, Compass, Check, Calendar, ArrowRight } from "lucide-react";

interface PaketTour {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export default function PaketSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Semua Paket" },
    { id: "wisata", name: "Wisata Alam & Budaya" },
    { id: "religi", name: "Religi & Ziarah" },
    { id: "kustom", name: "Kustom / Open Trip" },
  ];

  const paketList: PaketTour[] = [
    {
      id: "pkg-1",
      name: "Paket Wisata Bali Premium",
      category: "wisata",
      price: 1850000,
      duration: "3 Hari 2 Malam",
      description: "Menjelajahi keindahan Kuta, Ubud, Tanah Lot, Uluwatu, dan kuliner khas Jimbaran dengan hotel bintang 3.",
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
      features: ["Jeep Bromo", "Tiket Masuk TNBTS", "Driver & BBM", "Dokumentasi & Snack"],
      isPopular: true,
    },
    {
      id: "pkg-3",
      name: "Ziarah Wali Limo Jawa Timur",
      category: "religi",
      price: 350000,
      duration: "1 Hari",
      description: "Ziarah ke makam Sunan Ampel, Sunan Giri, Sunan Maulana Malik Ibrahim, Sunan Drajat, dan Sunan Bonang.",
      features: ["Bus Pariwisata AC", "Driver & BBM", "Buku Yasin & Doa", "Air Mineral"],
    },
    {
      id: "pkg-4",
      name: "Ziarah Wali Songo (9 Wali)",
      category: "religi",
      price: 1200000,
      duration: "4 Hari 3 Malam",
      description: "Rangkaian ziarah lengkap makam Wali Songo di Jawa Timur, Jawa Tengah, hingga Jawa Barat.",
      features: ["Bus Eksekutif", "Penginapan AC", "Konsumsi 3x Sehari", "Guide Ziarah & Driver"],
    },
    {
      id: "pkg-5",
      name: "Paket Wisata Yogyakarta Heritage",
      category: "wisata",
      price: 750000,
      duration: "2 Hari 1 Malam",
      description: "Destinasi Candi Borobudur, Malioboro, Kraton Yogyakarta, Tebing Breksi, dan Pantai Parangtritis.",
      features: ["Penginapan AC", "Tiket Masuk Wisata", "Makan & Transportasi", "Driver Guide"],
    },
    {
      id: "pkg-6",
      name: "Kustom Group Tour Jombang",
      category: "kustom",
      price: 250000,
      duration: "Fleksibel",
      description: "Buat paket wisata kustom Anda sendiri untuk instansi, sekolah, reuni, atau rombongan keluarga besar.",
      features: ["Rute Bebas Pilih", "Pilihan Armada Fleksibel", "Konsumsi Sesuai Budget", "Pemandu Wisata"],
    },
  ];

  const filteredPaket = useMemo(() => {
    return paketList.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-24 bg-brand-light">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">Destinasi Populer</span>
          <h2 className="text-4xl font-extrabold text-brand-dark mt-2 font-nunito">Paket Wisata Mustika Travel</h2>
          <p className="text-slate-500 mt-4 text-base">
            Temukan berbagai rute pilihan terbaik dengan harga kompetitif dan fasilitas lengkap untuk liburan Anda.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/10"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari destinasi wisata..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
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
              {/* Card Top */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue-bg px-3 py-1.5 rounded-full">
                    {pkg.duration}
                  </span>
                  {pkg.isPopular && (
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                      Terlaris
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-brand-dark mb-3 font-nunito">{pkg.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{pkg.description}</p>

                {/* Features List */}
                <div className="space-y-2.5">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-brand-blue shrink-0" />
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
                  className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
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
