"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/utils";
import { Sparkles, Flower2, ArrowUpRight } from "lucide-react";

export default function ClinicIntro() {
  const pillars = [
    {
      title: "नाड़ी परीक्षण (Nadi Parikshan)",
      desc: "शरीर के आंतरिक दोषों की पहचान के लिए पारंपरिक स्पंदन परीक्षण।"
    },
    {
      title: "व्यक्तिगत परामर्श (Ayurvedic Consultation)",
      desc: "आपकी प्रकृति, खान-पान और दिनचर्या के अनुसार व्यवस्थित स्वास्थ्य मार्गदर्शन।"
    },
    {
      title: "पंचकर्म शुद्धि (Panchakarma Detox)",
      desc: "शरीर से संचित टॉक्सिन्स (आम दोष) को बाहर निकालने वाली शास्त्रीय पद्धतियां।"
    },
    {
      title: "शिरोधारा एवं शांति (Shirodhara & Rejuvenation)",
      desc: "मानसिक तनाव, अनिद्रा और तंत्रिका तंत्र को शांति प्रदान करने वाला औषधीय तैल प्रवाह।"
    }
  ];

  return (
    <section id="clinic-intro" className="relative py-24 sm:py-32 bg-[#091711] text-[#F7F4ED] overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#2D5A44]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C76738]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro Badge */}
        <div className="flex items-center space-x-2 text-xs tracking-widest uppercase text-[#C8A356] font-medium mb-4">
          <Flower2 className="w-4 h-4 text-[#C76738]" />
          <span>Shree Shiv Shakti Ayurveda • Lucknow</span>
        </div>

        {/* Two Column Cinematic Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big Statement & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-[#F7F4ED] leading-[1.15] tracking-tight">
              “एक पारंपरिक दृष्टिकोण... <br />
              <span className="saffron-gradient-text font-serif italic">आज के समय के लिए।</span>”
            </h2>

            <p className="text-base sm:text-lg text-[#B5C5BD] font-light leading-relaxed">
              आज की भागदौड़ भरी जिंदगी में अधिकांश बीमारियां जीवनशैली, असंतुलित खान-पान और तनाव से उत्पन्न होती हैं। 
              <strong> श्री शिव शक्ति आयुर्वेद</strong> में हमारा उद्देश्य केवल लक्षणों को दबाना नहीं, बल्कि प्राचीन आयुर्वेद सिद्धांतों के अनुसार समस्या की जड़ को समझकर दीर्घकालिक समाधान प्रदान करना है।
            </p>

            {/* Core Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0F281E]/80 border border-[#214736]/60 hover:border-[#C76738]/60 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-serif text-[#C8A356] font-bold">0{idx + 1}</span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#E5C77E] transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#95A79E] leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-4 flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("consultation-form")}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#C76738] hover:bg-[#D97746] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-lg hover:shadow-orange-900/40 cursor-pointer"
              >
                <span>परामर्श के लिए संपर्क करें</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-[#95A79E]">
                <span>मुंशीपुलिया, लखनऊ</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#2D5A44]/50 shadow-2xl group">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/panchakarma_therapies.jpg"
                  alt="Ayurvedic Droni treatment table and herbal therapy preparations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060E0A] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#091711]/90 backdrop-blur-md border border-[#2D5A44]/60">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#C76738]/20 flex items-center justify-center text-[#E5C77E] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-bold text-[#F7F4ED]">प्रामाणिक पंचकर्म एवं नाड़ी केंद्र</div>
                    <div className="text-[11px] text-[#A3B3AB] leading-tight mt-0.5">
                      रॉयल प्लाजा, पल्स हार्ट सेंटर के पीछे, मुंशी पुलिया, लखनऊ
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle floating glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#C76738]/20 to-[#C8A356]/10 rounded-3xl blur-2xl -z-10" />
          </div>

        </div>

      </div>
    </section>
  );
}
