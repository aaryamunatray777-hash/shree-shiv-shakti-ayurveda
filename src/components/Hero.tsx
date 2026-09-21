"use client";

import Image from "next/image";
import { scrollToSection } from "@/lib/utils";
import { MapPin, ArrowRight, ShieldCheck, HeartPulse, Sparkles, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#060E0A] pt-28 pb-16">
      {/* Background Cinematic Image with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero_nadi_parikshan.jpg"
          alt="Ayurvedic Vaidya performing Nadi Parikshan (Pulse Examination)"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] sm:object-center scale-105 animate-breathe opacity-40 brightness-75 contrast-110"
        />
        {/* Layered Cinematic Gradients for Editorial Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060E0A] via-[#091711]/60 to-[#060E0A]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060E0A]/95 via-[#091711]/75 to-transparent sm:w-3/4" />
        {/* Subtle Radial Glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#C76738]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Logo & Location Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#091711]/90 border border-[#C8A356]/40 p-1.5 flex items-center justify-center shadow-xl overflow-hidden backdrop-blur-md">
              <Image
                src="/images/logo.png"
                alt="Shree Shiv Shakti Ayurveda Logo"
                width={571}
                height={392}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-[#0F281E]/80 border border-[#2D5A44]/70 backdrop-blur-md shadow-md animate-fade-in">
              <MapPin className="w-3.5 h-3.5 text-[#C76738] shrink-0" />
              <span className="text-xs sm:text-sm text-[#E2EAE5] font-medium tracking-wide">
                Royal Plaza, Behind Pulse Heart Center, Munshi Pulia, Indira Nagar, Lucknow
              </span>
            </div>
          </div>

          {/* Core Sanskrit / Heritage Subtitle */}
          <div className="flex items-center space-x-2 text-[#E5C77E] text-xs sm:text-sm tracking-[0.25em] uppercase font-serif-luxury font-medium">
            <HeartPulse className="w-4 h-4 text-[#C76738] animate-pulse" />
            <span>आयुर्वेद की प्राचीन पद्धति — नाड़ी परीक्षण</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display-luxury text-[#F7F4ED] leading-[1.15] tracking-tight">
            “आपकी नाड़ी... <br />
            <span className="gold-gradient-text font-serif italic">आपके शरीर की कहानी</span>{" "}
            कह सकती है।”
          </h1>

          {/* Descriptive Body Paragraph */}
          <p className="text-base sm:text-lg text-[#B5C5BD] leading-relaxed max-w-2xl font-sans-clean font-light">
            बिना किसी कठोर परीक्षण के, केवल नाड़ी की सूक्ष्म गति और त्रिदोष (वात, पित्त, कफ) के संतुलन को समझकर स्वास्थ्य स्थिति का समग्र विश्लेषण।
            लखनऊ में प्रामाणिक आयुर्वेदिक परामर्श का विश्वास।
          </p>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-[#CCD9D2]">
            <div className="flex items-center space-x-2 bg-[#0C1E16]/70 border border-[#214736]/40 px-3 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-[#C8A356]" />
              <span>व्यक्तिगत आयुर्वेदिक परामर्श</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#0C1E16]/70 border border-[#214736]/40 px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4 text-[#C76738]" />
              <span>पारंपरिक पंचकर्म केंद्र</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center space-x-2 bg-[#0C1E16]/70 border border-[#214736]/40 px-3 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>लखनऊ में उपलब्ध</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => scrollToSection("consultation-form")}
              className="group relative overflow-hidden px-7 py-4 rounded-full bg-gradient-to-r from-[#C76738] via-[#D36B3B] to-[#DB7444] text-white font-medium text-sm sm:text-base tracking-wide shadow-xl hover:shadow-orange-900/60 transition-all hover:scale-[1.02] flex items-center justify-center cursor-pointer"
            >
              <span className="relative z-10 flex items-center">
                नाड़ी परीक्षण के लिए अपॉइंटमेंट लें
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => scrollToSection("doctor")}
              className="px-6 py-3.5 rounded-full border border-[#C8A356]/50 bg-[#0F281E]/40 hover:bg-[#0F281E]/80 text-[#E5C77E] hover:text-white text-sm sm:text-base font-medium tracking-wide transition-all backdrop-blur-sm flex items-center justify-center cursor-pointer"
            >
              वैद्य विजय कुमार मिश्रा से मिलें
            </button>
          </div>

          {/* Direct Phone Calling & Doctor Reference */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#CCD9D2]">
            <a
              href="tel:+918090070037"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#0E281E] border border-[#2D5A44] text-[#E5C77E] hover:text-white transition-colors cursor-pointer"
              title="सीधे क्लिनिक कॉल करें (+91 80900 70037)"
            >
              <Phone className="w-3.5 h-3.5 text-[#C76738]" />
              <span>सीधे कॉल करें: <strong className="font-mono text-white">8090070037</strong></span>
            </a>
            <span className="text-[#8DA197] hidden sm:inline">•</span>
            <span className="text-[#8DA197]">परामर्श नेतृत्व: <strong>वैद्य विजय कुमार मिश्रा</strong></span>
          </div>

        </div>
      </div>

      {/* Bottom Pulse Wave SVG Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden z-20 flex items-end">
        <svg
          className="w-full h-12 text-[#FBF9F4] fill-current"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C320,45 640,15 960,40 C1200,58 1360,20 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
