"use client";

import { HEALTH_CONCERNS_LIST, HealthConcern } from "@/lib/types";
import { scrollToSection } from "@/lib/utils";
import { ArrowRight, HelpCircle } from "lucide-react";

interface HealthConcernsProps {
  onSelectConcern?: (concern: string) => void;
}

export default function HealthConcerns({ onSelectConcern }: HealthConcernsProps) {
  const handleConcernClick = (concern: HealthConcern) => {
    if (onSelectConcern) {
      onSelectConcern(concern);
    }
    // Also trigger form input prefill if event dispatched
    const customEvent = new CustomEvent("select-health-concern", { detail: concern });
    window.dispatchEvent(customEvent);
    scrollToSection("consultation-form");
  };

  return (
    <section id="health-concerns" className="relative py-24 sm:py-36 bg-[#FBF9F4] text-[#1B2420] overflow-hidden">
      {/* Background Soft Accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#C76738]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2D5A44]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAE0CF]/70 border border-[#B4A082]/30 text-xs text-[#8C4A26] font-medium tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#C76738]" />
            <span>प्रमुख परामर्श क्षेत्र</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-[#1B2420] tracking-tight leading-tight">
            “किन स्वास्थ्य समस्याओं के लिए लोग <br />
            <span className="text-[#C76738] font-serif italic">आयुर्वेदिक परामर्श</span> लेते हैं?”
          </h2>

          <div className="inline-block bg-[#F5EFE3] px-5 py-2.5 rounded-full border border-[#D9CEBA]">
            <p className="text-xs sm:text-sm text-[#4E5B55] font-medium">
              * “इन स्वास्थ्य समस्याओं के लिए आयुर्वेदिक परामर्श लिया जाता है।”
            </p>
          </div>
        </div>

        {/* Large Typographic Wall (Editorial Luxury Approach) */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
            {HEALTH_CONCERNS_LIST.map((concern, index) => {
              // Alternate subtle visual weight for organic editorial rhythm
              const isProminent = [0, 1, 4, 6, 9, 11, 14, 16].includes(index);
              
              return (
                <button
                  key={concern}
                  onClick={() => handleConcernClick(concern)}
                  className={`group relative transition-all duration-300 rounded-full cursor-pointer text-left ${
                    isProminent
                      ? "px-6 sm:px-8 py-3.5 sm:py-4 bg-[#1B2420] text-[#FBF9F4] hover:bg-[#C76738] text-base sm:text-xl font-serif font-bold shadow-md hover:shadow-xl hover:scale-105"
                      : "px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-[#D9CEBA] text-[#2A3631] hover:border-[#C76738] hover:text-[#C76738] text-sm sm:text-base font-sans-clean font-medium hover:scale-105 shadow-sm"
                  }`}
                  title={`Click to discuss ${concern} with Vaidya Ji`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{concern}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#E5C77E]" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* User Guide Prompt */}
          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-[#6C7B74] italic">
              💡 किसी भी समस्या पर क्लिक करके सीधे परामर्श फॉर्म में अपनी जानकारी भरें।
            </p>
          </div>
        </div>

        {/* Transparent Compliance Note */}
        <div className="mt-16 max-w-2xl mx-auto p-5 rounded-2xl bg-[#F5EFE3] border border-[#EAE0CF] text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C4A26]">
            प्रामाणिक चिकित्सा का संकल्प
          </div>
          <p className="text-xs text-[#5D6B64] leading-relaxed font-light">
            आयुर्वेद में किसी भी बीमारी का त्वरित या जादुई इलाज का दावा नहीं किया जाता। यहाँ प्रत्येक रोगी की शारीरिक प्रकृति, दोष असंतुलन, पाचन अग्नि और मानसिक स्थिति का समग्र परीक्षण करके प्राकृतिक स्वास्थ्य पुनरुत्थान की दिशा में कार्य किया जाता है।
          </p>
        </div>

      </div>
    </section>
  );
}
