"use client";

import Image from "next/image";
import { MapPin, Phone, ShieldCheck, MessageCircle } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const clinicPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE || "+91 80900 70037";
  const whatsappNumber = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "918090070037";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "नमस्ते वैद्य जी, मुझे श्री शिव शक्ति आयुर्वेद क्लिनिक (मुंशी पुलिया, लखनऊ) में नाड़ी परीक्षण एवं परामर्श के बारे में जानकारी चाहिए।"
  )}`;

  return (
    <footer className="bg-[#030705] text-[#9EB2A8] pt-20 pb-28 md:pb-16 border-t border-[#183627]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#12291E]">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-12 rounded-full bg-[#0F281E] border border-[#C8A356]/40 p-1 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Shree Shiv Shakti Ayurveda Logo"
                  width={571}
                  height={392}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-white font-display-luxury font-bold tracking-wider text-base uppercase block">
                  Shree Shiv Shakti Ayurveda
                </span>
                <span className="text-[11px] text-[#A3B3AB] tracking-widest uppercase block">
                  Munshipulia, Lucknow
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8DA197] leading-relaxed max-w-sm font-light">
              प्राचीन भारतीय चिकित्सा विज्ञान और नाड़ी परीक्षण के माध्यम से शरीर के त्रिदोष संतुलन और समग्र कायाकल्प के लिए समर्पित संस्थान।
            </p>

            <div className="space-y-1.5 text-xs text-[#B5C5BD] pt-1">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C76738] shrink-0 mt-0.5" />
                <span>Royal Plaza, Shop No. 11, L.G.F., Behind Pulse Heart Center, Munshi Pulia, Indira Nagar, Lucknow 226016</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C8A356] shrink-0" />
                <a href={`tel:${clinicPhone}`} className="hover:text-white transition-colors">
                  कॉल करें: {clinicPhone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  WhatsApp: +91 80900 70037 (डॉक्टर को संदेश भेजें)
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E5C77E] font-semibold">
              प्रमुख सेवाएं
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection("nadi-parikshan")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  नाड़ी परीक्षण (Pulse Diagnosis)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("doctor")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  वैद्य विजय कुमार मिश्रा परामर्श
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("panchakarma")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  पंचकर्म चिकित्सा (Panchakarma)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("shirodhara")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  शिरोधारा थेरेपी (Shirodhara)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("health-concerns")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  स्वास्थ्य परामर्श क्षेत्र
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Doctor (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E5C77E] font-semibold">
              क्लिनिक परामर्श समय
            </h4>
            
            <div className="p-4 rounded-xl bg-[#091711] border border-[#183627] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#CCD7D1]">
                <span>सोमवार — शनिवार:</span>
                <span className="font-mono text-[#E5C77E]">10:00 AM - 07:00 PM</span>
              </div>
              <div className="flex items-center justify-between text-[#8DA197]">
                <span>रविवार:</span>
                <span>केवल पूर्व अपॉइंटमेंट</span>
              </div>
              <div className="pt-2 border-t border-[#142B20] text-[11px] text-[#7E9388]">
                परामर्शदाता: <strong>वैद्य विजय कुमार मिश्रा</strong>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("consultation-form")}
              className="w-full py-2.5 rounded-full bg-[#1B3629] hover:bg-[#C76738] text-white text-xs font-medium tracking-wide transition-all cursor-pointer"
            >
              नाड़ी परीक्षण के लिए परामर्श लें
            </button>
          </div>

        </div>

        {/* Ethical Medical Disclaimer */}
        <div className="py-8 space-y-3 border-b border-[#12291E] text-[11px] text-[#6F8379] leading-relaxed">
          <div className="flex items-center space-x-2 text-[#C8A356] font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>वैधानिक एवं स्वास्थ्य सूचना (Medical Disclaimer)</span>
          </div>
          <p>
            यह वेबसाइट केवल सामान्य स्वास्थ्य जागरूकता और श्री शिव शक्ति आयुर्वेद, लखनऊ में परामर्श सुविधा के लिए है। आयुर्वेद में किसी जादुई या 100% त्वरित परिणाम का दावा नहीं किया जाता। व्यक्तिगत परिणाम रोगी की शारीरिक प्रकृति, रोग की अवधि और जीवनशैली के अनुसार भिन्न हो सकते हैं। किसी भी आपातकालीन चिकित्सकीय स्थिति (Medical Emergency) में कृपया तुरंत निकटतम इमरजेंसी अस्पताल से संपर्क करें।
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5D7066] space-y-3 sm:space-y-0">
          <div>
            © {currentYear} Shree Shiv Shakti Ayurveda. सर्वाधिकार सुरक्षित।
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>मुंशी पुलिया, इंदिरा नगर, लखनऊ</span>
            <span>•</span>
            <span className="text-[#8DA197]">Meta Campaign Optimized</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
