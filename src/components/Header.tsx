"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Phone, MapPin, Sparkles, Menu, X, MessageCircle } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clinicPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE || "+91 80900 70037";
  const whatsappNumber = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "918090070037";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "नमस्ते वैद्य जी, मुझे श्री शिव शक्ति आयुर्वेद क्लिनिक (मुंशी पुलिया, लखनऊ) में नाड़ी परीक्षण एवं परामर्श के बारे में जानकारी चाहिए।"
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "नाड़ी परीक्षण", id: "nadi-parikshan" },
    { label: "वैद्य विजय कुमार मिश्रा", id: "doctor" },
    { label: "पंचकर्म", id: "panchakarma" },
    { label: "शिरोधारा", id: "shirodhara" },
    { label: "स्वास्थ्य परामर्श", id: "health-concerns" },
    { label: "क्लिनिक लोकेशन", id: "location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#091711]/90 backdrop-blur-md py-3 border-b border-[#2D5A44]/30 shadow-xl"
            : "bg-gradient-to-b from-[#060E0A]/85 via-[#091711]/50 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tag */}
          <a
            href="#"
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full bg-[#0F281E]/90 border border-[#C8A356]/40 p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Shree Shiv Shakti Ayurveda Logo"
                width={571}
                height={392}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="block text-white font-display-luxury tracking-wider text-sm sm:text-base font-bold uppercase group-hover:text-[#E5C77E] transition-colors">
                Shree Shiv Shakti Ayurveda
              </span>
              <div className="flex items-center text-[11px] text-[#A3B3AB] tracking-wide">
                <MapPin className="w-3 h-3 text-[#C76738] mr-1 inline" />
                <span>Munshi Pulia, Indira Nagar, Lucknow</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs uppercase tracking-widest text-[#D2DDD6] hover:text-[#E5C77E] transition-colors py-1 relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C76738] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs text-emerald-300 hover:text-white transition-colors border border-emerald-500/40 px-3 py-1.5 rounded-full bg-[#082218]/80 backdrop-blur-sm shadow-sm"
              title="WhatsApp पर डॉक्टर को संदेश भेजें (8090070037)"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${clinicPhone}`}
              className="flex items-center space-x-1.5 text-xs text-[#E5C77E] hover:text-white transition-colors border border-[#C8A356]/40 px-3 py-1.5 rounded-full bg-[#0F281E]/60 backdrop-blur-sm"
              title="सीधे कॉल करें (8090070037)"
            >
              <Phone className="w-3.5 h-3.5 text-[#C76738]" />
              <span className="font-mono">8090070037</span>
            </a>

            <button
              onClick={() => scrollToSection("consultation-form")}
              className="relative group overflow-hidden px-4 py-2 rounded-full bg-gradient-to-r from-[#C76738] to-[#D97746] text-white text-xs font-semibold tracking-wider shadow-lg hover:shadow-orange-950/50 hover:brightness-110 transition-all cursor-pointer"
            >
              <span className="relative z-10 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 mr-1 text-[#F7F4ED]" />
                <span>परामर्श बुक करें</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#091711]/98 border-b border-[#2D5A44]/50 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection(item.id);
                  }}
                  className="text-left text-sm font-medium text-[#E4ECE7] hover:text-[#E5C77E] py-2 border-b border-[#1A382A]/60"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 flex flex-col space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-full border border-emerald-500/50 bg-[#092218] text-emerald-300 text-sm font-medium shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp पर डॉक्टर को मैसेज भेजें</span>
              </a>

              <a
                href={`tel:${clinicPhone}`}
                className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-full border border-[#C8A356]/40 text-[#E5C77E] text-sm"
              >
                <Phone className="w-4 h-4 text-[#C76738]" />
                <span>सीधे क्लिनिक कॉल करें (8090070037)</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection("consultation-form");
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#C76738] to-[#D97746] text-white text-sm font-semibold tracking-wide shadow-md"
              >
                नाड़ी परीक्षण के लिए परामर्श लें
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
