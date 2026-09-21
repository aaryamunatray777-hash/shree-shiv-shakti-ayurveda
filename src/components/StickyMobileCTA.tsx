"use client";

import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function StickyMobileCTA() {
  const clinicPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE || "+91 80900 70037";
  const whatsappNumber = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "918090070037";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "नमस्ते वैद्य जी, मुझे श्री शिव शक्ति आयुर्वेद क्लिनिक (मुंशी पुलिया, लखनऊ) में नाड़ी परीक्षण एवं परामर्श के बारे में जानकारी चाहिए।"
  )}`;

  return (
    <aside aria-label="Quick contact actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#091711]/95 backdrop-blur-lg border-t border-[#2D5A44]/60 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Call Button */}
        <a
          href={`tel:${clinicPhone}`}
          title="सीधे कॉल करें: 8090070037"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0F281E] border border-[#214736] text-[#E5C77E] active:scale-95 transition-all text-center cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#C76738] mb-0.5" />
          <span className="text-[11px] font-medium tracking-tight">कॉल करें</span>
          <span className="text-[9px] font-mono text-[#A3B3AB]">8090070037</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp पर मैसेज भेजें: 8090070037"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0F281E] border border-[#214736] text-[#E2EAE5] active:scale-95 transition-all text-center cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[11px] font-medium tracking-tight">WhatsApp</span>
          <span className="text-[9px] font-mono text-emerald-400">8090070037</span>
        </a>

        {/* Consultation Button */}
        <button
          onClick={() => scrollToSection("consultation-form")}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-[#C76738] to-[#D97746] text-white active:scale-95 transition-all text-center shadow-md cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">परामर्श बुक</span>
        </button>

      </div>
    </aside>
  );
}
