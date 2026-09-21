"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "918090070037";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "नमस्ते वैद्य जी, मुझे श्री शिव शक्ति आयुर्वेद (मुंशी पुलिया, लखनऊ) में नाड़ी परीक्षण एवं परामर्श के लिए जानकारी चाहिए।"
  )}`;

  return (
    <aside
      aria-label="WhatsApp Support"
      className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 select-none group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2.5 px-4 py-3 rounded-full bg-[#1BD741] hover:bg-[#18C33B] text-[#052912] hover:text-black font-semibold text-xs sm:text-sm shadow-2xl hover:shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#86efac]/40 backdrop-blur-md"
        title="डॉक्टर को WhatsApp पर मैसेज भेजें (8090070037)"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-950" />
        </span>
        
        <MessageCircle className="w-5 h-5 text-[#052912] fill-current" />
        
        <span className="font-sans tracking-wide hidden sm:inline">
          WhatsApp पर पूछें
        </span>
        
        <span className="font-mono text-[11px] bg-[#052912] text-white px-2 py-0.5 rounded-full hidden sm:inline">
          8090070037
        </span>
      </a>
    </aside>
  );
}
