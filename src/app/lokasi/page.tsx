import { MapPin, Phone, Mail, Clock, Compass, MessageSquare } from "lucide-react";

export default function LokasiPage() {
  return (
    <section 
      className="bg-brand-cream pt-32 pb-16 md:pt-40 md:pb-24"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold tracking-widest text-brand-orange uppercase">
            HUBUNGI KAMI & LOKASI
          </span>
          <h1 
            id="contact-title" 
            className="text-3xl font-extrabold text-brand-dark sm:text-4xl mt-3 font-nunito"
          >
            Kontak Mustika Travel
          </h1>
          <p className="text-base text-brand-dark/70 mt-4 font-light">
            Kami siap melayani kebutuhan transportasi, rental mobil, dan paket tour Anda 24 jam nonstop. Hubungi kami melalui kontak di bawah ini.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
          
          {/* Details & Contacts (Left) */}
          <div className="flex flex-col gap-8 text-left">
            <div>
              <h2 className="text-xl font-bold text-brand-dark mb-4 font-nunito">Informasi Kontak</h2>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">Alamat Lengkap</h3>
                    <p className="text-sm text-brand-dark/70 mt-1 leading-relaxed font-light">
                      Kabupaten Jombang, Jawa Timur
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">Nomor Telepon & WhatsApp</h3>
                    <p className="text-sm text-brand-dark/70 mt-1">
                      <a href="tel:+628123456789" className="hover:text-brand-orange transition-colors">
                        0812-3456-789
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">Email Resmi</h3>
                    <p className="text-sm text-brand-dark/70 mt-1">
                      <a href="mailto:info@mustikatravel.com" className="hover:text-brand-orange transition-colors">
                        info@mustikatravel.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-dark mb-4 font-nunito">Jam Operasional</h2>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark text-sm">Buka Setiap Hari</h3>
                  <p className="text-sm text-brand-dark/70 mt-1 font-light">
                    24 Jam Nonstop (Layanan Reservasi & Perjalanan)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Wireframe & Directions (Right) */}
          <div className="flex flex-col gap-6 p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl">
            <h2 className="text-xl font-bold text-brand-dark text-left font-nunito">Peta Lokasi</h2>
            
            {/* Visual map wireframe */}
            <div className="relative aspect-[16/10] w-full rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-10">
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-r border-b border-brand-orange/20" />
                <div className="border-b border-brand-orange/20" />
              </div>

              {/* Pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
                <div className="h-10 w-10 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-lg animate-bounce">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="bg-brand-dark text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">Mustika Travel</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-left">
              <p className="text-xs text-brand-dark/60 leading-relaxed font-light">
                Butuh jemputan mendadak atau ingin mendiskusikan rute perjalanan kustom Anda langsung? Ketuk tombol di bawah untuk konsultasi cepat via WhatsApp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-3 px-4 text-xs font-bold text-white hover:bg-brand-orange-light transition-all shadow-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat CS WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
