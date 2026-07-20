"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Compass, Check, ArrowRight, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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
      imagePath: "/Asset/BALI.webp",
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
      imagePath: "/Asset/BROMO.webp",
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
      imagePath: "/Asset/JOGJA.webp",
      features: ["Penginapan AC", "Tiket Masuk Wisata", "Makan & Transportasi", "Driver Guide"],
    },
  ];


  const filteredPaket = useMemo(() => {
    return paketList.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 36, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 pt-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-xs font-bold uppercase tracking-widest text-brand-orange">
            <BadgeCheck className="h-3.5 w-3.5" />
            Destinasi Populer
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mt-3 font-nunito">Paket Wisata Mustika Travel</h2>
          <p className="text-slate-500 mt-4 text-base font-light leading-relaxed">
            Temukan berbagai rute pilihan terbaik dengan harga kompetitif dan fasilitas lengkap untuk liburan Anda.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12"
        >
          <div className="text-sm font-semibold text-slate-500">
            Menampilkan <span className="text-brand-orange font-bold">{filteredPaket.length}</span> Paket Wisata Pilihan
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari destinasi wisata..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/15 transition-all shadow-xs"
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </motion.div>

        {/* Paket Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPaket.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-orange/10 transition-shadow duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Card Image Header with Zoom effect */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <motion.div 
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full w-full gpu-layer"
                  >
                    <Image
                      src={pkg.imagePath}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </div>

                {/* Card Top */}
                <div className="p-6 md:p-8 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-brand-orange bg-brand-cream px-3 py-1.5 rounded-full border border-brand-orange/15 shadow-xs">
                      {pkg.duration}
                    </span>
                    {pkg.isPopular && (
                      <span className="text-xs font-bold text-white bg-brand-orange px-3 py-1.5 rounded-full shadow-xs">
                        Terlaris
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark mb-3 font-nunito group-hover:text-brand-orange transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 font-light">{pkg.description}</p>

                  {/* Features List */}
                  <div className="space-y-2.5">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
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
                    <span className="text-xl font-extrabold text-brand-dark">
                      Rp {pkg.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <Link
                    href={`/booking?paket=${pkg.id}`}
                    className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
                  >
                    <span>Pesan</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPaket.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-slate-200 mt-6"
          >
            <Compass className="h-12 w-12 text-slate-300 mx-auto mb-4 animate-spin-slow" />
            <p className="text-slate-500 font-medium">Paket wisata "{searchQuery}" tidak ditemukan.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs text-brand-orange font-bold hover:underline"
            >
              Reset Pencarian
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}

