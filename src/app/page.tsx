"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import { Car, Compass, CalendarRange, MapPin, ArrowRight, BadgeCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";


export default function Home() {
  const portalCards = [
    {
      icon: Car,
      title: "Armada Rental",
      description: "Lihat pilihan unit mobil terbaik kami mulai dari Avanza, Innova, Hiace, hingga Elf yang siap digunakan.",
      href: "/armada",
      linkText: "Jelajahi Armada",
      badge: "Armada Terawat",
    },
    {
      icon: Compass,
      title: "Paket Wisata",
      description: "Pilihan destinasi tour menarik ke Bali, Malang, Jogja, Bromo, hingga ziarah Wali Songo.",
      href: "/paket",
      linkText: "Pilih Paket Wisata",
      badge: "Destinasi Favorit",
    },
    {
      icon: CalendarRange,
      title: "Pemesanan (Booking)",
      description: "Simulasi pemesanan sewa mobil dan paket tour secara cepat dan terintegrasi sistem.",
      href: "/booking",
      linkText: "Mulai Booking",
      badge: "Respon Cepat",
    },
    {
      icon: MapPin,
      title: "Kontak & Alamat",
      description: "Hubungi Customer Service kami dan temukan lokasi operasional Mustika Travel di Jombang.",
      href: "/lokasi",
      linkText: "Lihat Kontak",
      badge: "24 Jam Nonstop",
    },
  ];

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
    hidden: { opacity: 0, y: 36, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
      },
    },
  };


  return (
    <>
      <Hero />
      
      {/* Home Portal Navigation Grid */}
      <section 
        className="py-16 md:py-24 bg-brand-blue-bg border-t border-brand-blue/10 relative overflow-hidden"
        aria-labelledby="portal-title"
      >
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 font-sans text-xs font-bold tracking-widest text-brand-blue uppercase">
              <BadgeCheck className="h-3.5 w-3.5" />
              Layanan Perjalanan Kami
            </span>
            <h2 
              id="portal-title" 
              className="text-3xl font-extrabold text-brand-dark sm:text-4xl mt-4 tracking-tight"
            >
              Solusi Perjalanan Terbaik Anda
            </h2>
            <p className="text-base text-brand-dark/70 mt-4 leading-relaxed font-light">
              Pilih layanan di bawah ini untuk melihat detail paket sewa mobil, rute tour, simulasi pemesanan, atau untuk menghubungi tim CS kami.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {portalCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white p-7 rounded-3xl border border-brand-blue/15 hover:border-brand-blue flex flex-col justify-between items-start text-left shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 transition-shadow duration-300 relative group cursor-pointer"
                >
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center justify-between w-full">
                      <motion.div 
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className="h-12 w-12 rounded-2xl bg-brand-blue-bg border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0 shadow-xs group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300"
                      >
                        <IconComponent className="h-6 w-6" aria-hidden="true" />
                      </motion.div>
                      <span className="text-[10px] font-bold text-brand-blue bg-brand-blue-bg/80 px-2.5 py-1 rounded-full border border-brand-blue/15">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors duration-200 mt-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-brand-dark/60 leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>

                  <Link
                    href={card.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-blue group-hover:text-brand-blue-light transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden="true" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}

