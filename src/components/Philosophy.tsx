"use client";

import Image from "next/image";
import { Compass, Sparkles } from "lucide-react";

export default function Philosophy() {
  const principles = [
    {
      sanskrit: "आहार (Ahara)",
      title: "प्राकृतिक पोषण",
      desc: "ताजा, ऋतु-अनुकूल और आपकी जठराग्नि के अनुसार शुद्ध सात्विक आहार।"
    },
    {
      sanskrit: "विहार (Vihara)",
      title: "संतुलित दिनचर्या",
      desc: "उचित निद्रा, शारीरिक व्यायाम और प्राकृतिक चक्र के साथ सामंजस्य।"
    },
    {
      sanskrit: "औषध (Aushadha)",
      title: "शुद्ध वानस्पतिक औषधियां",
      desc: "प्राचीन संहिताओं के अनुसार तैयार की गई रसायन एवं काष्ठ औषधियां।"
    }
  ];

  return (
    <section id="philosophy" className="relative py-28 sm:py-36 bg-[#081610] text-[#F7F4ED] overflow-hidden">
      {/* Background Soft Lights */}
      <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-[#C8A356]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C76738]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Sub-Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#112D22] border border-[#214F3C]/60 text-xs text-[#E5C77E] font-medium tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#C76738]" />
            <span>शाश्वत जीवन दर्शन</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-white tracking-tight leading-tight">
            “जब इलाज सिर्फ एक <br />
            <span className="saffron-gradient-text font-serif italic">समस्या तक सीमित न हो...</span>”
          </h2>

          <p className="text-base sm:text-lg text-[#BAC7C0] font-light leading-relaxed max-w-2xl mx-auto">
            “आयुर्वेद शरीर, प्रकृति, दिनचर्या और समग्र स्वास्थ्य को एक साथ देखने वाली पारंपरिक चिकित्सा पद्धति है।”
          </p>
        </div>

        {/* Two-Column Composition: Botanical Still Life & Tri-Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Atmospheric Still Life Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#2D5A44]/60 shadow-2xl group">
              <Image
                src="/images/ayurveda_botanical_herbs.jpg"
                alt="Ayurvedic botanical herbs, brass mortar pestle and medicinal oils"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081610] via-transparent to-transparent opacity-70" />
            </div>
            
            {/* Floating Quote Stamp */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0E281E]/95 backdrop-blur-md p-5 rounded-2xl border border-[#C8A356]/40 shadow-xl max-w-xs">
              <div className="flex items-center space-x-2 text-[#E5C77E] text-xs font-serif font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C76738]" />
                <span>चरक संहिता वचन</span>
              </div>
              <p className="text-xs text-[#CCD7D1] mt-1.5 font-light italic leading-snug">
                “स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं च।”
              </p>
            </div>
          </div>

          {/* Right: Three Core Dimensions */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#C8A356] font-semibold">
                आयुर्वेद के त्रिविध स्तम्भ
              </span>
              <h3 className="text-2xl sm:text-3xl font-display-luxury text-white">
                शरीर के स्वाभाविक संतुलन की पुनर्स्थापना
              </h3>
              <p className="text-xs sm:text-sm text-[#9BB0A5] leading-relaxed font-light">
                हम रासायनिक दवाओं द्वारा लक्षणों को तात्कालिक रूप से दबाने के स्थान पर शरीर की अंतर्निहित हीलिंग क्षमता को जाग्रत करने में विश्वास करते हैं।
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0C2017]/80 border border-[#1C3B2D] hover:border-[#C76738]/50 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-[#E5C77E]">{p.sanskrit}</span>
                    <span className="text-[11px] text-[#789083]">स्तम्भ 0{idx + 1}</span>
                  </div>
                  <h4 className="text-base font-serif font-semibold text-white">{p.title}</h4>
                  <p className="text-xs text-[#9BB0A5] leading-relaxed font-light">{p.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
