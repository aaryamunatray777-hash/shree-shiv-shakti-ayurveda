"use client";

import { Activity, Leaf, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import InteractiveNadiSimulator from "@/components/InteractiveNadiSimulator";

export default function NadiParikshan() {
  return (
    <section id="nadi-parikshan" className="relative py-24 sm:py-32 bg-[#FBF9F4] text-[#1B2420] overflow-hidden">
      {/* Subtle Warm Botanical Ambient Accents */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#C76738]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#2D5A44]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAE0CF]/70 border border-[#B4A082]/30 text-xs text-[#8C4A26] font-medium tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 text-[#C76738]" />
            <span>पारंपरिक आयुर्वेद विज्ञान</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-[#1B2420] tracking-tight leading-tight">
            “इलाज की शुरुआत... <br />
            <span className="text-[#C76738] font-serif italic">नाड़ी के स्पर्श से।</span>”
          </h2>

          <p className="text-base sm:text-lg text-[#4E5B55] font-light leading-relaxed">
            आयुर्वेद में नाड़ी परीक्षण एक पारंपरिक पद्धति है, जिसमें वैद्य नाड़ी के संकेतों का परीक्षण करके व्यक्ति की प्रकृति और स्वास्थ्य से जुड़े पहलुओं को समझने का प्रयास करते हैं।
          </p>
        </div>

        {/* Interactive Nadi Simulator: Patient Arm + Vaidya Hands + Pulsing Waves */}
        <div className="my-16">
          <InteractiveNadiSimulator />
        </div>

        {/* Ethical Credibility & Clear Understanding Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-white border border-[#EAE0CF] space-y-2.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F5EFE3] flex items-center justify-center text-[#C76738]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#1B2420]">समग्र दृष्टिकोण</h3>
            <p className="text-xs text-[#4E5B55] leading-relaxed font-light">
              नाड़ी केवल किसी एक लक्षण को नहीं, बल्कि जीवनशैली, आहार और मानसिक तनाव के प्रभाव को समझने में सहायक होती है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EAE0CF] space-y-2.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F5EFE3] flex items-center justify-center text-[#2D5A44]">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#1B2420]">व्यक्तिगत स्वास्थ्य योजना</h3>
            <p className="text-xs text-[#4E5B55] leading-relaxed font-light">
              प्रत्येक व्यक्ति की प्रकृति अलग होती है। नाड़ी परीक्षण के बाद व्यक्तिगत आहार, दिनचर्या और औषधीय परामर्श तय किया जाता है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#EAE0CF] space-y-2.5 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F5EFE3] flex items-center justify-center text-[#C8A356]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-[#1B2420]">सत्यनिष्ठा एवं प्रामाणिकता</h3>
            <p className="text-xs text-[#4E5B55] leading-relaxed font-light">
              हम अतिशयोक्तिपूर्ण दावों से दूर रहकर शुद्ध शास्त्रीय आयुर्वेद के नियमों के अनुसार रोगी को परामर्श देते हैं।
            </p>
          </div>
        </div>

        {/* Section Conversion CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToSection("consultation-form")}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-[#8C4A26] hover:text-[#C76738] transition-colors border-b-2 border-[#C76738] pb-1 cursor-pointer"
          >
            <span>नाड़ी परीक्षण के लिए परामर्श का समय तय करें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
