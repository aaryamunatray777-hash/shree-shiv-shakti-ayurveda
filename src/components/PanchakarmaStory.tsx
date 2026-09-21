"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import InteractivePanchakarmaSimulator from "@/components/InteractivePanchakarmaSimulator";

interface Therapy {
  id: string;
  stepNumber: string;
  sanskritName: string;
  englishTitle: string;
  category: string;
  oneLineDesc: string;
  detailedBenefit: string;
  indications: string[];
  element: string;
}

const THERAPIES: Therapy[] = [
  {
    id: "abhyanga",
    stepNumber: "01",
    sanskritName: "अभ्यंग (Abhyanga)",
    englishTitle: "Classical Full-Body Medicated Oil Therapy",
    category: "स्नेहन (Snehana)",
    oneLineDesc: "Traditional Ayurvedic oil massage.",
    detailedBenefit:
      "विशिष्ट जड़ी-बूटियों से सिद्ध गुनगुने तैल से पूरे शरीर की लयबद्ध मालिश। यह रक्तसंचार को तेज करता है, जोड़ों की जकड़न दूर करता है और तंत्रिका तंत्र को गहन विश्राम देता है।",
    indications: ["जोड़ों का दर्द", "शारीरिक थकान", "अनिद्रा", "वात प्रकोप"],
    element: "वायु / पृथ्वी संतुलन"
  },
  {
    id: "swedana",
    stepNumber: "02",
    sanskritName: "स्वेदन (Swedana / Swedan)",
    englishTitle: "Herbal Steam Sweating Therapy",
    category: "स्वेदन (Swedana)",
    oneLineDesc: "Traditional herbal steam / sweating therapy.",
    detailedBenefit:
      "दशमूल और औषधीय पत्तों की भाप से शरीर से पसीना निकालने की शास्त्रीय विधि। यह शरीर के सूक्ष्म स्रोतों (Channels) को खोलकर जमे हुए टॉक्सिन्स (विजातीय तत्वों) को पिघलाती है।",
    indications: ["मांसपेशियों में खिंचाव", "भारीपन", "कफ विकार", "सर्दी व जकड़न"],
    element: "अग्नि / जल शोधन"
  },
  {
    id: "virechana",
    stepNumber: "03",
    sanskritName: "विरेचन (Virechana)",
    englishTitle: "Classical Gut Cleansing & Pitta Detox",
    category: "शोधन (Shodhana)",
    oneLineDesc: "Traditional Ayurvedic cleansing procedure.",
    detailedBenefit:
      "औषधीय द्रव्यों द्वारा आंतों और यकृत (Liver) से संचित अतिरिक्त पित्त दोष को बाहर निकालना। यह पाचन अग्नि को प्रज्वलित करता है और चयापचय विकारों में अत्यंत प्रभावी माना जाता है।",
    indications: ["अम्लता / Acidity", "त्वचा रोग", "कब्ज", "यकृत सुस्ती"],
    element: "पित्त उपशमन"
  },
  {
    id: "janu-basti",
    stepNumber: "04",
    sanskritName: "जानु बस्ति (Janu Basti)",
    englishTitle: "Localized Knee Joint Rejuvenation",
    category: "स्थानिक बस्ति (Sthanik Basti)",
    oneLineDesc: "Localized Ayurvedic therapy around the knee.",
    detailedBenefit:
      "घुटनों के चारों ओर उड़द के आटे का छल्ला बनाकर उसमें विशिष्ट औषधीय गुनगुना तैल स्थिर रखा जाता है। यह घुटनों के कार्टिलेज को पोषण देता है और घर्षण कम करता है।",
    indications: ["घुटनों का दर्द (Knee Osteoarthritis)", "कार्टिलेज घिसाव", "चलने में आवाज आना", "अस्थि विकार"],
    element: "संधि पोषण"
  },
  {
    id: "kati-basti",
    stepNumber: "05",
    sanskritName: "कटि बस्ति (Kati Basti)",
    englishTitle: "Localized Lower Spine & Lumbar Care",
    category: "स्थानिक बस्ति (Sthanik Basti)",
    oneLineDesc: "Localized Ayurvedic therapy around the lower back.",
    detailedBenefit:
      "कमर और रीढ़ के निचले हिस्से (Lumbosacral region) पर औषधीय तैल को रोककर गहराई तक सिकाई। यह मांसपेशियों के स्पैज्म को खोलता है और स्लिप डिस्क या साइटिका में राहत देता है।",
    indications: ["कमर दर्द (Lower Back Pain)", "साइटिका (Sciatica)", "स्पोंडिलोसिस", "कड़ापन"],
    element: "मेरुदंड संबल"
  },
  {
    id: "rakta-mokshan",
    stepNumber: "06",
    sanskritName: "रक्त मोक्षण (Rakta Mokshan)",
    englishTitle: "Traditional Blood Purification Therapy",
    category: "शोधन (Shodhana)",
    oneLineDesc: "Traditional Ayurvedic bloodletting procedure.",
    detailedBenefit:
      "जलौका (Jalauka / औषधीय जोंक) या सिरिंज द्वारा दूषित रक्त को शास्त्रीय विधि से निकालना। यह त्वचा विकारों, सोरायसिस, एक्जिमा और स्थानीय सूजन में तीव्र शोधन प्रदान करता है।",
    indications: ["पुराने त्वचा रोग", "मुंहासे (Acne)", "स्थानीय सूजन", "वात-रक्त (Gout)"],
    element: "रक्त धातु शुद्धि"
  },
  {
    id: "greeva-basti",
    stepNumber: "07",
    sanskritName: "ग्रीवा बस्ति (Greeva Basti)",
    englishTitle: "Cervical Neck Spine Reservoir Therapy",
    category: "स्थानिक बस्ति (Sthanik Basti)",
    oneLineDesc: "Warm herbal oil pool over cervical vertebrae.",
    detailedBenefit:
      "गर्दन के पीछे सर्वाइकल रीढ़ पर उड़द के आटे की रिंग बनाकर औषधीय तैल की स्थिर सिकाई। यह गर्दन की जकड़न, सर्वाइकल स्पोंडिलोसिस और कंधों के दर्द में तुरंत राहत देती है।",
    indications: ["सर्वाइकल स्पोंडिलोसिस", "गर्दन में जकड़न", "कंप्यूटर नेक स्ट्रेन", "हाथों में झनझनाहट"],
    element: "ग्रीवा संबल"
  },
  {
    id: "udwarthana",
    stepNumber: "08",
    sanskritName: "उद्वर्तन (Udwarthana / Udv)",
    englishTitle: "Herbal Powder Friction Scrub Therapy",
    category: "रूक्षण एवं मेदोहर (Fat & Lymph Detox)",
    oneLineDesc: "Dry herbal powder friction massage.",
    detailedBenefit:
      "त्रिफला और कोलाकुलाथादि चूर्ण से बालों की विपरीत दिशा में घर्षण मालिश। यह अतिरिक्त चर्बी (मेदो धातु) को पिघलाती है, लिम्फैटिक ड्रेनेज बढ़ाती है और त्वचा में कसाव लाती है।",
    indications: ["मोटापा (Obesity)", "सेल्युलाईट", "सुस्ती व आलस्य", "कफ विकार"],
    element: "मेदो धातु शोधन"
  }
];

export default function PanchakarmaStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTherapy = THERAPIES[activeIndex];

  return (
    <section id="panchakarma" className="relative py-24 sm:py-32 bg-[#060E0A] text-[#F7F4ED] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#143628]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C76738]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0F281E] border border-[#2D5A44]/60 text-xs text-[#E5C77E] font-medium tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C76738]" />
            <span>कायाकल्प एवं शोधन</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-[#F7F4ED] tracking-tight leading-tight">
            “पंचकर्म — <span className="gold-gradient-text font-serif italic">आयुर्वेद की पारंपरिक</span> चिकित्सा परंपरा।”
          </h2>

          <p className="text-base text-[#A3B3AB] font-light leading-relaxed">
            पंचकर्म केवल एक प्रक्रिया नहीं, बल्कि शरीर, मन और स्रोतों की गहन आंतरिक शुद्धि का शास्त्रीय विज्ञान है।
          </p>
        </div>

        {/* Interactive Panchakarma & Sthanik Basti Motion Graphics Simulation Suite */}
        <div className="mb-20">
          <InteractivePanchakarmaSimulator />
        </div>

        {/* Scroll Storytelling Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Interactive Progress / Therapy Navigator (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#C8A356] font-semibold px-2 mb-2">
              चिकित्सा अनुक्रम (Therapy Sequence)
            </div>

            {THERAPIES.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                    isCurrent
                      ? "bg-[#0F281E] border-[#C8A356] shadow-xl shadow-emerald-950/40 translate-x-2"
                      : "bg-[#091711]/60 border-[#1B3629]/40 hover:bg-[#0F281E]/40 hover:border-[#2D5A44]"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-sm font-serif font-bold ${
                        isCurrent ? "text-[#C76738]" : "text-[#5F756B]"
                      }`}
                    >
                      {item.stepNumber}
                    </span>
                    <div>
                      <h3
                        className={`text-base font-serif font-semibold tracking-wide ${
                          isCurrent ? "text-[#F7F4ED]" : "text-[#B5C5BD]"
                        }`}
                      >
                        {item.sanskritName}
                      </h3>
                      <div className="text-xs text-[#7F9389] font-light mt-0.5">
                        {item.oneLineDesc}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      isCurrent
                        ? "bg-[#C76738] text-white font-medium"
                        : "bg-[#142B20] text-[#8DA197]"
                    }`}
                  >
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Immersive Story Card for Active Therapy (7 cols) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="bg-gradient-to-br from-[#0D2118] to-[#07130E] rounded-3xl p-8 sm:p-12 border border-[#2D5A44]/70 shadow-2xl relative overflow-hidden space-y-8">
              
              {/* Watermark Step Number */}
              <div className="absolute top-4 right-8 text-8xl sm:text-9xl font-serif font-bold text-white/[0.03] select-none pointer-events-none">
                {activeTherapy.stepNumber}
              </div>

              {/* Therapy Header Details */}
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest text-[#E5C77E] uppercase">
                  <Activity className="w-3.5 h-3.5 text-[#C76738]" />
                  <span>Therapy {activeTherapy.stepNumber} • {activeTherapy.element}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display-luxury text-white">
                  {activeTherapy.sanskritName}
                </h3>

                <p className="text-sm font-serif italic text-[#C8A356]">
                  {activeTherapy.englishTitle}
                </p>
              </div>

              {/* Core Description Quote */}
              <div className="p-4 rounded-xl bg-[#081610]/80 border-l-4 border-[#C76738] text-[#E4ECE7] text-sm sm:text-base font-medium">
                {activeTherapy.oneLineDesc}
              </div>

              {/* Detailed Classical Explanation */}
              <p className="text-sm sm:text-base text-[#BAC8C1] leading-relaxed font-light">
                {activeTherapy.detailedBenefit}
              </p>

              {/* Clinical Indications Tags */}
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-wider text-[#A3B3AB] font-semibold">
                  किन अवस्थाओं में परामर्श लिया जाता है:
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeTherapy.indications.map((ind, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#132F23] text-[#E2EAE5] px-3 py-1.5 rounded-lg border border-[#2D5A44]/50"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-[#1C3A2C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#8DA197] flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C8A356]" />
                  <span>वैद्य विजय कुमार मिश्रा के मार्गदर्शन में</span>
                </div>

                <button
                  onClick={() => scrollToSection("consultation-form")}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#C76738] hover:bg-[#D97746] text-white text-xs font-semibold tracking-wider transition-all shadow-lg cursor-pointer"
                >
                  <span>इस चिकित्सा पर परामर्श लें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
