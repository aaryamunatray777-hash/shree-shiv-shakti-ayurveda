"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/utils";
import { GraduationCap, Award, Stethoscope, ArrowRight, ShieldCheck, HeartPulse, Sparkles, MessageCircle } from "lucide-react";

export default function Doctor() {
  const whatsappNumber = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "918090070037";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "नमस्ते वैद्य विजय कुमार मिश्रा जी, मुझे श्री शिव शक्ति आयुर्वेद क्लिनिक (मुंशी पुलिया, लखनऊ) में परामर्श के लिए बात करनी है।"
  )}`;
  return (
    <section id="doctor" className="relative py-24 sm:py-32 bg-[#FBF9F4] text-[#1B2420] overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C8A356]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#C76738]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAE0CF]/60 border border-[#B4A082]/30 text-xs text-[#8C4A26] font-medium tracking-widest uppercase">
            <HeartPulse className="w-3.5 h-3.5 text-[#C76738]" />
            <span>चिकित्सा नेतृत्व</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-[#1B2420] tracking-tight leading-tight">
            “मिलिए — <span className="text-[#C76738] font-serif italic">वैद्य विजय कुमार मिश्रा</span> से।”
          </h2>

          <p className="text-sm sm:text-base text-[#4E5B55] font-light">
            श्री शिव शक्ति आयुर्वेद, मुंशीपुलिया, लखनऊ
          </p>
        </div>

        {/* Doctor Spotlight Card Composition */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#EAE0CF] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
            
            {/* Left: Doctor Portrait - Real Photo of Vaidya Vijay Kumar Mishra */}
            <div className="md:col-span-5 relative min-h-[460px] md:min-h-full bg-[#0F281E] overflow-hidden flex items-center justify-center p-4">
              <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-[#2D5A44]/40">
                <Image
                  src="/images/vaidya.jpeg"
                  alt="Vaidya Vijay Kumar Mishra - BAMS, DNYS - Ayurvedic Doctor in Lucknow"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 contrast-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060E0A]/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#C76738] text-[10px] font-semibold tracking-wider uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>वरिष्ठ आयुर्वेदिक चिकित्सक</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F4ED]">
                    वैद्य विजय कुमार मिश्रा
                  </h3>
                  <p className="text-xs text-[#E5C77E] font-medium tracking-wide">
                    BAMS, DNYS • 18+ Years Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Information, Credentials & Dedicated Statement */}
            <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="hidden md:block">
                  <span className="text-xs uppercase tracking-widest text-[#8C4A26] font-semibold">
                    आयुर्वेदिक वैद्य एवं नाड़ी विशेषज्ञ
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display-luxury text-[#1B2420] mt-1">
                    Vaidya Vijay Kumar Mishra
                  </h3>
                </div>

                <div className="w-12 h-[2px] bg-[#C76738]" />

                {/* Core Philosophy Statement */}
                <blockquote className="text-base sm:text-lg text-[#2A3631] font-serif italic leading-relaxed bg-[#FAF7F0] p-4 rounded-xl border-l-4 border-[#C76738]">
                  “आयुर्वेदिक परामर्श और नाड़ी परीक्षण के माध्यम से प्रत्येक व्यक्ति की स्वास्थ्य स्थिति को समझने पर विशेष ध्यान।”
                </blockquote>

                <p className="text-xs sm:text-sm text-[#4E5B55] leading-relaxed font-light">
                  वैद्य विजय कुमार मिश्रा जी विगत 18 वर्षों से लखनऊ में शास्त्रीय आयुर्वेद और नाड़ी परीक्षण द्वारा रोगियों का सफल मार्गदर्शन कर रहे हैं। वे विशेष रूप से <strong>संतानहीनता (Infertility)</strong> और <strong>गठिया / संधिवात (Arthritis)</strong> के जटिल मामलों में अपनी गहरी चिकित्सीय सूझबूझ और पंचकर्म विशेषज्ञता के लिए जाने जाते हैं।
                </p>
              </div>

              {/* Verified Credentials Section */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#7C6651]">
                  प्रमाणित विवरण (Verified Clinical Credentials)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#EAE0CF] hover:border-[#C76738]/50 transition-colors">
                    <div className="flex items-center space-x-1.5 text-[#8C4A26] text-xs font-semibold">
                      <GraduationCap className="w-4 h-4 text-[#C76738]" />
                      <span>योग्यता (Qualification)</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-[#1B2420] mt-1.5">
                      BAMS, DNYS
                    </div>
                    <div className="text-[11px] text-[#6C7B74]">
                      स्नातक आयुर्वेद एवं प्राकृतिक चिकित्सा
                    </div>
                  </div>

                  <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#EAE0CF] hover:border-[#C76738]/50 transition-colors">
                    <div className="flex items-center space-x-1.5 text-[#8C4A26] text-xs font-semibold">
                      <Award className="w-4 h-4 text-[#C76738]" />
                      <span>अनुभव (Experience)</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-[#1B2420] mt-1.5">
                      18+ Years
                    </div>
                    <div className="text-[11px] text-[#6C7B74]">
                      18 वर्षों का सतत चिकित्सीय अभ्यास
                    </div>
                  </div>

                  <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#EAE0CF] hover:border-[#C76738]/50 transition-colors">
                    <div className="flex items-center space-x-1.5 text-[#8C4A26] text-xs font-semibold">
                      <Stethoscope className="w-4 h-4 text-[#C76738]" />
                      <span>विशेषज्ञता (Specialization)</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-[#1B2420] mt-1.5">
                      Infertility & Arthritis
                    </div>
                    <div className="text-[11px] text-[#6C7B74]">
                      संतानहीनता एवं गठिया रोग विशेषज्ञ
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-[#2D5A44] font-medium pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#C8A356]" />
                  <span>प्रमाणित क्लिनिकल अभ्यास • मुंशीपुलिया, लखनऊ</span>
                </div>
              </div>

              {/* CTA Buttons: Form & WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => scrollToSection("consultation-form")}
                  className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-[#1B2420] hover:bg-[#C76738] text-white text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>वैद्य जी से व्यक्तिगत परामर्श लें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#0E3825] hover:bg-[#155337] border border-emerald-500/50 text-emerald-300 hover:text-white text-sm font-medium tracking-wide transition-all shadow-md cursor-pointer"
                  title="WhatsApp पर डॉक्टर को संदेश भेजें (8090070037)"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp पर पूछें (8090070037)</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
