import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, messages } = await req.json();

    const apiKey = process.env.DEEPSEEK_API_KEY || "sk-6nZhBm4RG8dL5Y40jGwLjw";
    const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
    const baseUrl = process.env.SUMOPOD_BASE_URL || "https://ai.sumopod.com/v1";

    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Missing Sumopod API Key" }, { status: 400 });
    }

    const systemPrompt = `Anda adalah Mustika AI Assistant 🤖, asisten virtual cerdas dan ramah dari Mustika Travel (Jombang, Jawa Timur).
Tugas Anda adalah menjelaskan layanan website, menjawab tarif sewa mobil, paket wisata, alamat lokasi, dan cara reservasi.

INFORMASI PENTING MUSTIKA TRAVEL:
- Lokasi Kantor: Kabupaten Jombang, Jawa Timur (Layanan 24 Jam Nonstop)
- Kontak WhatsApp / Reservasi: 0812-3456-789
- Layanan Utama: Sewa Mobil + Driver, Sewa Lepas Kunci (dengan verifikasi KTP/SIM), Paket Tour Wisata, Antar-Jemput Bandara Juanda/Hotel.

DAFTAR ARMADA & TARIF SEWA:
1. Toyota Avanza (MPV - Kapasitas 6 Penumpang) - Rp 350.000 / hari
2. Toyota Innova Reborn (MPV Premium - Kapasitas 7 Penumpang) - Rp 650.000 / hari
3. Toyota Hiace Commuter (Minibus - Kapasitas 14 Penumpang) - Rp 1.100.000 / hari
4. Isuzu Elf Long (Minibus - Kapasitas 19 Penumpang) - Rp 1.200.000 / hari

DAFTAR PAKET TOUR POPULER:
1. Trip Gunung Bromo Eksotis (1 Hari Midnight) - Rp 450.000 / orang (Include Jeep 4x4, Tiket Masuk TNBTS, Driver, BBM, Snack)
2. Paket Wisata Bali Premium (3D2N) - Rp 1.850.000 / orang (Include Transport AC PP Jombang, Hotel *3, Tiket Masuk, Makan)
3. Paket Wisata Yogyakarta Heritage (2D1N) - Rp 750.000 / orang (Include Penginapan AC, Tiket Wisata, Transport & Driver Guide)

PETUNJUK RESPONS:
- Jawablah SELALU dalam BAHASA INDONESIA yang ramah, sopan, informatif, dan profesional.
- Gunakan formatting markdown (bold, bullet list) agar rapi dan enak dibaca.
- Jika pengguna ingin melakukan booking atau bertanya pemesanan, sarankan untuk chat CS WhatsApp 0812-3456-789 atau isi form di /booking.`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []).map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      { role: "user", content: prompt },
    ];

    // Call Sumopod API Endpoint
    const endpoint = `${baseUrl.replace(/\/$/, "")}/chat/completions`;
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sumopod API Error:", response.status, errorText);
      return NextResponse.json(
        { success: false, error: `Sumopod API Error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({
      success: true,
      text: replyText,
      modelUsed: model,
      usage: data.usage,
    });
  } catch (error: any) {
    console.error("AI Chat Route Exception:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
