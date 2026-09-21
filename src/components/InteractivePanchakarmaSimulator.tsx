"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Activity,
  Droplets,
  ChevronRight,
  RotateCcw,
  Thermometer,
  Layers
} from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export type TherapyId =
  | "janu-basti"
  | "kati-basti"
  | "greeva-basti"
  | "abhyanga"
  | "swedana"
  | "udwarthana"
  | "virechana"
  | "rakta-mokshan"
  | "shirodhara";

export interface TherapySimData {
  id: TherapyId;
  nameHi: string;
  nameEn: string;
  category: string;
  targetArea: string;
  accentColor: string;
  glowColor: string;
  temperature: string;
  duration: string;
  sessionCycles: string;
  medicatedMedium: string;
  herbs: string[];
  keyIndications: string[];
  clinicalBenefit: string;
  vaidyaQuote: string;
}

export const THERAPY_SIM_DATA: TherapySimData[] = [
  {
    id: "janu-basti",
    nameHi: "जानु बस्ति (Janu Basti)",
    nameEn: "Knee Joint Oil Reservoir Pool",
    category: "स्थानिक बस्ति (Joint Rejuvenation)",
    targetArea: "दोनों घुटनों के जोड़ (Knee Cartilage & Patella)",
    accentColor: "#E5C77E",
    glowColor: "rgba(229, 199, 126, 0.35)",
    temperature: "40.5° C (सुखोष्ण)",
    duration: "30-45 मिनट",
    sessionCycles: "7 से 14 दिवसीय सत्र",
    medicatedMedium: "महानारायण तैल / क्षीरबला तैल",
    herbs: ["बला", "अश्वगंधा", "दशमूल", "तिल तैल", "रास्ना"],
    keyIndications: ["घुटनों का दर्द (Knee Osteoarthritis)", "कार्टिलेज घिसाव व कटकट आवाज", "चलने-फिरने में जकड़न", "वात विकार"],
    clinicalBenefit:
      "घुटने के चारों ओर उड़द के आटे का छल्ला बनाकर उसमें लगातार गुनगुना औषधीय तैल भरकर रखा जाता है। यह तैल घुटने के कार्टिलेज में समाकर साइनोवियल फ्लूइड बढ़ाता है और घर्षण दूर करता है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: घुटनों के दर्द में बिना ऑपरेशन राहत पाने के लिए जानु बस्ति और अभ्यंग का नियमित संयोजन कार्टिलेज का पोषण पुनः जाग्रत करता है।"
  },
  {
    id: "kati-basti",
    nameHi: "कटि बस्ति (Kati Basti)",
    nameEn: "Lumbar Spine Oil Reservoir Pool",
    category: "स्थानिक बस्ति (Spinal Care)",
    targetArea: "निचली कमर एवं साइटिका नर्व (L3-L5-S1)",
    accentColor: "#C76738",
    glowColor: "rgba(199, 103, 56, 0.4)",
    temperature: "41.0° C (सुखोष्ण)",
    duration: "35-45 मिनट",
    sessionCycles: "7 से 21 दिवसीय सत्र",
    medicatedMedium: "धन्वन्तरम् तैल / सहचरादि तैल",
    herbs: ["सहचर", "दशमूल", "बला", "निर्गुण्डी", "एरंड मूल"],
    keyIndications: ["कमर दर्द (Low Back Pain)", "साइटिका (Sciatica Nerve Pain)", "स्लिप डिस्क (Herniated Disc)", "रीढ़ में कड़ापन"],
    clinicalBenefit:
      "लम्बर रीढ़ पर औषधीय तैल रोककर रीढ़ की हड्डियों और नसों की गहरी सिकाई की जाती है। यह दबी हुई नसों का तनाव दूर कर मेरुदंड को लचीला बनाता है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: साइटिका और स्लिप डिस्क के रोगियों में कटि बस्ति रीढ़ की सूजन को घटाकर नसों को तुरंत पोषण और संबल देती है।"
  },
  {
    id: "greeva-basti",
    nameHi: "ग्रीवा बस्ति (Greeva Basti)",
    nameEn: "Cervical Neck Spine Reservoir",
    category: "स्थानिक बस्ति (Cervical Spine)",
    targetArea: "गर्दन एवं सर्वाइकल रीढ़ (C1-C7)",
    accentColor: "#52B788",
    glowColor: "rgba(82, 183, 136, 0.35)",
    temperature: "39.5° C (मृदु उष्ण)",
    duration: "30-40 मिनट",
    sessionCycles: "7 से 14 दिवसीय सत्र",
    medicatedMedium: "प्रसारिणी तैल / महाविषगर्भ तैल",
    herbs: ["प्रसारिणी", "देवदारु", "रास्ना", "अश्वगंधा", "लहसुन"],
    keyIndications: ["सर्वाइकल स्पोंडिलोसिस (Cervical Spondylosis)", "गर्दन की जकड़न", "कंधों व हाथों में झनझनाहट", "कंप्यूटर नेक स्ट्रेन"],
    clinicalBenefit:
      "गर्दन के पीछे सर्वाइकल वर्टिब्रा पर गर्म औषधीय तैल को रोककर नसों और मांसपेशियों का जकड़ापन दूर किया जाता है। इससे सिर और हाथों की ओर जाने वाले रक्तसंचार में सुधार होता है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: आज की जीवनशैली में मोबाइल और लैपटॉप के निरंतर उपयोग से गर्दन में जो कड़ापन आता है, उसे ग्रीवा बस्ति प्राकृतिक रूप से समाप्त करती है।"
  },
  {
    id: "abhyanga",
    nameHi: "अभ्यंग (Abhyanga)",
    nameEn: "Classical Full-Body Marma Oil Flow",
    category: "स्नेहन (Full Body Oleation)",
    targetArea: "संपूर्ण शरीर एवं 107 मर्म बिंदु",
    accentColor: "#F3C969",
    glowColor: "rgba(243, 201, 105, 0.35)",
    temperature: "39.0° C (सुखोष्ण)",
    duration: "45-60 मिनट",
    sessionCycles: "नियमित या 7-14 दिवसीय चक्र",
    medicatedMedium: "अश्वगंधादि तैल / चन्दनादि तैल",
    herbs: ["अश्वगंधा", "बला", "मंजिष्ठा", "यष्टिमधु", "तिल तैल"],
    keyIndications: ["शारीरिक कमजोरी", "तंत्रिका तनाव व अनिद्रा", "जोड़ों की अकड़न", "त्वचा का सूखापन व वात प्रकोप"],
    clinicalBenefit:
      "शरीर के 107 मर्म बिंदुओं और रक्त वाहिकाओं की दिशा में विशिष्ट आयुर्वेदिक दबाव से की जाने वाली मालिश। यह शरीर के विषैले तत्वों को ढीला कर बाहर निकालने के लिए तैयार करती है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: अभ्यंग केवल मालिश नहीं है; यह रक्तसंचार, लसीका (Lymph) और स्नायु तंत्र को पुनर्जीवित करने वाली एक गहन शास्त्रीय चिकित्सा है।"
  },
  {
    id: "swedana",
    nameHi: "स्वेदन (Swedana / Steam Therapy)",
    nameEn: "Herbal Steam Chamber Perspiration",
    category: "स्वेदन (Herbal Sudation)",
    targetArea: "समस्त त्वचा के रोमकूप एवं श्वेत ग्रंथियां",
    accentColor: "#E07A5F",
    glowColor: "rgba(224, 122, 95, 0.4)",
    temperature: "42.0° C (वाष्प सिकाई)",
    duration: "15-25 मिनट",
    sessionCycles: "अभ्यंग के तुरंत बाद",
    medicatedMedium: "दशमूल एवं निर्गुण्डी औषधीय वाष्प",
    herbs: ["दशमूल", "निर्गुण्डी", "एरंड पत्र", "तुलसी", "अजवायन"],
    keyIndications: ["शरीर में भारीपन", "मांसपेशियों का दर्द", "टॉक्सिन जमाव (आम दोष)", "कफ व वात अवरोध"],
    clinicalBenefit:
      "औषधीय जड़ी-बूटियों के काढ़े की भाप से शरीर से पसीना निकालने की प्रक्रिया। यह त्वचा के सभी छिद्रों को खोलकर अभ्यंग द्वारा पिघले हुए टॉक्सिन्स को बाहर कर देती है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: स्वेदन से शरीर हल्का महसूस करता है, नसों का अवरोध खुलता है और जोड़ों का कड़ापन तुरंत पिघल जाता है।"
  },
  {
    id: "udwarthana",
    nameHi: "उद्वर्तन (Udwarthana / Udv)",
    nameEn: "Herbal Powder Friction Scrub",
    category: "रूक्षण एवं मेदोहर (Fat & Lymph Detox)",
    targetArea: "संपूर्ण त्वचा, वसा परत एवं सबक्यूटेनियस फैट",
    accentColor: "#A3B18A",
    glowColor: "rgba(163, 177, 138, 0.35)",
    temperature: "शुष्क घर्षण (Room Temp / Warm Scrub)",
    duration: "35-45 मिनट",
    sessionCycles: "14 से 28 दिवसीय सत्र",
    medicatedMedium: "कोलाकुलाथादि चूर्ण / त्रिफला चूर्ण",
    herbs: ["कोलाकुलाथादि", "त्रिफला", "लोध्र", "मुस्ता", "खदिर"],
    keyIndications: ["मोटापा (Obesity & Belly Fat)", "शरीर की सुस्ती व आलस्य", "सेल्युलाईट (Cellulite)", "कफ की अधिकता व त्वचा विकार"],
    clinicalBenefit:
      "बालों की विपरीत दिशा (प्रतिलोम) में औषधीय चूर्ण से तीव्र घर्षण मालिश। यह सबक्यूटेनियस फैट को तोड़ती है, लिम्फैटिक ड्रेनेज को सक्रिय करती है और त्वचा में प्राकृतिक चमक लाती है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: वजन घटाने, अत्यधिक कफ को सुखाने और त्वचा को टोन करने में उद्वर्तन से बेहतर कोई प्राकृतिक चिकित्सा नहीं है।"
  },
  {
    id: "virechana",
    nameHi: "विरेचन (Virechana)",
    nameEn: "Classical Pitta & Gut Cleansing",
    category: "प्रधान शोधन (Pradhan Shodhana)",
    targetArea: "आमाशय, यकृत (Liver), पित्ताशय व आंतें",
    accentColor: "#81B29A",
    glowColor: "rgba(129, 178, 154, 0.35)",
    temperature: "आंतरिक औषधि शोधन",
    duration: "सत्रानुसार (Day-Long Protocol)",
    sessionCycles: "3 दिवसीय पूर्वकर्म + 1 दिन प्रधान",
    medicatedMedium: "त्रिवृत्त लेह्यम / एरंड भृष्ट हरीतकी",
    herbs: ["त्रिवृत्त", "निशोथ", "आमलकी", "हरीतकी", "दंती"],
    keyIndications: ["क्रोनिक एसिडिटी व पित्त प्रकोप", "त्वचा रोग (सोरायसिस, एक्जिमा)", "फैटी लिवर व कब्ज", "शरीर में जलन व रक्त विकार"],
    clinicalBenefit:
      "औषधियों द्वारा छोटी आंत और लिवर में जमा विकृत पित्त और आम दोष को गुदा मार्ग से बाहर निकाला जाता है। इससे पाचन अग्नि पुनः प्रदीप्त होती है और त्वचा का तेज लौटता है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: सभी पित्त रोगों और पुराने त्वचा विकारों की जड़ पेट और लिवर में होती है, विरेचन उस जड़ को ही पूरी तरह शुद्ध कर देता है।"
  },
  {
    id: "rakta-mokshan",
    nameHi: "रक्त मोक्षण (Rakta Mokshan)",
    nameEn: "Classical Bloodletting & Micro-Detox",
    category: "रक्त शोधन (Micro-Purification)",
    targetArea: "स्थानिक दूषित रक्त वाहिकाएं एवं त्वचा",
    accentColor: "#E63946",
    glowColor: "rgba(230, 57, 70, 0.35)",
    temperature: "प्राकृतिक जलौका तापमान",
    duration: "30-45 मिनट",
    sessionCycles: "आवश्यकतानुसार 3-7 सत्र",
    medicatedMedium: "औषधीय जलौका (Medicinal Jalauka / Leech)",
    herbs: ["हरिद्रा", "त्रिफला जल", "गुग्गुलु", "नीम क्वाथ"],
    keyIndications: ["वात-रक्त (Gout / Uric Acid Pain)", "गंभीर मुंहासे (Severe Acne)", "स्थानीय सूजन व नीलापन", "वेरिकोज वेन्स (Varicose Veins)"],
    clinicalBenefit:
      "आयुर्वेदिक जलौका (Leech) केवल अशुद्ध और जमे हुए दूषित रक्त को ही चूसती है और अपनी लार से हिरुडिन व एंटी-इंफ्लेमेटरी एंजाइम छोड़ती है, जिससे दर्द और सूजन में तत्काल आराम मिलता है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: यूरिक एसिड, गाउट और पुराने त्वचा रोगों में जहां सूजन कम नहीं होती, वहां रक्त मोक्षण आश्चर्यजनक रूप से तेजी से राहत देता है।"
  },
  {
    id: "shirodhara",
    nameHi: "शिरोधारा (Shirodhara)",
    nameEn: "Forehead Medicated Oil Stream",
    category: "मस्तिष्क शोधन (Neuro-Relaxation)",
    targetArea: "ललाट, आज्ञा चक्र एवं समस्त स्नायु तंत्र",
    accentColor: "#D4AF37",
    glowColor: "rgba(212, 175, 55, 0.4)",
    temperature: "38.5° C (सुखोष्ण धारा)",
    duration: "35-50 मिनट",
    sessionCycles: "7 से 21 दिवसीय सत्र",
    medicatedMedium: "ब्राह्मी तैल / क्षीरबला / तक्र",
    herbs: ["ब्राह्मी", "जटामांसी", "शंखपुष्पी", "चंदन"],
    keyIndications: ["अनिद्रा (Insomnia)", "क्रोनिक माइग्रेन", "तनाव एवं अवसाद", "उच्च रक्तचाप"],
    clinicalBenefit:
      "ललाट पर निरंतर गुनगुने औषधीय तैल की धारा प्रवाहित की जाती है। यह मस्तिष्क की बीटा तरंगों को अल्फा और थीटा तरंगों में बदलकर गहरी शांति और निद्रा प्रदान करती है।",
    vaidyaQuote:
      "वैद्य जी का अवलोकन: मन और मस्तिष्क की थकावट को मिटाने के लिए शिरोधारा संपूर्ण आयुर्वेद की सबसे शक्तिशाली विश्रांति चिकित्सा है।"
  }
];

export default function InteractivePanchakarmaSimulator() {
  const [selectedTherapyId, setSelectedTherapyId] = useState<TherapyId>("janu-basti");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const therapy = THERAPY_SIM_DATA.find((t) => t.id === selectedTherapyId) || THERAPY_SIM_DATA[0];

  // Audio synthesis for meditative ambient tones
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);

    if (next && typeof window !== "undefined") {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 136.1 Hz (Om meditation harmonic frequency)
        osc.type = "sine";
        osc.frequency.setValueAtTime(136.1, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setTimeout(() => {
          try {
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);
            setTimeout(() => osc.stop(), 3000);
          } catch {
            // Ignore
          }
        }, 1500);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="w-full bg-[#07130E] rounded-3xl border border-[#214736] p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white">
      {/* Dynamic Ambient Background Aura */}
      <div
        className="absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: therapy.glowColor }}
      />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#143628]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A382A] pb-6 mb-8 relative z-10">
        <div className="flex items-center space-x-4">
          {/* Doctor Face Avatar Circle */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E5C77E] shrink-0 shadow-xl ring-2 ring-[#C76738]/30">
            <Image
              src="/images/face2.png"
              alt="वैद्य विजय कुमार मिश्रा - पंचकर्म विशेषज्ञ"
              fill
              className="object-cover object-center"
            />
            <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#091711] shadow-sm animate-pulse" />
          </div>

          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#E5C77E] font-semibold mb-1">
              <Activity className="w-4 h-4 text-[#C76738] animate-pulse" />
              <span>सजीव पंचकर्म एवं स्थानिक बस्ति सिमुलेटर</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              शास्त्रीय आयुर्वेदिक चिकित्सा प्रक्रियाओं का सजीव मोशन अनुभव
            </h3>
            <p className="text-xs text-[#95A79E] font-light mt-0.5">
              जानु बस्ति, कटि बस्ति, ग्रीवा बस्ति, अभ्यंग, स्वेदन, उद्वर्तन, विरेचन व रक्त मोक्षण की आंतरिक कार्यप्रणाली को प्रत्यक्ष समझें।
            </p>
          </div>
        </div>

        {/* Global Sound & Simulation Controls */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-[#2D5A44] bg-[#0E2319] hover:bg-[#143224] text-xs text-[#CCD7D1] transition-all cursor-pointer"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-[#E5C77E] ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "10s" }} />
            <span>{isPlaying ? "सिमुलेशन सक्रिय" : "रुका हुआ"}</span>
          </button>

          <button
            onClick={toggleSound}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer ${
              soundEnabled
                ? "bg-[#C76738] border-[#E88656] text-white shadow-lg shadow-orange-950/40"
                : "bg-[#0F281E] border-[#274F3B] text-[#CCD7D1] hover:text-white"
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-white" />
                <span>ध्वनि चालू</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#95A79E]" />
                <span>ध्वनि सुनें (136 Hz)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Therapy Selector Pills (All 9 Classical Therapies) */}
      <div className="mb-8 relative z-10">
        <div className="text-xs uppercase tracking-wider text-[#A3B3AB] font-semibold mb-3 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#C8A356]" />
          <span>चिकित्सा का चयन करें (Select Classical Therapy):</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {THERAPY_SIM_DATA.map((t) => {
            const isSelected = t.id === selectedTherapyId;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTherapyId(t.id)}
                className={`px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-[#143628] border-current shadow-lg scale-[1.02]"
                    : "bg-[#091711] border-[#1C3B2D] text-[#8DA197] hover:border-[#2D5A44] hover:text-white"
                }`}
                style={{ color: isSelected ? t.accentColor : undefined }}
              >
                <div className="truncate">
                  <span className="text-xs font-serif font-bold block truncate">
                    {t.nameHi.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-[#7F9389] block truncate font-sans">
                    {t.category.split(" ")[0]}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-current animate-ping shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left: Motion Graphics Visual Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#2D5A44]/80 bg-[#040A07] shadow-2xl select-none group">
            
            {/* Photographic Base Canvas Texture */}
            <Image
              src="/images/panchakarma_therapies.jpg"
              alt={`${therapy.nameHi} - Ayurvedic Therapy Simulation`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-center brightness-[0.75] contrast-110"
            />

            {/* Dark Vignette Overlay for Motion Graphics Clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A07]/95 via-[#040A07]/50 to-[#040A07]/80 pointer-events-none" />

            {/* Live Doctor Picture-in-Picture Floating Badge on Canvas */}
            <div className="absolute top-3 left-3 z-30 flex items-center space-x-2.5 px-3 py-2 rounded-2xl bg-[#060E0A]/90 backdrop-blur-md border border-[#C8A356]/40 shadow-2xl">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#E5C77E] shrink-0 shadow-md">
                <Image
                  src="/images/face2.png"
                  alt="वैद्य विजय कुमार मिश्रा"
                  fill
                  className="object-cover object-center"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#060E0A] animate-pulse" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#E5C77E]">
                    सजीव चिकित्सा निरीक्षण
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                  वैद्य विजय कुमार मिश्रा
                </div>
                <div className="text-[10px] text-[#95A79E] font-light">
                  BAMS, DNYS • 18+ वर्ष अनुभव
                </div>
              </div>
            </div>

            {/* Live Telemetry Badge (Top Right) */}
            <div className="absolute top-3 right-3 z-30 flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#060E0A]/85 backdrop-blur-md border border-[#214736] text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: therapy.accentColor }} />
              <span className="text-[#E2EAE5]">तापमान: <strong>{therapy.temperature}</strong></span>
            </div>

            {/* DYNAMIC SVG MOTION GRAPHIC ENGINES (Per Therapy) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 1000 625"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="therapy-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="oil-pool-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C76738" stopOpacity="0.9" />
                  <stop offset="50%" stopColor={therapy.accentColor} stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#8C4A26" stopOpacity="0.85" />
                </linearGradient>

                <radialGradient id="steam-puff-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                  <stop offset="60%" stopColor={therapy.accentColor} stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. JANU BASTI / KATI BASTI / GREEVA BASTI: Dough Reservoir Pool & Thermal Infiltration */}
              {(therapy.id === "janu-basti" || therapy.id === "kati-basti" || therapy.id === "greeva-basti") && (
                <g transform="translate(500, 320)">
                  {/* Anatomical Background Joint / Spine Contour */}
                  <ellipse cx="0" cy="0" rx="220" ry="140" fill="#0C1B14" stroke="#1F4232" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

                  {/* Radiating Deep Heat Thermal Wave Rings (Penetrating Cartilage & Nerve) */}
                  <ellipse cx="0" cy="0" rx="190" ry="115" fill="none" stroke={therapy.accentColor} strokeWidth="1.5" opacity="0.4" className="animate-ping" style={{ animationDuration: "2.8s" }} />
                  <ellipse cx="0" cy="0" rx="145" ry="90" fill="none" stroke={therapy.accentColor} strokeWidth="2" opacity="0.6" className="animate-pulse" />

                  {/* Classical Dough Ring (माष पिष्ट रिंग / Herbal Black Gram Dough Reservoir Wall) */}
                  <ellipse cx="0" cy="0" rx="125" ry="75" fill="none" stroke="#684725" strokeWidth="22" filter="url(#therapy-glow)" />
                  <ellipse cx="0" cy="0" rx="125" ry="75" fill="none" stroke="#D8B17A" strokeWidth="4" strokeDasharray="12 6" opacity="0.75" />

                  {/* Warm Medicated Oil Pool Filling the Center */}
                  <ellipse cx="0" cy="0" rx="114" ry="64" fill="url(#oil-pool-grad)" filter="url(#therapy-glow)" />

                  {/* Golden Thermal Fluid Convection Streams */}
                  <path
                    d="M -70 0 Q 0 -30 70 0 Q 0 30 -70 0"
                    fill="none"
                    stroke="#FFF7DB"
                    strokeWidth="2"
                    strokeDasharray="15 15"
                    className="pulse-line-anim"
                  />
                  <path
                    d="M 0 -40 Q 35 0 0 40 Q -35 0 0 -40"
                    fill="none"
                    stroke="#FFE39F"
                    strokeWidth="1.5"
                    strokeDasharray="20 20"
                    className="pulse-line-anim"
                  />

                  {/* Center Warm Heat Core Glow */}
                  <circle cx="0" cy="0" r="14" fill="#FFF7DB" filter="url(#therapy-glow)" className="animate-pulse" />

                  {/* Procedural Anatomy Label in SVG */}
                  <text x="0" y="105" textAnchor="middle" fill="#E5C77E" fontSize="13" fontFamily="serif" fontWeight="bold">
                    {therapy.id === "janu-basti" && "घुटने की संधि एवं कार्टिलेज (Knee Joint)"}
                    {therapy.id === "kati-basti" && "लम्बर रीढ़ एवं साइटिका नर्व (L3-L5 Disc)"}
                    {therapy.id === "greeva-basti" && "सर्वाइकल स्पाइन एवं नसें (C1-C7 Region)"}
                  </text>
                </g>
              )}

              {/* 2. ABHYANGA: Marma Energy Flow Lines & Rhythmic Stroke Waves */}
              {therapy.id === "abhyanga" && (
                <g transform="translate(500, 310)">
                  {/* Energy Channel Nadis Streams */}
                  <path d="M -350 40 C -150 -80, 150 80, 350 -40" fill="none" stroke="url(#oil-pool-grad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="30 40" className="pulse-line-anim" filter="url(#therapy-glow)" />
                  <path d="M -350 -40 C -150 80, 150 -80, 350 40" fill="none" stroke="#F3C969" strokeWidth="4" strokeLinecap="round" strokeDasharray="20 30" className="pulse-line-anim" filter="url(#therapy-glow)" />

                  {/* 3 Main Marma Energy Concentric Points */}
                  {[-180, 0, 180].map((xOffset, i) => (
                    <g key={i} transform={`translate(${xOffset}, 0)`}>
                      <circle cx="0" cy="0" r="38" fill="none" stroke="#E5C77E" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: `${2 + i * 0.4}s` }} />
                      <circle cx="0" cy="0" r="22" fill="#0C2417" stroke="#F3C969" strokeWidth="3" />
                      <circle cx="0" cy="0" r="7" fill="#C76738" className="animate-pulse" />
                      <text x="0" y="45" textAnchor="middle" fill="#BAC8C1" fontSize="11" fontFamily="sans-serif">
                        मर्म बिंदु {i + 1}
                      </text>
                    </g>
                  ))}

                  <text x="0" y="110" textAnchor="middle" fill="#E5C77E" fontSize="13" fontFamily="serif">
                    प्राण प्रवाह एवं 107 मर्म बिंदुओं की लयबद्ध सिकाई
                  </text>
                </g>
              )}

              {/* 3. SWEDANA: Rising Medicated Herbal Steam Vapor & Perspiration */}
              {therapy.id === "swedana" && (
                <g transform="translate(500, 340)">
                  {/* Steam Boiler Chamber Base */}
                  <rect x="-180" y="70" width="360" height="30" rx="8" fill="#143628" stroke="#2D5A44" strokeWidth="2" />
                  <text x="0" y="90" textAnchor="middle" fill="#E5C77E" fontSize="11">
                    दशमूल औषधीय वाष्प पात्र (Dashamoola Boiler)
                  </text>

                  {/* Rising Steam Plumes */}
                  {[-120, -60, 0, 60, 120].map((xPos, idx) => (
                    <g key={idx} transform={`translate(${xPos}, 0)`}>
                      <path
                        d="M 0 60 Q -25 0, 0 -60 Q 25 -120, 0 -180"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth={4 + (idx % 3)}
                        strokeLinecap="round"
                        opacity="0.6"
                        strokeDasharray="20 20"
                        className="pulse-line-anim"
                        filter="url(#therapy-glow)"
                      />
                      <circle cx="0" cy={-80 - idx * 15} r="18" fill="url(#steam-puff-grad)" className="animate-ping" style={{ animationDuration: "2.2s" }} />
                    </g>
                  ))}

                  {/* Body Pore Detox Wave */}
                  <ellipse cx="0" cy="-70" rx="200" ry="60" fill="none" stroke="#E07A5F" strokeWidth="2" strokeDasharray="8 6" opacity="0.65" />
                  <text x="0" y="-120" textAnchor="middle" fill="#FFF" fontSize="14" fontFamily="serif" fontWeight="bold">
                    रोमकूपों का खुलना एवं विजातीय तत्वों (Toxins) का निष्कासन
                  </text>
                </g>
              )}

              {/* 4. UDWARTHANA: Herbal Powder Friction Scrub Lines & Lymph Flow */}
              {therapy.id === "udwarthana" && (
                <g transform="translate(500, 310)">
                  {/* Upward Friction Churna Motion Arrows (Pratiloma - Against Hair Growth) */}
                  {[-160, -80, 0, 80, 160].map((xOffset, i) => (
                    <g key={i} transform={`translate(${xOffset}, 0)`}>
                      <line x1="0" y1="90" x2="0" y2="-90" stroke="#A3B18A" strokeWidth="4" strokeDasharray="14 10" strokeLinecap="round" className="pulse-line-anim" filter="url(#therapy-glow)" />
                      <polygon points="0,-105 -10,-85 10,-85" fill="#E5C77E" />
                      {/* Powder Particle Flecks */}
                      <circle cx="-12" cy="15" r="3" fill="#D4A373" />
                      <circle cx="14" cy="-30" r="3.5" fill="#E5C77E" />
                    </g>
                  ))}

                  <ellipse cx="0" cy="0" rx="210" ry="70" fill="none" stroke="#C8A356" strokeWidth="1.5" opacity="0.5" strokeDasharray="6 8" />
                  <text x="0" y="115" textAnchor="middle" fill="#E5C77E" fontSize="13" fontFamily="serif">
                    प्रतिलोम घर्षण — मेद (वसा) का पिघलना एवं लिम्फैटिक ड्रेनेज
                  </text>
                </g>
              )}

              {/* 5. VIRECHANA: Internal Metabolic Cleansing & Pitta Shodhana Flow */}
              {therapy.id === "virechana" && (
                <g transform="translate(500, 310)">
                  {/* Central Digestive Agni Core */}
                  <circle cx="0" cy="-30" r="65" fill="#81B29A" opacity="0.2" className="animate-ping" style={{ animationDuration: "3s" }} />
                  <ellipse cx="0" cy="-30" rx="75" ry="50" fill="url(#oil-pool-grad)" filter="url(#therapy-glow)" />
                  <text x="0" y="-25" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="bold">
                    यकृत एवं पित्त कोष (Liver Detox)
                  </text>

                  {/* Downward Shodhana Toxin Elimination Path (Adhobhaga Shodhana) */}
                  <path d="M 0 20 L 0 110" stroke="#E5C77E" strokeWidth="6" strokeDasharray="15 15" strokeLinecap="round" className="pulse-line-anim" filter="url(#therapy-glow)" />
                  <polygon points="0,125 -12,105 12,105" fill="#C76738" />

                  {/* Cleansing Energy Rings */}
                  <ellipse cx="0" cy="70" rx="140" ry="40" fill="none" stroke="#81B29A" strokeWidth="2" opacity="0.6" strokeDasharray="8 6" />
                  <text x="0" y="145" textAnchor="middle" fill="#E5C77E" fontSize="13" fontFamily="serif">
                    अधोभाग शोधन — आंतों व लिवर से संचित पित्त दोष का पूर्ण निष्कासन
                  </text>
                </g>
              )}

              {/* 6. RAKTA MOKSHAN: Jalauka Micro-Circulation & Localized Purification */}
              {therapy.id === "rakta-mokshan" && (
                <g transform="translate(500, 310)">
                  {/* Localized Inflamed Area Contour */}
                  <ellipse cx="0" cy="0" rx="160" ry="95" fill="#380D11" stroke="#E63946" strokeWidth="2" opacity="0.8" />
                  <ellipse cx="0" cy="0" rx="195" ry="120" fill="none" stroke="#E63946" strokeWidth="1.5" opacity="0.4" className="animate-ping" />

                  {/* Classical Jalauka (Medicinal Leech) Silhouette Symbol */}
                  <path d="M -80 -10 C -40 -35, 40 35, 80 10 C 60 25, -20 -15, -80 -10 Z" fill="#1C382A" stroke="#52B788" strokeWidth="2" filter="url(#therapy-glow)" />

                  {/* Micro-drainage purification streams radiating inward */}
                  <line x1="-120" y1="0" x2="-20" y2="0" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="8 8" className="pulse-line-anim" />
                  <line x1="120" y1="0" x2="20" y2="0" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="8 8" className="pulse-line-anim" />
                  <line x1="0" y1="-65" x2="0" y2="-10" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="8 8" className="pulse-line-anim" />
                  <line x1="0" y1="65" x2="0" y2="10" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="8 8" className="pulse-line-anim" />

                  <circle cx="0" cy="0" r="10" fill="#E63946" className="animate-pulse" />
                  <text x="0" y="120" textAnchor="middle" fill="#E5C77E" fontSize="13" fontFamily="serif">
                    जलौका अवचारण — केवल दूषित रक्त व यूरिक एसिड का सूक्ष्म शोधन
                  </text>
                </g>
              )}

              {/* 7. SHIRODHARA: Forehead Oil Stream */}
              {therapy.id === "shirodhara" && (
                <g transform="translate(500, 200)">
                  {/* Suspended Bronze Pot */}
                  <ellipse cx="0" cy="0" rx="40" ry="14" fill="#8C6D37" stroke="#D4AF37" strokeWidth="2" />
                  <path d="M -38 0 C -38 35, -20 65, -5 75 L -5 85 L 5 85 L 5 75 C 20 65, 38 35, 38 0 Z" fill="url(#oil-pool-grad)" stroke="#C8A356" strokeWidth="2" />
                  
                  {/* Flowing Stream */}
                  <line x1="0" y1="85" x2="0" y2="230" stroke="#F3C969" strokeWidth="5" strokeDasharray="18 10" className="pulse-line-anim" filter="url(#therapy-glow)" />

                  {/* Forehead Impact Ripples */}
                  <ellipse cx="0" cy="230" rx="45" ry="15" fill="none" stroke="#E5C77E" strokeWidth="2" className="animate-ping" />
                  <ellipse cx="0" cy="230" rx="80" ry="25" fill="none" stroke="#C76738" strokeWidth="1.5" className="animate-pulse" />
                  <circle cx="0" cy="230" r="7" fill="#FFF7DB" />
                  <text x="0" y="270" textAnchor="middle" fill="#E5C77E" fontSize="13" fontFamily="serif">
                    आज्ञा चक्र पर निरंतर सुखोष्ण तैल धारा — अल्फा तरंग विश्रांति
                  </text>
                </g>
              )}
            </svg>

            {/* Bottom Status Bar on Canvas */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#060E0A]/90 backdrop-blur-md border border-[#214736]/70 text-xs z-30">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: therapy.accentColor }} />
                <span className="text-white font-serif font-bold">
                  {therapy.nameHi}
                </span>
                <span className="text-[#8DA197] hidden sm:inline">•</span>
                <span className="text-[#CCD7D1] text-[11px] hidden sm:inline">
                  {therapy.targetArea}
                </span>
              </div>

              <div className="text-[#E5C77E] text-[11px] font-mono">
                सत्र समय: <strong>{therapy.duration}</strong>
              </div>
            </div>

          </div>

          {/* Quick Procedure Metrics Cards Below Canvas */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-[#0A1A12] border border-[#1C3B2D] space-y-0.5">
              <div className="text-[10px] uppercase text-[#8DA197] font-semibold flex items-center space-x-1">
                <Thermometer className="w-3 h-3 text-[#C76738]" />
                <span>चिकित्सा तापमान</span>
              </div>
              <div className="text-xs font-semibold text-white font-mono">
                {therapy.temperature}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0A1A12] border border-[#1C3B2D] space-y-0.5">
              <div className="text-[10px] uppercase text-[#8DA197] font-semibold flex items-center space-x-1">
                <Activity className="w-3 h-3 text-[#E5C77E]" />
                <span>अवधि व सत्र</span>
              </div>
              <div className="text-xs font-semibold text-white truncate">
                {therapy.sessionCycles}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0A1A12] border border-[#1C3B2D] space-y-0.5">
              <div className="text-[10px] uppercase text-[#8DA197] font-semibold flex items-center space-x-1">
                <Droplets className="w-3 h-3 text-[#52B788]" />
                <span>प्रयुक्त माध्यम</span>
              </div>
              <div className="text-xs font-semibold text-white truncate" title={therapy.medicatedMedium}>
                {therapy.medicatedMedium.split(" / ")[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clinical Indications & Vaidya Guidance Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Doctor Spotlight Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#122A1E] to-[#0A1A12] border border-[#C8A356]/40 shadow-xl relative overflow-hidden">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E5C77E] shrink-0 shadow-lg ring-2 ring-[#C76738]/40 ring-offset-2 ring-offset-[#0A1A12]">
                <Image
                  src="/images/face2.png"
                  alt="वैद्य विजय कुमार मिश्रा"
                  fill
                  className="object-cover object-center"
                />
                <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#091711] shadow-sm animate-pulse" />
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#1C3B2D] border border-[#2D5A44] text-[10px] uppercase tracking-wider text-[#E5C77E] font-semibold">
                  <Sparkles className="w-2.5 h-2.5 text-[#C76738]" />
                  <span>चिकित्सा पर्यवेक्षण</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white truncate">
                  वैद्य विजय कुमार मिश्रा
                </h4>
                <p className="text-[11px] text-[#C5D3CC] font-medium">
                  BAMS, DNYS • 18+ वर्ष अनुभव
                </p>
                <p className="text-[10px] text-[#8DA197] truncate">
                  संतानहीनता एवं गठिया विशेषज्ञ, लखनऊ
                </p>
              </div>
            </div>

            {/* Dynamic Vaidya Clinical Guidance Quote for This Specific Therapy */}
            <div className="mt-3 pt-2.5 border-t border-[#1C3B2D]/80 flex items-start space-x-2 text-[11px] text-[#CCD7D1] leading-relaxed italic bg-[#06120D]/60 p-2.5 rounded-xl">
              <span className="text-[#E5C77E] font-serif text-lg leading-none shrink-0">“</span>
              <span>{therapy.vaidyaQuote}</span>
            </div>
          </div>

          {/* Detailed Clinical Explanation Card */}
          <div className="p-5 rounded-2xl bg-[#091711] border border-[#214736] space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#E5C77E] font-semibold mb-1">
                {therapy.category}
              </div>
              <h4 className="text-xl font-serif font-bold text-white">
                {therapy.nameHi}
              </h4>
              <p className="text-xs text-[#C8A356] font-mono mt-0.5">
                {therapy.nameEn}
              </p>
            </div>

            <p className="text-xs text-[#CAD5CE] leading-relaxed font-light">
              {therapy.clinicalBenefit}
            </p>

            {/* Key Clinical Indications */}
            <div className="space-y-2 pt-1 border-t border-[#1A382A]">
              <div className="text-[11px] uppercase tracking-wider text-[#9EB2A8] font-semibold">
                इन स्वास्थ्य स्थितियों में उपयोगी:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {therapy.keyIndications.map((ind, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-[#122A1E] text-[#E2EAE5] px-2.5 py-1 rounded-lg border border-[#24503B]"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Classical Herbs Formulations */}
            <div className="space-y-1.5 pt-1 border-t border-[#1A382A]">
              <div className="text-[10px] uppercase tracking-wider text-[#7C9086] font-semibold">
                शास्त्रीय औषधियां एवं घटक:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {therapy.herbs.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#0A1A12] text-[10px] text-[#A3B3AB] border border-[#1C3B2D]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Book Therapy Consultation CTA */}
          <div className="pt-1">
            <button
              onClick={() => scrollToSection("consultation-form")}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C76738] to-[#D97746] hover:brightness-110 text-white text-xs font-semibold tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{therapy.nameHi.split(" ")[0]} हेतु परामर्श बुक करें</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
