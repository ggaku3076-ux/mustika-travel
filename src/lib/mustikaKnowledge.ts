import { MustikaKnowledgeBase } from "@/types/chatbot";

export const mustikaKnowledge: MustikaKnowledgeBase = {
  companyName: "Mustika Travel",
  city: "Jombang, Jawa Timur",
  operatingHours: "24 Jam Nonstop Setiap Hari",
  whatsappNumber: "0812-3456-789",
  services: [
    "Sewa Mobil + Driver Harian",
    "Lepas Kunci (Syarat & Ketentuan berlaku)",
    "Paket Wisata (Bromo, Bali, Yogyakarta, Malang, Ziarah Wali)",
    "Antar-Jemput Bandara (Juanda / Airport Drop)",
    "Kunjungan Kerja & Rombongan Dinas",
  ],
  armadas: [
    {
      name: "Toyota Avanza",
      type: "MPV",
      capacity: 6,
      pricePerDay: 350000,
      description: "Mobil keluarga sejuta umat yang hemat BBM, cocok untuk perjalanan dalam & luar kota.",
      features: ["AC Double Blower", "Driver Profesional", "BBM Opsional"],
    },
    {
      name: "Toyota Innova Reborn",
      type: "MPV Premium",
      capacity: 7,
      pricePerDay: 650000,
      description: "Lebih lega, empuk, dan elegan untuk dinas atau keluarga besar.",
      features: ["AC Dingin Nyaman", "Driver Profesional", "Audio Premium"],
    },
    {
      name: "Toyota Hiace Commuter",
      type: "Minibus",
      capacity: 14,
      pricePerDay: 1100000,
      description: "Pilihan terbaik untuk rombongan wisata skala medium dengan kenyamanan tinggi.",
      features: ["Kapasitas Lega", "Driver Berpengalaman", "Reclining Seats"],
    },
    {
      name: "Isuzu Elf Long",
      type: "Minibus",
      capacity: 19,
      pricePerDay: 1200000,
      description: "Cocok untuk rombongan wisata ziarah wali, kunjungan kerja, atau reuni keluarga.",
      features: ["AC Ducting Dingin", "Bagasi Luas", "Driver Berpengalaman"],
    },
  ],
  tourPackages: [
    {
      id: "pkg-1",
      name: "Paket Wisata Bali Premium",
      duration: "3 Hari 2 Malam",
      price: 1850000,
      description: "Menjelajahi Kuta, Ubud, Tanah Lot, Uluwatu & Jimbaran.",
      highlights: ["Transportasi AC PP Jombang", "Hotel Bintang 3", "Tiket Masuk Wisata", "Makan & Driver"],
    },
    {
      id: "pkg-2",
      name: "Trip Gunung Bromo Eksotis",
      duration: "1 Hari (Midnight)",
      price: 450000,
      description: "Golden sunrise Bromo, Kawah, Pasir Berbisik & Bukit Teletubbies.",
      highlights: ["Jeep 4x4 Bromo", "Tiket Masuk TNBTS", "Driver & BBM", "Dokumentasi & Snack"],
    },
    {
      id: "pkg-3",
      name: "Paket Wisata Yogyakarta Heritage",
      duration: "2 Hari 1 Malam",
      price: 750000,
      description: "Candi Borobudur, Malioboro, Kraton, Tebing Breksi & Parangtritis.",
      highlights: ["Penginapan AC", "Tiket Masuk Wisata", "Transportasi & Driver Guide"],
    },
  ],
  faqs: [
    {
      question: "Dimana lokasi kantor Mustika Travel?",
      answer: "Mustika Travel berlokasi di Kabupaten Jombang, Jawa Timur dan melayani pemesanan 24 jam nonstop.",
    },
    {
      question: "Apakah bisa sewa mobil lepas kunci?",
      answer: "Bisa, untuk sewa lepas kunci terdapat verifikasi dokumen (KTP, SIM, jaminan motor/KTP asli). Silakan konsultasi via WhatsApp CS kami.",
    },
    {
      question: "Bagaimana cara melakukan pemesanan (booking)?",
      answer: "Anda dapat mengisi form di halaman /booking atau langsung menghubungi CS kami via WhatsApp di 0812-3456-789.",
    },
    {
      question: "Mobil apa yang cocok untuk 10 orang?",
      answer: "Untuk rombongan 10-14 orang, kami merekomendasikan Toyota Hiace Commuter yang sangat nyaman dan ber-AC dingin.",
    },
  ],
};
