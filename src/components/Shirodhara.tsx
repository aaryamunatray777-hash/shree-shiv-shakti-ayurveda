"use client";

import { Sparkles, Moon, Heart, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import InteractiveShirodharaSimulator from "@/components/InteractiveShirodharaSimulator";

export default function Shirodhara() {
  return (
    <section id="shirodhara" className="relative py-28 sm:py-36 bg-[#040A07] text-[#F7F4ED] overflow-hidden">
      {/* Subtle Atmospheric Mist & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C76738]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2D5A44]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Sub-Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0E2017] border border-[#274F3B]/60 text-xs text-[#E5C77E] font-medium tracking-widest uppercase">
            <Moon className="w-3.5 h-3.5 text-[#C76738]" />
            <span>मानसिक शांति एवं चेतना विश्राम</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-display-luxury text-white tracking-tight leading-tight">
            “सुकून... <br />
            <span className="gold-gradient-text font-serif italic">एक बूंद से एक अनुभव तक।</span>”
          </h2>

          <p className="text-base text-[#9EB2A8] font-light leading-relaxed max-w-xl mx-auto">
            लगातार बहती औषधीय तैल की सूक्ष्म धारा — जो मन की व्यग्रता, अनिद्रा और तनाव को शांत कर गहन विश्रांति की अवस्था में ले जाती है।
          </p>
        </div>

        {/* Interactive Shirodhara Motion Graphics Simulator */}
        <div className="mb-16">
          <InteractiveShirodharaSimulator />
        </div>

        {/* 3 Core Sensory Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-[#091711]/80 border border-[#1E3E30] space-y-2 hover:border-[#C76738]/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-full bg-[#0F281E] flex items-center justify-center text-[#E5C77E]">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">अनिद्रा एवं तनाव मुक्ति</h3>
            <p className="text-xs sm:text-sm text-[#95A79E] leading-relaxed font-light">
              आज्ञा चक्र पर गुनगुने ब्रह्मी, क्षीरबला या चन्दनादि तैल का लयबद्ध प्रवाह मस्तिष्क की तरंगों को अल्फा स्टेट में ले जाता है, जिससे गहरी नींद आती है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091711]/80 border border-[#1E3E30] space-y-2 hover:border-[#C76738]/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-full bg-[#0F281E] flex items-center justify-center text-[#C76738]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">माइग्रेन व सिरदर्द में राहत</h3>
            <p className="text-xs sm:text-sm text-[#95A79E] leading-relaxed font-light">
              कपाल और स्नायु तंत्र में जमा अतिरिक्त पित्त और वात दोष को शांत कर क्रोनिक माइग्रेन और भारीपन को हल्का करता है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091711]/80 border border-[#1E3E30] space-y-2 hover:border-[#C76738]/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-full bg-[#0F281E] flex items-center justify-center text-[#2D5A44]">
              <Heart className="w-5 h-5 text-[#C8A356]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">बालों एवं खोपड़ी का पोषण</h3>
            <p className="text-xs sm:text-sm text-[#95A79E] leading-relaxed font-light">
              औषधीय तैल रोमछिद्रों तक पहुंचकर जड़ों को मजबूत करता है, समय से पहले बालों के सफेद होने और झड़ने को नियंत्रित करने में सहायक है।
            </p>
          </div>
        </div>

        {/* Direct CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToSection("consultation-form")}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-[#E5C77E] hover:text-[#C76738] transition-colors border-b-2 border-[#C76738] pb-1 cursor-pointer"
          >
            <span>शिरोधारा परामर्श एवं सत्र की जानकारी लें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
