import { ChatMessage } from "@/types/chatbot";
import { mustikaKnowledge } from "@/lib/mustikaKnowledge";

/**
 * Intelligent AI Chat Service for Mustika Travel.
 * Integrates with DeepSeek LLM (deepseek-v4-flash) via /api/chat with local Knowledge Base fallback.
 */
export async function generateAIResponse(
  userQuery: string,
  chatHistory?: ChatMessage[]
): Promise<{ text: string; quickActions?: { label: string; action: string }[] }> {
  const query = userQuery.toLowerCase().trim();

  // Try fetching live AI response from DeepSeek API route first
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userQuery,
        messages: (chatHistory || []).slice(-6), // Send last 6 messages for conversation memory
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.text) {
        // Derive contextual quick actions based on response content
        let actions = [
          { label: "📲 Chat CS WhatsApp", action: "Buka WA CS" },
          { label: "🚗 Sewa Mobil", action: "Berapa sewa mobil?" },
          { label: "🌋 Tour Bromo", action: "Info paket tour Bromo" },
        ];

        if (data.text.toLowerCase().includes("avanza") || data.text.toLowerCase().includes("innova")) {
          actions = [
            { label: "📲 Booking Unit via WA", action: "Saya mau booking armada" },
            { label: "📝 Formulir Booking", action: "Ke Halaman Booking" },
          ];
        } else if (data.text.toLowerCase().includes("bromo") || data.text.toLowerCase().includes("bali") || data.text.toLowerCase().includes("tour")) {
          actions = [
            { label: "📲 Booking Tour via WA", action: "Saya mau booking paket tour" },
            { label: "🧳 Paket Wisata Lainnya", action: "Info paket wisata" },
          ];
        }

        return {
          text: data.text,
          quickActions: actions,
        };
      }
    }
  } catch (err) {
    console.warn("DeepSeek API call failed, falling back to local Knowledge Base:", err);
  }

  // ==========================================
  // FALLBACK KNOWLEDGE ENGINE (IF OFFLINE)
  // ==========================================

  // 1. GREETING INTENT
  if (query.includes("halo") || query.includes("hai") || query.includes("pagi") || query.includes("siang") || query.includes("malam") || query.includes("permisi")) {
    return {
      text: `Halo! Selamat datang di **Mustika Travel Jombang** 👋. Ada yang bisa saya bantu hari ini? Anda bisa menanyakan tarif sewa mobil, paket wisata (Bromo, Bali, Jogja), atau cara pemesanan.`,
      quickActions: [
        { label: "🚗 Lihat Harga Sewa Mobil", action: "Berapa harga sewa mobil?" },
        { label: "🌋 Tour Gunung Bromo", action: "Info paket tour Bromo" },
        { label: "📍 Lokasi Kantor", action: "Dimana alamat kantor Mustika Travel?" },
      ],
    };
  }

  // 2. FLEET / RENTAL / CAR INTENT
  if (query.includes("armada") || query.includes("mobil") || query.includes("sewa") || query.includes("rental") || query.includes("avanza") || query.includes("innova") || query.includes("hiace") || query.includes("elf")) {
    if (query.includes("avanza")) {
      const v = mustikaKnowledge.armadas.find((a) => a.name.includes("Avanza"))!;
      return {
        text: `🚗 **${v.name}**\n\n- **Kapasitas:** ${v.capacity} Penumpang\n- **Harga:** Rp ${v.pricePerDay.toLocaleString("id-ID")}/hari\n- **Fasilitas:** ${v.features.join(", ")}\n\n${v.description}`,
        quickActions: [
          { label: "📲 Booking Avanza via WA", action: "Saya mau booking Avanza" },
          { label: "🚙 Lihat Innova Reborn", action: "Berapa sewa Innova Reborn?" },
        ],
      };
    }

    if (query.includes("innova")) {
      const v = mustikaKnowledge.armadas.find((a) => a.name.includes("Innova"))!;
      return {
        text: `🚘 **${v.name}**\n\n- **Kapasitas:** ${v.capacity} Penumpang\n- **Harga:** Rp ${v.pricePerDay.toLocaleString("id-ID")}/hari\n- **Fasilitas:** ${v.features.join(", ")}\n\n${v.description}`,
        quickActions: [
          { label: "📲 Booking Innova via WA", action: "Saya mau booking Innova" },
          { label: "🚐 Lihat Hiace / Minibus", action: "Berapa sewa Hiace?" },
        ],
      };
    }

    if (query.includes("hiace") || query.includes("elf") || query.includes("minibus") || query.includes("rombongan")) {
      return {
        text: `🚐 **Pilihan Armada Minibus Rombongan:**\n\n1. **Toyota Hiace Commuter (14 Penumpang)** - Rp 1.100.000/hari\n2. **Isuzu Elf Long (19 Penumpang)** - Rp 1.200.000/hari\n\nSangat ideal untuk rombongan keluarga, ziarah wali, atau kunjungan kerja dinas.`,
        quickActions: [
          { label: "📲 Tanya CS via WhatsApp", action: "Hubungi CS untuk sewa minibus" },
          { label: "📋 Formulir Simulasi Booking", action: "Buka halaman booking" },
        ],
      };
    }

    let carText = `🚘 **Daftar Armada Rental Mustika Travel Jombang:**\n\n`;
    mustikaKnowledge.armadas.forEach((car) => {
      carText += `• **${car.name}** (${car.capacity} Penumpang) - *Rp ${car.pricePerDay.toLocaleString("id-ID")}/hari*\n`;
    });
    carText += `\n*Semua unit bersih, terawat, dan dilengkapi AC dingin.*`;

    return {
      text: carText,
      quickActions: [
        { label: "🚗 Detail Toyota Avanza", action: "Detail Avanza" },
        { label: "🚘 Detail Innova Reborn", action: "Detail Innova" },
        { label: "🚐 Detail Hiace / Elf", action: "Detail Hiace" },
      ],
    };
  }

  // 3. BROMO / TOUR PACKAGES INTENT
  if (query.includes("bromo") || query.includes("tour") || query.includes("paket") || query.includes("wisata") || query.includes("bali") || query.includes("jogja") || query.includes("liburan")) {
    if (query.includes("bromo")) {
      const pkg = mustikaKnowledge.tourPackages.find((p) => p.name.includes("Bromo"))!;
      return {
        text: `🌋 **${pkg.name}** (${pkg.duration})\n\n- **Harga:** Rp ${pkg.price.toLocaleString("id-ID")}/orang\n- **Fasilitas Include:** ${pkg.highlights.join(", ")}\n\nSaksikan golden sunrise memukau, kawah Bromo, Pasir Berbisik, dan Bukit Teletubbies menggunakan Jeep 4x4!`,
        quickActions: [
          { label: "📲 Booking Trip Bromo", action: "Saya mau booking trip Bromo" },
          { label: "🏖️ Lihat Paket Bali", action: "Info paket tour Bali" },
        ],
      };
    }

    if (query.includes("bali")) {
      const pkg = mustikaKnowledge.tourPackages.find((p) => p.name.includes("Bali"))!;
      return {
        text: `🏖️ **${pkg.name}** (${pkg.duration})\n\n- **Harga:** Rp ${pkg.price.toLocaleString("id-ID")}/orang\n- **Fasilitas Include:** ${pkg.highlights.join(", ")}\n\nNikmati pesona Kuta, Tanah Lot, Ubud, Uluwatu, dan sunset dinner Jimbaran.`,
        quickActions: [
          { label: "📲 Booking Paket Bali", action: "Saya mau booking paket Bali" },
          { label: "🏛️ Lihat Paket Jogja", action: "Info paket tour Jogja" },
        ],
      };
    }

    let tourText = `🧳 **Paket Tour Wisata Populer Mustika Travel:**\n\n`;
    mustikaKnowledge.tourPackages.forEach((pkg) => {
      tourText += `• **${pkg.name}** (${pkg.duration}) - *Rp ${pkg.price.toLocaleString("id-ID")}*\n`;
    });
    tourText += `\nKami juga melayani rute kustom ke Malang, Batu, Ziarah Wali Songo, dan kota tujuan Anda.`;

    return {
      text: tourText,
      quickActions: [
        { label: "🌋 Detail Trip Bromo", action: "Info paket Bromo" },
        { label: "🏖️ Detail Paket Bali", action: "Info paket Bali" },
        { label: "🏛️ Detail Paket Jogja", action: "Info paket Jogja" },
      ],
    };
  }

  // 4. LOCATION / ADDRESS / CONTACT INTENT
  if (query.includes("lokasi") || query.includes("alamat") || query.includes("kantor") || query.includes("jombang") || query.includes("kontak") || query.includes("wa") || query.includes("telepon")) {
    return {
      text: `📍 **Lokasi & Kontak Mustika Travel:**\n\n- **Alamat:** Kabupaten Jombang, Jawa Timur\n- **Jam Operasional:** 24 Jam Nonstop\n- **WhatsApp CS:** 0812-3456-789\n- **Email:** info@mustikatravel.com\n\nSilakan langsung hubungi WhatsApp kami untuk reservasi cepat.`,
      quickActions: [
        { label: "💬 Chat WhatsApp CS", action: "Buka WA CS" },
        { label: "🗺️ Halaman Lokasi", action: "Buka halaman lokasi" },
      ],
    };
  }

  // 5. BOOKING / SEWA INTENT
  if (query.includes("booking") || query.includes("pesan") || query.includes("cara") || query.includes("bayar") || query.includes("dp")) {
    return {
      text: "📋 **Cara Pemesanan di Mustika Travel:**\n\n1. Pilih unit armada atau paket tour pilihan Anda.\n2. Tentukan tanggal keberangkatan dan durasi sewa.\n3. Hubungi CS WhatsApp kami di **0812-3456-789** atau isi form di halaman /booking.\n4. Konfirmasi DP untuk mengunci unit/jadwal perjalanan Anda.",
      quickActions: [
        { label: "📲 Pesan via WhatsApp CS", action: "Chat WA sekarang" },
        { label: "📝 Isi Form Booking", action: "Ke Halaman Booking" },
      ],
    };
  }

  // 6. DEFAULT / GENERAL QUERY FALLBACK
  return {
    text: `Saya adalah **Mustika AI Assistant** 🤖.\n\nMustika Travel melayani rental mobil (Avanza, Innova, Hiace, Elf) dan paket tour (Bromo, Bali, Jogja) berpusat di **Jombang, Jawa Timur** (Layanan 24 Jam).\n\nAda yang bisa saya bantu jelaskan tentang layanan kami?`,
    quickActions: [
      { label: "🚗 Pilihan Sewa Mobil", action: "Berapa harga sewa mobil?" },
      { label: "🌋 Paket Tour Wisata", action: "Info paket wisata" },
      { label: "📲 Kontak CS WhatsApp", action: "Kontak WA CS" },
    ],
  };
}

