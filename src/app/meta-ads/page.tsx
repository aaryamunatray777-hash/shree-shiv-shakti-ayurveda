"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Download,
  Copy,
  Check,
  Eye,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Share2,
  Maximize2,
  Calendar,
  MessageCircle,
  Clock,
  UserCheck
} from "lucide-react";

type DimensionKey = "square" | "story" | "portrait" | "landscape";

interface DimensionConfig {
  id: DimensionKey;
  name: string;
  ratio: string;
  width: number;
  height: number;
  platform: string;
  description: string;
}

const DIMENSIONS: DimensionConfig[] = [
  {
    id: "square",
    name: "1:1 Square",
    ratio: "1 / 1",
    width: 1080,
    height: 1080,
    platform: "Instagram & Facebook Feed, Carousel",
    description: "Standard feed format. Best for all-round reach and carousel ads."
  },
  {
    id: "story",
    name: "9:16 Vertical Story / Reel",
    ratio: "9 / 16",
    width: 1080,
    height: 1920,
    platform: "Instagram Stories, Reels, FB Stories",
    description: "Full-screen vertical immersion with highest mobile engagement."
  },
  {
    id: "portrait",
    name: "4:5 Mobile Portrait",
    ratio: "4 / 5",
    width: 1080,
    height: 1350,
    platform: "Instagram Feed & Facebook Mobile Feed",
    description: "Meta recommended for maximum vertical feed screen estate (highest CTR)."
  },
  {
    id: "landscape",
    name: "1.91:1 Landscape",
    ratio: "1.91 / 1",
    width: 1200,
    height: 628,
    platform: "Facebook Desktop, Messenger, Audience Network",
    description: "Standard web and desktop link ad format."
  }
];

interface CampaignAngle {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  headlineHindi: string;
  subtextHindi: string;
  uspBadges: string[];
  ctaText: string;
  imageSrc: string;
  doctorBadge: boolean;
  primaryText: string;
  adHeadline: string;
  adDescription: string;
  targetingNotes: string;
}

const CAMPAIGNS: CampaignAngle[] = [
  {
    id: "nadi",
    tag: "Angle 1 • Nadi Parikshan",
    title: "प्राचीन नाड़ी परीक्षण (Root-Cause Pulse Diagnosis)",
    subtitle: "Focus: Accurate traditional diagnosis without invasive tests",
    headlineHindi: "आपकी नाड़ी... आपके शरीर की कहानी कह सकती है।",
    subtextHindi: "बिना किसी कठोर परीक्षण के, केवल 3 उंगलियों से वात, पित्त व कफ के संतुलन का समग्र विश्लेषण।",
    uspBadges: ["18+ वर्ष अनुभव", "त्रिदोष का सटीक विश्लेषण", "प्रामाणिक आयुर्वेद"],
    ctaText: "नाड़ी परीक्षण हेतु अपॉइंटमेंट लें",
    imageSrc: "/images/human_nadi_hands_macro.jpg",
    doctorBadge: true,
    primaryText: `🌿 क्या बार-बार इलाज बदलने के बाद भी रोग की असली जड़ समझ नहीं आ रही?

आयुर्वेद की प्राचीन नाड़ी परीक्षण (Pulse Examination) पद्धति से जानें अपने शरीर की त्रिदोष (वात-पित्त-कफ) स्थिति। बिना किसी दर्दनाक टेस्ट के, केवल नाड़ी की सूक्ष्म गति समझकर रोग के मूल कारण का निदान।

👨‍⚕️ परामर्शदाता: वैद्य विजय कुमार मिश्रा (BAMS, DNYS | 18+ वर्ष क्लिनिकल अनुभव)
📍 पता: श्री शिव शक्ति आयुर्वेद, रॉयल प्लाजा, मुंशीपुलिया, इंदिरा नगर, लखनऊ
📞 अपॉइंटमेंट हेतु WhatsApp / कॉल करें: +91 80900 70037`,
    adHeadline: "लखनऊ में प्राचीन नाड़ी परीक्षण — रोग की जड़ जानें",
    adDescription: "मुंशीपुलिया, इंदिरा नगर | वैद्य विजय कुमार मिश्रा (18+ वर्ष अनुभव)",
    targetingNotes: "Lucknow +15km • Age 25-60 • Interests: Ayurveda, Holistic Health, Yoga, Traditional Medicine"
  },
  {
    id: "joint-pain",
    tag: "Angle 2 • Arthritis & Joint Pain",
    title: "गठिया, सायटिका एवं जोड़ों का पुराना दर्द",
    subtitle: "Focus: Cartilage regeneration, Janu Basti, zero-side-effect relief",
    headlineHindi: "घुटनों व जोड़ों के पुराने दर्द से पाएं प्राकृतिक मुक्ति।",
    subtextHindi: "पारंपरिक जानु बस्ति एवं पंचकर्म द्वारा कार्टिलेज पुनर्जनन और दर्द से जड़ से राहत।",
    uspBadges: ["गठिया व सायटिका विशेषज्ञ", "पारंपरिक जानु बस्ति", "स्थायी परिणाम"],
    ctaText: "दर्द मुक्त जीवन हेतु परामर्श लें",
    imageSrc: "/images/panchakarma_therapies.jpg",
    doctorBadge: true,
    primaryText: `🦴 क्या घुटनों के दर्द, सायटिका या गठिया (Arthritis) ने आपका चलना-फिरना मुश्किल कर दिया है?

पेनकिलर्स केवल दर्द को दबाते हैं, ठीक नहीं करते। श्री शिव शक्ति आयुर्वेद में हम शास्त्रीय 'जानु बस्ति' और औषधीय पंचकर्म थेरेपी से जोड़ों के लुब्रिकेशन (श्लेषक कफ) और कार्टिलेज का पोषण करते हैं।

✨ 18+ वर्षों का सफल अनुभव | हजारों संतुष्ट मरीज
📍 श्री शिव शक्ति आयुर्वेद, रॉयल प्लाजा, मुंशीपुलिया, इंदिरा नगर, लखनऊ
📲 अभी WhatsApp पर अपॉइंटमेंट बुक करें: +91 80900 70037`,
    adHeadline: "घुटनों व जोड़ों के दर्द का आयुर्वेदिक समाधान | लखनऊ",
    adDescription: "जानु बस्ति व पंचकर्म द्वारा स्थायी राहत | विशेषज्ञ परामर्श",
    targetingNotes: "Lucknow +15km • Age 38-65+ • Interests: Joint Pain, Arthritis, Knee replacement alternatives, Ayurveda"
  },
  {
    id: "shirodhara",
    tag: "Angle 3 • Shirodhara & Stress",
    title: "अनिद्रा, माइग्रेन व मानसिक तनाव — दिव्य शिरोधारा",
    subtitle: "Focus: Mental peace, chronic insomnia, migraine, hypertension",
    headlineHindi: "अनिद्रा, माइग्रेन और मानसिक तनाव से तुरंत शांति।",
    subtextHindi: "औषधीय ब्राह्मी व क्षीरबला तैल धारा द्वारा आज्ञा चक्र का पोषण और गहरी प्राकृतिक नींद।",
    uspBadges: ["तनाव व माइग्रेन मुक्ति", "गहरी प्राकृतिक नींद", "शुद्ध औषधीय तैल"],
    ctaText: "शिरोधारा सत्र बुक करें",
    imageSrc: "/images/panchakarma_shirodhara.jpg",
    doctorBadge: false,
    primaryText: `🌙 नींद न आना, पुराना माइग्रेन या दिनभर की चिंता से सिर भारी रहता है?

शास्त्रीय 'शिरोधारा' एक ऐसा दिव्य आयुर्वेदिक उपचार है, जिसमें औषधीय ब्राह्मी व क्षीरबला तैल की निरंतर सुखोष्ण धारा आज्ञा चक्र पर डाली जाती है। यह मस्तिष्क की नसों को शांत कर अल्फ़ा तरंगों को सक्रिय करता है।

💆‍♂️ अनुभव करें लखनऊ के सबसे शांत आयुर्वेदिक पंचकर्म केंद्र में।
📍 रॉयल प्लाजा (पल्स हार्ट सेंटर के पीछे), मुंशीपुलिया, इंदिरा नगर, लखनऊ
📞 सत्र बुक करने हेतु संपर्क करें: +91 80900 70037`,
    adHeadline: "माइग्रेन व अनिद्रा से राहत | दिव्य शिरोधारा लखनऊ",
    adDescription: "ब्राह्मी तैल धारा द्वारा तुरंत मानसिक शांति | सत्र बुक करें",
    targetingNotes: "Lucknow +15km • Age 24-52 • Interests: Meditation, Mental Health, Stress management, Insomnia, Wellness"
  },
  {
    id: "infertility",
    tag: "Angle 4 • Infertility & PCOD",
    title: "संतानहीनता एवं PCOD / स्त्री रोग",
    subtitle: "Focus: Holistic fertility care, uterine health, hormonal balance",
    headlineHindi: "संतान सुख व PCOD का सुरक्षित आयुर्वेदिक समाधान।",
    subtextHindi: "हार्मोनल असंतुलन व गर्भाशय पोषण के लिए उत्तर भारत के प्रतिष्ठित विशेषज्ञ से परामर्श।",
    uspBadges: ["संतानहीनता विशेषज्ञ", "PCOD / PCOS समाधान", "100% गोपनीय परामर्श"],
    ctaText: "गोपनीय परामर्श बुक करें",
    imageSrc: "/images/vaidya_vijay_mishra.jpg",
    doctorBadge: true,
    primaryText: `🌸 संतानहीनता (Infertility) या PCOD/PCOS से निराश न हों।

आयुर्वेद बीज (शुक्राणु व डिंब), क्षेत्र (गर्भाशय), ऋतु और अम्बु (पोषण) को शुद्ध कर प्राकृतिक गर्भधारण की क्षमता बढ़ाता है। 

👨‍⚕️ वैद्य विजय कुमार मिश्रा (BAMS, DNYS) — 18+ वर्षों से संतानहीनता एवं स्त्री-रोगों के आयुर्वेदिक उपचार में समर्पित।
🔒 100% सुरक्षित एवं गोपनीय परामर्श।
📍 श्री शिव शक्ति आयुर्वेद, मुंशीपुलिया, इंदिरा नगर, लखनऊ
📲 आज ही अपना समय आरक्षित करें: +91 80900 70037`,
    adHeadline: "संतानहीनता एवं PCOD का आयुर्वेदिक समाधान | लखनऊ",
    adDescription: "वैद्य विजय कुमार मिश्रा | 18+ वर्ष अनुभव | गोपनीय परामर्श",
    targetingNotes: "Lucknow +20km • Age 22-45 • Interests: Fertility, Women's health, PCOS, Natural parenting, Ayurveda"
  }
];

export default function MetaAdsStudio() {
  const [selectedDimension, setSelectedDimension] = useState<DimensionKey>("square");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("nadi");
  const [showSafeZones, setShowSafeZones] = useState<boolean>(true);
  const [previewScale, setPreviewScale] = useState<number>(0.5);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const previewBannerRef = useRef<HTMLDivElement>(null);

  const currentDim = DIMENSIONS.find((d) => d.id === selectedDimension)!;
  const currentCamp = CAMPAIGNS.find((c) => c.id === selectedCampaign)!;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // High-Resolution Native HTML5 Canvas Export Engine
  const exportHighResPNG = async () => {
    setIsExporting(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = currentDim.width;
      canvas.height = currentDim.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // Fill Dark Forest Luxury Background
      ctx.fillStyle = "#060E0A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load and Draw Background Image
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = currentCamp.imageSrc;

      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image load fails
      });

      if (img.complete && img.naturalWidth > 0) {
        // Draw background image scaled with cover fit
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.save();
        ctx.filter = "brightness(0.55) contrast(1.15)";
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
        ctx.restore();
      }

      // Add Gradients for Text Legibility & Brand Mood
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(6, 14, 10, 0.75)");
      gradient.addColorStop(0.35, "rgba(6, 14, 10, 0.4)");
      gradient.addColorStop(0.65, "rgba(6, 14, 10, 0.85)");
      gradient.addColorStop(1, "rgba(6, 14, 10, 0.98)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add Decorative Gold Border
      ctx.strokeStyle = "rgba(200, 163, 86, 0.35)";
      ctx.lineWidth = 4;
      ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

      // Calculate safe margins and responsive typography based on dimension
      const padX = canvas.width * 0.08;
      const isVertical = currentDim.id === "story";
      const isLandscape = currentDim.id === "landscape";

      // 1. Top Header Pill: Shree Shiv Shakti Ayurveda • Lucknow
      ctx.fillStyle = "#E5C77E";
      ctx.font = `600 ${Math.round(canvas.width * 0.024)}px -apple-system, sans-serif`;
      ctx.fillText("SHREE SHIV SHAKTI AYURVEDA • MUNSHI PULIA, LUCKNOW", padX, isVertical ? 220 : 110);

      // Subtitle Sanskrit
      ctx.fillStyle = "#CCD9D2";
      ctx.font = `400 ${Math.round(canvas.width * 0.02)}px -apple-system, sans-serif`;
      ctx.fillText("आयुर्वेद की प्राचीन पद्धति — त्रिदोष नाड़ी परीक्षण एवं पंचकर्म", padX, isVertical ? 260 : 145);

      // 2. Headline in Hindi
      ctx.fillStyle = "#F7F4ED";
      const headlineSize = isLandscape ? Math.round(canvas.width * 0.038) : Math.round(canvas.width * 0.052);
      ctx.font = `bold ${headlineSize}px 'Noto Serif Devanagari', Georgia, serif`;

      // Word wrapping for headline
      const headlineWords = currentCamp.headlineHindi.split(" ");
      let line = "";
      let currentY = isVertical ? 580 : isLandscape ? 240 : 380;
      const maxWidth = canvas.width - padX * 2 - (isLandscape ? 380 : 0);

      for (let n = 0; n < headlineWords.length; n++) {
        const testLine = line + headlineWords[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, padX, currentY);
          line = headlineWords[n] + " ";
          currentY += headlineSize * 1.35;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, padX, currentY);

      // 3. Subtext in Hindi
      currentY += headlineSize * 0.6;
      ctx.fillStyle = "#B5C5BD";
      const subtextSize = Math.round(canvas.width * 0.026);
      ctx.font = `400 ${subtextSize}px -apple-system, sans-serif`;

      const subWords = currentCamp.subtextHindi.split(" ");
      let subLine = "";
      for (let n = 0; n < subWords.length; n++) {
        const testSub = subLine + subWords[n] + " ";
        const metrics = ctx.measureText(testSub);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(subLine, padX, currentY);
          subLine = subWords[n] + " ";
          currentY += subtextSize * 1.45;
        } else {
          subLine = testSub;
        }
      }
      ctx.fillText(subLine, padX, currentY);

      // 4. Badges row
      currentY += 40;
      let badgeX = padX;
      currentCamp.uspBadges.forEach((badge) => {
        ctx.font = `600 ${Math.round(canvas.width * 0.022)}px -apple-system, sans-serif`;
        const textWidth = ctx.measureText(badge).width;
        const badgeW = textWidth + 36;
        const badgeH = 46;

        ctx.fillStyle = "rgba(15, 40, 30, 0.85)";
        ctx.strokeStyle = "rgba(45, 90, 68, 0.8)";
        ctx.lineWidth = 1.5;

        // Draw rounded pill
        ctx.beginPath();
        ctx.roundRect(badgeX, currentY, badgeW, badgeH, 23);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#E5C77E";
        ctx.fillText(badge, badgeX + 18, currentY + 30);

        badgeX += badgeW + 16;
      });

      // 5. Doctor Spotlight Block
      const docBlockY = isVertical ? canvas.height - 480 : isLandscape ? canvas.height - 240 : canvas.height - 340;

      ctx.fillStyle = "rgba(9, 23, 17, 0.92)";
      ctx.strokeStyle = "rgba(200, 163, 86, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(padX, docBlockY, canvas.width - padX * 2, isVertical ? 160 : 130, 18);
      ctx.fill();
      ctx.stroke();

      // Doctor text inside card
      ctx.fillStyle = "#F7F4ED";
      ctx.font = `bold ${Math.round(canvas.width * 0.026)}px -apple-system, sans-serif`;
      ctx.fillText("वैद्य विजय कुमार मिश्रा (BAMS, DNYS)", padX + 30, docBlockY + 45);

      ctx.fillStyle = "#C8A356";
      ctx.font = `500 ${Math.round(canvas.width * 0.022)}px -apple-system, sans-serif`;
      ctx.fillText("18+ वर्ष अनुभव • संतानहीनता एवं संधिवात/गठिया विशेषज्ञ", padX + 30, docBlockY + 80);

      ctx.fillStyle = "#A3B3AB";
      ctx.font = `400 ${Math.round(canvas.width * 0.019)}px -apple-system, sans-serif`;
      ctx.fillText("रॉयल प्लाजा, मुंशीपुलिया, इंदिरा नगर, लखनऊ", padX + 30, docBlockY + 110);

      // 6. Bottom Action Bar (CTA Button + Call Info)
      const bottomY = isVertical ? canvas.height - 260 : isLandscape ? canvas.height - 90 : canvas.height - 160;

      // CTA Button
      const btnW = Math.min(canvas.width - padX * 2, 480);
      const btnH = 68;
      const btnX = padX;

      const btnGrad = ctx.createLinearGradient(btnX, bottomY, btnX + btnW, bottomY);
      btnGrad.addColorStop(0, "#C76738");
      btnGrad.addColorStop(1, "#DB7444");

      ctx.fillStyle = btnGrad;
      ctx.beginPath();
      ctx.roundRect(btnX, bottomY, btnW, btnH, 34);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = `bold ${Math.round(canvas.width * 0.024)}px -apple-system, sans-serif`;
      ctx.fillText(`${currentCamp.ctaText} →`, btnX + 36, bottomY + 44);

      // Direct Phone Call Pill on Right
      if (!isLandscape && canvas.width - padX * 2 > 750) {
        ctx.fillStyle = "#E5C77E";
        ctx.font = `600 ${Math.round(canvas.width * 0.022)}px -apple-system, sans-serif`;
        ctx.fillText("📞 80900 70037", padX + btnW + 28, bottomY + 44);
      }

      // Convert Canvas to Blob and Trigger Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `meta_ad_${selectedCampaign}_${currentDim.width}x${currentDim.height}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
      }, "image/png");
    } catch (e) {
      console.error(e);
      alert("Export failed. Please try again.");
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060E0A] text-[#F7F4ED] selection:bg-[#C76738] selection:text-white pb-24">
      {/* Top Studio Navbar */}
      <header className="sticky top-0 z-50 bg-[#091711]/95 backdrop-blur-md border-b border-[#2D5A44]/40 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="h-10 w-10 rounded-xl bg-[#0F281E] border border-[#C8A356]/40 p-1 flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Image src="/images/logo.png" alt="Shiv Shakti Logo" width={40} height={40} className="object-contain" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E5C77E]">Meta Ad Studio</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#C76738] text-white">4 FORMATS</span>
            </div>
            <h1 className="text-lg font-serif-luxury font-bold text-white tracking-wide">
              Shree Shiv Shakti Ayurveda • Campaign Suite
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-full border border-[#2D5A44] text-xs sm:text-sm text-[#CCD9D2] hover:bg-[#0F281E] hover:text-white transition-colors"
          >
            ← Back to Landing Page
          </Link>

          <button
            onClick={exportHighResPNG}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C76738] to-[#DB7444] text-white font-medium text-xs sm:text-sm flex items-center space-x-2 shadow-lg hover:shadow-orange-950/60 transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "Exporting High-Res..." : `Export ${currentDim.width}×${currentDim.height} PNG`}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Dimension Selector & Campaign Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Dimension Tabs */}
          <div className="bg-[#091711] border border-[#2D5A44]/60 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D5A44]/40 mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E5C77E] flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#C76738]" /> 1. Select Meta Dimension
              </span>
              <span className="text-[11px] text-[#A3B3AB]">{currentDim.platform}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {DIMENSIONS.map((dim) => {
                const isSelected = dim.id === selectedDimension;
                return (
                  <button
                    key={dim.id}
                    onClick={() => setSelectedDimension(dim.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0F281E] border-[#C8A356] shadow-md shadow-amber-950/30 scale-[1.02]"
                        : "bg-[#060E0A]/60 border-[#2D5A44]/40 hover:border-[#2D5A44] text-[#A3B3AB]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? "text-[#F7F4ED]" : "text-[#CCD9D2]"}`}>
                        {dim.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#060E0A] text-[#C8A356] font-mono">
                        {dim.width}×{dim.height}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8F9E96] mt-1 leading-snug line-clamp-1">{dim.platform}</p>
                  </button>
                );
              })}
            </div>

            {/* Quick Dimension Explainer */}
            <div className="mt-3 p-2.5 rounded-lg bg-[#060E0A]/80 border border-[#2D5A44]/30 text-[11px] text-[#A3B3AB]">
              <strong className="text-[#E5C77E]">{currentDim.name} Recommendation:</strong> {currentDim.description}
            </div>
          </div>

          {/* 2. Campaign Angle Switcher */}
          <div className="bg-[#091711] border border-[#2D5A44]/60 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D5A44]/40 mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E5C77E] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#C76738]" /> 2. Select Ad Campaign Hook
              </span>
              <span className="text-[11px] text-[#A3B3AB]">4 High-CTR Angles</span>
            </div>

            <div className="space-y-2.5">
              {CAMPAIGNS.map((camp) => {
                const isSelected = camp.id === selectedCampaign;
                return (
                  <button
                    key={camp.id}
                    onClick={() => setSelectedCampaign(camp.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0F281E] border-[#C8A356] shadow-md scale-[1.01]"
                        : "bg-[#060E0A]/60 border-[#2D5A44]/40 hover:border-[#2D5A44] text-[#A3B3AB]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C76738]">
                        {camp.tag}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#C8A356]" />}
                    </div>
                    <h3 className={`text-sm font-semibold mt-0.5 ${isSelected ? "text-white" : "text-[#CCD9D2]"}`}>
                      {camp.title}
                    </h3>
                    <p className="text-[11px] text-[#8F9E96] mt-1">{camp.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Safe Zones & Display Settings */}
          <div className="bg-[#091711] border border-[#2D5A44]/60 rounded-2xl p-5 shadow-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#CCD9D2] block">Meta UI Safe Zone Guide</span>
              <span className="text-[11px] text-[#8F9E96]">
                Overlay Stories/Reels UI borders to keep text in central 80%
              </span>
            </div>
            <button
              onClick={() => setShowSafeZones(!showSafeZones)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                showSafeZones
                  ? "bg-[#C76738] border-[#DB7444] text-white"
                  : "bg-[#060E0A] border-[#2D5A44] text-[#A3B3AB]"
              }`}
            >
              {showSafeZones ? "Guides Active" : "Show Guides"}
            </button>
          </div>

          {/* 4. Meta Ads Manager Copywriting & Targeting Pack */}
          <div className="bg-[#091711] border border-[#2D5A44]/60 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2D5A44]/40">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E5C77E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C76738]" /> 3. Meta Ads Copy & Settings
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Meta Policy Compliant</span>
            </div>

            {/* Primary Text Copy Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-[#CCD9D2]">Primary Text (Ad Caption)</label>
                <button
                  onClick={() => copyToClipboard(currentCamp.primaryText, "primary")}
                  className="text-[11px] text-[#E5C77E] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "primary" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Text
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 rounded-lg bg-[#060E0A] border border-[#2D5A44]/40 text-xs text-[#CCD9D2] font-sans whitespace-pre-line leading-relaxed max-h-44 overflow-y-auto">
                {currentCamp.primaryText}
              </div>
            </div>

            {/* Headline Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-[#CCD9D2]">Headline (Displayed Next to CTA)</label>
                <button
                  onClick={() => copyToClipboard(currentCamp.adHeadline, "headline")}
                  className="text-[11px] text-[#E5C77E] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "headline" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060E0A] border border-[#2D5A44]/40 text-xs text-[#F7F4ED] font-medium">
                {currentCamp.adHeadline}
              </div>
            </div>

            {/* Description Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-[#CCD9D2]">Description (Newsfeed Link)</label>
                <button
                  onClick={() => copyToClipboard(currentCamp.adDescription, "desc")}
                  className="text-[11px] text-[#E5C77E] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "desc" ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-[#060E0A] border border-[#2D5A44]/40 text-xs text-[#A3B3AB]">
                {currentCamp.adDescription}
              </div>
            </div>

            {/* Lucknow Audience Targeting Box */}
            <div className="p-3 rounded-lg bg-[#0F281E]/60 border border-[#2D5A44] space-y-1 text-xs">
              <span className="text-[11px] font-bold text-[#E5C77E] uppercase tracking-wider block">
                🎯 Meta Lucknow Targeting Parameters:
              </span>
              <p className="text-[#CCD9D2] font-mono text-[11px]">{currentCamp.targetingNotes}</p>
              <div className="pt-2 text-[10px] text-[#A3B3AB] flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#C76738]" /> Munshi Pulia / Indira Nagar Pin: 226016
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Banner Preview & Canvas Render */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Top Preview Controls Bar */}
          <div className="w-full bg-[#091711] border border-[#2D5A44]/60 rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-white">Live Pixel Preview ({currentDim.name})</span>
              <span className="text-[11px] text-[#C8A356] font-mono">
                {currentDim.width} × {currentDim.height} px
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-[#A3B3AB]">Zoom:</span>
              {[0.35, 0.5, 0.65].map((scale) => (
                <button
                  key={scale}
                  onClick={() => setPreviewScale(scale)}
                  className={`px-2 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                    previewScale === scale
                      ? "bg-[#C76738] text-white font-bold"
                      : "bg-[#060E0A] text-[#A3B3AB] hover:text-white"
                  }`}
                >
                  {Math.round(scale * 100)}%
                </button>
              ))}

              <button
                onClick={exportHighResPNG}
                disabled={isExporting}
                className="ml-2 px-3 py-1.5 rounded-lg bg-[#C76738] text-white text-xs font-medium flex items-center space-x-1.5 hover:bg-[#DB7444] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PNG</span>
              </button>
            </div>
          </div>

          {/* The Live Creative Banner Frame */}
          <div className="w-full flex items-center justify-center p-4 bg-[#030705] border border-[#2D5A44]/40 rounded-2xl overflow-hidden min-h-[640px]">
            <div
              style={{
                width: `${currentDim.width * previewScale}px`,
                height: `${currentDim.height * previewScale}px`,
                aspectRatio: currentDim.ratio
              }}
              className="relative shadow-2xl rounded-xl overflow-hidden border-2 border-[#C8A356]/40 transition-all duration-300 select-none"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={currentCamp.imageSrc}
                  alt={currentCamp.title}
                  fill
                  sizes="100vw"
                  className="object-cover brightness-60 contrast-110"
                  priority
                />
                {/* Atmospheric Dark Forest Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060E0A] via-[#060E0A]/70 to-[#060E0A]/60" />
                <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#060E0A]/40 to-[#060E0A]/85" />
              </div>

              {/* Safe Zone Overlays (Meta Story / Feed Guidelines) */}
              {showSafeZones && (
                <div className="absolute inset-0 z-30 pointer-events-none border-2 border-dashed border-amber-400/40 m-[8%] rounded-lg flex flex-col justify-between p-2">
                  <div className="text-[10px] font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded self-start">
                    ✓ Meta 80% Safe Zone (Critical copy inside)
                  </div>
                  {currentDim.id === "story" && (
                    <div className="text-[9px] font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded self-center">
                      Top & Bottom 250px avoided for Instagram / Reel UI Icons
                    </div>
                  )}
                </div>
              )}

              {/* Banner Foreground Elements */}
              <div className="relative z-10 w-full h-full p-[8%] flex flex-col justify-between">
                
                {/* 1. Header: Clinic Brand & Location */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-8 w-8 rounded-lg bg-[#091711]/90 border border-[#C8A356]/60 p-1 flex items-center justify-center shadow-md">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#E5C77E]">
                        SHREE SHIV SHAKTI AYURVEDA
                      </h2>
                      <div className="flex items-center space-x-1 text-[9px] text-[#A3B3AB]">
                        <MapPin className="w-2.5 h-2.5 text-[#C76738]" />
                        <span>Munshi Pulia, Indira Nagar, Lucknow</span>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#0F281E]/90 border border-[#2D5A44] text-[9px] text-[#CCD9D2]">
                    <HeartPulse className="w-2.5 h-2.5 text-[#C76738] animate-pulse" />
                    <span>आयुर्वेद की प्राचीन पद्धति — नाड़ी परीक्षण एवं पंचकर्म</span>
                  </div>
                </div>

                {/* 2. Core Headline & Value Proposition */}
                <div className="space-y-3 my-auto py-2">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold font-serif-luxury text-[#F7F4ED] leading-snug drop-shadow-md">
                    “{currentCamp.headlineHindi}”
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#CCD9D2] leading-relaxed max-w-md line-clamp-3">
                    {currentCamp.subtextHindi}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentCamp.uspBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#0F281E]/90 border border-[#2D5A44] text-[9px] font-medium text-[#E5C77E]"
                      >
                        ✓ {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Doctor Credibility Pill + CTA Action */}
                <div className="space-y-2.5 pt-2 border-t border-[#2D5A44]/50">
                  {currentCamp.doctorBadge && (
                    <div className="flex items-center space-x-2.5 bg-[#091711]/90 border border-[#C8A356]/40 p-2 rounded-xl backdrop-blur-sm">
                      <div className="relative h-9 w-9 rounded-full overflow-hidden border border-[#C8A356] shrink-0">
                        <Image src="/images/face2.png" alt="Vaidya Mishra" fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-white truncate">
                          वैद्य विजय कुमार मिश्रा (BAMS, DNYS)
                        </div>
                        <div className="text-[9px] text-[#C8A356] truncate">
                          18+ वर्ष अनुभव • संतानहीनता एवं संधिवात विशेषज्ञ
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dual Action: Primary CTA Button + Direct Dial */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C76738] to-[#DB7444] text-white text-[11px] sm:text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md">
                      <span>{currentCamp.ctaText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>

                    <div className="px-3 py-2 rounded-full bg-[#0F281E] border border-[#2D5A44] text-[10px] font-bold text-[#E5C77E] flex items-center space-x-1">
                      <Phone className="w-2.5 h-2.5 text-[#C76738]" />
                      <span>80900 70037</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Quick Explainer Bar */}
          <div className="w-full mt-4 p-4 rounded-xl bg-[#091711] border border-[#2D5A44]/40 flex flex-wrap items-center justify-between text-xs text-[#A3B3AB] gap-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A356]" />
              <span>
                100% Meta Ad Policy Compliant • Tested Safe Zones • Lucknow Geo-Targeting Ready
              </span>
            </div>
            <button
              onClick={exportHighResPNG}
              disabled={isExporting}
              className="text-[#E5C77E] hover:text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Full PNG
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
