"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, Camera, Map, ArrowRight, Star } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };


  return (
    <section 
      id="beranda" 
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark text-white"
      aria-labelledby="hero-title"
    >
      {/* BACKGROUND IMAGES WITH SMOOTH FADE-IN */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 hidden lg:block z-0" 
        aria-hidden="true"
      >
        <Image
          src="/Asset/BACKGROUND DEKSTOP.png"
          alt="Mustika Travel Desktop Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center gpu-layer"
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 block lg:hidden z-0" 
        aria-hidden="true"
      >
        <Image
          src="/Asset/BACKGROUND MOBILE.png"
          alt="Mustika Travel Mobile Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center gpu-layer"
        />
      </motion.div>

      {/* OVERLAY FOR TEXT READABILITY & DEPTH */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none z-10" />

      {/* MAIN CONTENT AREA */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-8 flex-grow flex flex-col justify-end pt-32 pb-6 lg:pb-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start gap-4 md:gap-5 mb-4"
        >
          {/* FLOATING BADGE */}
          <motion.div variants={badgeVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-ping" />
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
            <span>Layanan Travel & Rental Terbaik Jombang</span>
          </motion.div>
          
          {/* MAIN HEADING WITH STAGGERED TEXT REVEAL */}
          <motion.h1 
            id="hero-title" 
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-sans drop-shadow-md"
          >
            Explore the Beauty of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Mount Bromo.
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg font-light drop-shadow-sm"
          >
            Saksikan keindahan matahari terbit yang menakjubkan, bentangan pasir berbisik yang dramatis, dan petualangan yang tak terlupakan di destinasi paling ikonik Jawa Timur.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm shadow-lg shadow-brand-orange/30 transition-colors duration-200"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/paket"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-semibold text-sm transition-colors duration-200"
              >
                <Compass className="h-4 w-4 text-blue-200" />
                <span>Lihat Paket Wisata</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* HERO FOOTER - ENHANCED STATS BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:grid grid-cols-12 gap-6 pt-4 border-t border-white/15 mt-4 items-center text-left w-full backdrop-blur-xs"
        >
          <div className="col-span-5 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange-light flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> Best Experience
              </span>
              <span className="text-[11px] text-white/80">Tersedia Sepanjang Tahun</span>
            </div>
            <div className="h-7 w-px bg-white/20" />
            <div className="flex items-center gap-2.5 text-white/80">
              <Camera className="h-4 w-4 hover:text-white transition-colors" />
              <Compass className="h-4 w-4 hover:text-white transition-colors" />
              <Map className="h-4 w-4 hover:text-white transition-colors" />
              <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
            </div>
          </div>

          <div className="col-span-7">
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Dari pemandangan matahari terbit yang memukau hingga hamparan laut pasir dan kawah vulkanik yang megah, Bromo menawarkan pengalaman ajaib yang tidak akan pernah Anda lupakan sepanjang hidup.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
