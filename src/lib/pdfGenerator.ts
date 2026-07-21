import jsPDF from "jspdf";

export interface PDFItineraryData {
  title: string;
  destination: string;
  duration: string;
  passengerCount: number;
  tripStyle: string;
  pricePerPerson: number;
  totalPrice: number;
  downPayment: number;
  recommendedVehicle: string;
  highlights: string[];
  dayByDay: { day: string; title: string; activities: string[] }[];
}

/**
 * Generates an official, beautifully styled PDF brochure & itinerary for Mustika Travel
 */
export function generateItineraryPDF(data: PDFItineraryData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // === BRANDING COLORS ===
  const primaryColor = [64, 115, 167]; // #4073A7 (Mustika Blue/Orange)
  const darkColor = [30, 41, 59];     // #1E293B (Dark Slate)
  const accentBg = [240, 246, 250];   // #F0F6FA (Light Tint)

  // 1. HEADER BANNER
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("MUSTIKA TRAVEL", 14, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Layanan Sewa Mobil & Paket Wisata Resmi Jombang - 24 Jam Nonstop", 14, 22);

  // Document Badge Right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("OFFICIAL E-ITINERARY", pageWidth - 14, 14, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Doc ID: MT-${Date.now().toString().slice(-6)}`, pageWidth - 14, 20, { align: "right" });

  let y = 36;

  // 2. TRIP TITLE & OVERVIEW BOX
  doc.setFillColor(accentBg[0], accentBg[1], accentBg[2]);
  doc.roundedRect(14, y, pageWidth - 28, 32, 3, 3, "F");

  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(data.title.toUpperCase(), 20, y + 9);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Destinasi: ${data.destination}   |   Durasi: ${data.duration}   |   Kategori: ${data.tripStyle}`, 20, y + 16);

  doc.setFont("helvetica", "bold");
  doc.text(`Jumlah Peserta: ${data.passengerCount} Orang   |   Rekomendasi Armada: ${data.recommendedVehicle}`, 20, y + 23);

  y += 40;

  // 3. PRICING SUMMARY CARD
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(14, y, pageWidth - 28, 22, 3, 3, "S");

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("ESTIMASI BIAYA & RINCIAN DP (30%)", 20, y + 7);

  doc.setFontSize(11);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(`Rp ${data.pricePerPerson.toLocaleString("id-ID")} / Orang`, 20, y + 15);
  doc.text(`Total: Rp ${data.totalPrice.toLocaleString("id-ID")}`, 90, y + 15);

  doc.setTextColor(220, 38, 38); // Red DP
  doc.text(`DP Wajib (30%): Rp ${data.downPayment.toLocaleString("id-ID")}`, 145, y + 15);

  y += 30;

  // 4. DAY-BY-DAY ITINERARY SECTION
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text("RUNDOWN & JADWAL PERJALANAN (ITINERARY)", 14, y);
  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y + 2, pageWidth - 14, y + 2);

  y += 8;

  data.dayByDay.forEach((dayInfo) => {
    if (y > pageHeight - 35) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.roundedRect(14, y, 22, 6, 1, 1, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(dayInfo.day.toUpperCase(), 25, y + 4.2, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(dayInfo.title, 40, y + 4.5);

    y += 9;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);

    dayInfo.activities.forEach((act) => {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }
      doc.text(`• ${act}`, 20, y);
      y += 5;
    });

    y += 4;
  });

  // 5. INCLUDED HIGHLIGHTS
  if (data.highlights && data.highlights.length > 0) {
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    y += 2;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("FASILITAS SUDAH TERMASUK (INCLUDE):", 14, y);
    y += 6;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);

    data.highlights.forEach((h) => {
      doc.text(`✓ ${h}`, 20, y);
      y += 5;
    });
  }

  // 6. FOOTER & CONTACT
  const footerY = pageHeight - 18;
  doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.rect(0, footerY, pageWidth, 18, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("MUSTIKA TRAVEL JOMBANG", 14, footerY + 6);
  doc.setFont("helvetica", "normal");
  doc.text("Alamat: Kab. Jombang, Jawa Timur  |  WhatsApp: 0812-3456-789  |  Email: info@mustikatravel.com", 14, footerY + 11);

  doc.text("www.mustikatravel.com", pageWidth - 14, footerY + 8, { align: "right" });

  // Save PDF
  const filename = `Itinerary_MustikaTravel_${data.destination.replace(/\s+/g, "_")}.pdf`;
  doc.save(filename);
}
