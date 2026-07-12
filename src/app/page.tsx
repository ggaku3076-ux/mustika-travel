import Link from "next/link";
import Hero from "@/components/Hero";
import { Car, Compass, CalendarRange, MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  const portalCards = [
    {
      icon: Car,
      title: "Armada Rental",
      description: "Lihat pilihan unit mobil terbaik kami mulai dari Avanza, Innova, Hiace, hingga Elf yang siap digunakan.",
      href: "/armada",
      linkText: "Jelajahi Armada",
    },
    {
      icon: Compass,
      title: "Paket Wisata",
      description: "Pilihan destinasi tour menarik ke Bali, Malang, Jogja, Bromo, hingga ziarah Wali Songo.",
      href: "/paket",
      linkText: "Pilih Paket Wisata",
    },
    {
      icon: CalendarRange,
      title: "Pemesanan (Booking)",
      description: "Simulasi pemesanan sewa mobil dan paket tour secara cepat dan terintegrasi sistem.",
      href: "/booking",
      linkText: "Mulai Booking",
    },
    {
      icon: MapPin,
      title: "Kontak & Alamat",
      description: "Hubungi Customer Service kami dan temukan lokasi operasional Mustika Travel di Jombang.",
      href: "/lokasi",
      linkText: "Lihat Kontak",
    },
  ];

  return (
    <>
      <Hero />
      
      {/* Home Portal Navigation Grid */}
      <section 
        className="py-16 md:py-24 bg-brand-blue-bg border-t border-brand-blue/10"
        aria-labelledby="portal-title"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-xs font-bold tracking-widest text-brand-blue uppercase">
              Layanan Perjalanan Kami
            </span>
            <h2 
              id="portal-title" 
              className="text-3xl font-extrabold text-brand-dark sm:text-4xl mt-3"
            >
              Solusi Perjalanan Anda
            </h2>
            <p className="text-base text-brand-dark/70 mt-4">
              Pilih layanan di bawah ini untuk melihat detail paket sewa mobil, rute tour, simulasi pemesanan, atau untuk menghubungi tim CS kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portalCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-brand-blue/10 hover:border-brand-blue transition-all duration-300 flex flex-col justify-between items-start text-left shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col gap-4">
                    <div className="h-12 w-12 rounded-xl bg-brand-blue-bg border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                      <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark">{card.title}</h3>
                    <p className="text-sm text-brand-dark/60 leading-relaxed">{card.description}</p>
                  </div>

                  <Link
                    href={card.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:text-brand-blue-light group"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
