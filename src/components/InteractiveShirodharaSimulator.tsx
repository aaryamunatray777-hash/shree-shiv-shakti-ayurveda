"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Droplets,
  RotateCcw,
  Volume2,
  VolumeX,
  Activity,
  ChevronRight,
  SlidersHorizontal,
  BrainCircuit
} from "lucide-react";
import { scrollToSection } from "@/lib/utils";

type OilType = "brahmi" | "ksheerabala" | "takra" | "chandanadi";
type FlowMode = "oscillating" | "steady";

interface OilData {
  id: OilType;
  nameHi: string;
  nameEn: string;
  subtitle: string;
  color: string;
  glowColor: string;
  streamHex: string;
  temperature: string;
  temperatureNum: number;
  brainwave: string;
  brainwaveFreq: string;
  vataEffect: string;
  pittaEffect: string;
  kaphaEffect: string;
  herbs: string[];
  description: string;
  clinicalNote: string;
}

const OILS: OilData[] = [
  {
    id: "brahmi",
    nameHi: "ब्राह्मी तैल (Brahmi Taila)",
    nameEn: "Brahmi Medicated Oil",
    subtitle: "गहरी नींद, चिंता व अनिद्रा मुक्ति",
    color: "#E5C77E",
    glowColor: "rgba(229, 199, 126, 0.4)",
    streamHex: "#F0D185",
    temperature: "38.5° C (सुखोष्ण)",
    temperatureNum: 38.5,
    brainwave: "अल्फा तरंग (Alpha Wave)",
    brainwaveFreq: "8 - 10 Hz",
    vataEffect: "कम (वात शामक -85%)",
    pittaEffect: "संतुलित (-70%)",
    kaphaEffect: "अपरिवर्तित",
    herbs: ["ब्राह्मी", "शंखपुष्पी", "जटामांसी", "तिल तैल"],
    description:
      "मस्तिष्क के न्यूरॉन्स को पोषण देकर अत्यधिक मानसिक व्यग्रता और अनिद्रा को दूर करता है।",
    clinicalNote:
      "वैद्य जी का अवलोकन: अत्यधिक तनाव और अनिद्रा से ग्रस्त रोगियों में ब्राह्मी तैल धारा मन को 15 मिनट के भीतर शांत अवस्था में ले आती है।"
  },
  {
    id: "ksheerabala",
    nameHi: "क्षीरबला तैल (Ksheerabala)",
    nameEn: "Ksheerabala Medicated Oil",
    subtitle: "माइग्रेन, नसों का दर्द व सिर भारीपन",
    color: "#D9822B",
    glowColor: "rgba(217, 130, 43, 0.45)",
    streamHex: "#ECA34E",
    temperature: "39.0° C (मृदु उष्ण)",
    temperatureNum: 39.0,
    brainwave: "थीटा तरंग (Theta Wave)",
    brainwaveFreq: "5 - 7 Hz",
    vataEffect: "अत्यधिक शांत (-90%)",
    pittaEffect: "संतुलित (-60%)",
    kaphaEffect: "संतुलित",
    herbs: ["बला मूल", "गौ दुग्ध", "तिल तैल", "अश्वगंधा"],
    description:
      "स्नायु तंत्र (Nervous System) की कमजोरी, माइग्रेन, सर्वाइकल तनाव और चेहरे की नसों में खिंचाव के लिए श्रेष्ठ।",
    clinicalNote:
      "वैद्य जी का अवलोकन: क्रोनिक सिरदर्द और स्नायु दुर्बलता में क्षीरबला की गुनगुनी धारा नसों को पोषण देकर तुरंत राहत देती है।"
  },
  {
    id: "takra",
    nameHi: "तक्र धारा (Takra Dhara)",
    nameEn: "Medicated Buttermilk Stream",
    subtitle: "पित्त शमन, त्वचा शीतलता व दाह निवारण",
    color: "#A7D7C5",
    glowColor: "rgba(167, 215, 197, 0.4)",
    streamHex: "#D4EBE3",
    temperature: "24.0° C (शीतल प्रवाह)",
    temperatureNum: 24.0,
    brainwave: "अल्फा तरंग (Alpha Wave)",
    brainwaveFreq: "10 - 12 Hz",
    vataEffect: "संतुलित (-65%)",
    pittaEffect: "अत्यधिक शांत (पित्त शामक -95%)",
    kaphaEffect: "अपरिवर्तित",
    herbs: ["आमलकी", "मुस्ता", "सिद्ध तक्र", "चंदन"],
    description:
      "आमलकी और मुस्ता क्वाथ से सिद्ध छाछ की ठंडी धारा। सिर में जलन, तनाव, सोरायसिस और उच्च पित्त में चमत्कारी।",
    clinicalNote:
      "वैद्य जी का अवलोकन: अत्यधिक क्रोध, चिड़चिड़ापन, उच्च रक्तचाप और सिर की जलन में तक्र धारा अद्वितीय शीतलता प्रदान करती है।"
  },
  {
    id: "chandanadi",
    nameHi: "चन्दनादि तैल (Chandanadi)",
    nameEn: "Sandalwood Medicated Oil",
    subtitle: "उच्च रक्तचाप नियंत्रण व मानसिक शांति",
    color: "#C76738",
    glowColor: "rgba(199, 103, 56, 0.4)",
    streamHex: "#E28657",
    temperature: "37.5° C (समशीतोष्ण)",
    temperatureNum: 37.5,
    brainwave: "अल्फा-डेल्टा तरंग",
    brainwaveFreq: "7 - 9 Hz",
    vataEffect: "संतुलित (-75%)",
    pittaEffect: "शांत (-85%)",
    kaphaEffect: "संतुलित",
    herbs: ["रक्त चंदन", "श्वेत चंदन", "उशीर", "कमल केशर"],
    description:
      "शुद्ध चंदन और उशीर से निर्मित। मन को एकाग्र कर रक्तचाप को सामान्य बनाए रखने में सहायक।",
    clinicalNote:
      "वैद्य जी का अवलोकन: रक्तचाप के उतार-चढ़ाव और अनिद्रा में चन्दनादि तैल की शीतल-सौम्य धारा मन को गहन ध्यान की स्थिति में ले जाती है।"
  }
];

export default function InteractiveShirodharaSimulator() {
  const [selectedOil, setSelectedOil] = useState<OilType>("brahmi");
  const [flowMode, setFlowMode] = useState<FlowMode>("oscillating");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [flowSpeed, setFlowSpeed] = useState<"gentle" | "medium">("medium");
  const [sessionSeconds, setSessionSeconds] = useState<number>(142);
  const [streamX, setStreamX] = useState<number>(50); // percentage 42% - 58%

  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundNodesRef = useRef<{ osc1?: OscillatorNode; osc2?: OscillatorNode; gain?: GainNode } | null>(null);

  const currentOil = OILS.find((o) => o.id === selectedOil) || OILS[0];

  // Continuous subtle oil stream swinging oscillation animation (Left-Right across third eye)
  useEffect(() => {
    let animId: number;
    const start = performance.now();

    const animate = (now: number) => {
      if (isPlaying) {
        const elapsed = (now - start) / 1000;
        if (flowMode === "oscillating") {
          // Pendulum swing between 44% and 56%
          const speed = flowSpeed === "gentle" ? 1.2 : 1.8;
          const pos = 50 + Math.sin(elapsed * speed) * 5.5;
          setStreamX(pos);
        } else {
          // Center focus at 50%
          setStreamX(50);
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [flowMode, isPlaying, flowSpeed]);

  // Session timer increment
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Web Audio API ambient meditative soundscape (continuous warm trickling + harmonic tone)
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);

    if (next) {
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
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Meditative drone frequency (108 Hz warm harmonic tone)
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(108, ctx.currentTime);

        // Sub-harmonic warm resonance
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(216, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.5);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        soundNodesRef.current = { osc1, osc2, gain: gainNode };
      } catch {
        // Fallback for audio permissions
      }
    } else {
      if (soundNodesRef.current?.gain && audioCtxRef.current) {
        try {
          soundNodesRef.current.gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
          setTimeout(() => {
            soundNodesRef.current?.osc1?.stop();
            soundNodesRef.current?.osc2?.stop();
            soundNodesRef.current = null;
          }, 350);
        } catch {
          // Cleaned up
        }
      }
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (soundNodesRef.current) {
        try {
          soundNodesRef.current.osc1?.stop();
          soundNodesRef.current.osc2?.stop();
        } catch {
          // Silent cleanup
        }
      }
    };
  }, []);

  const formatMinutes = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full bg-[#07130E] rounded-3xl border border-[#214736] p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white">
      {/* Background Ambience Glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: currentOil.glowColor }}
      />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C76738]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A382A] pb-6 mb-8 relative z-10">
        <div className="flex items-center space-x-4">
          {/* Vaidya Vijay Kumar Mishra Photo Circle Badge */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E5C77E] shrink-0 shadow-xl ring-2 ring-[#C76738]/30">
            <Image
              src="/images/face2.png"
              alt="वैद्य विजय कुमार मिश्रा - पंचकर्म एवं शिरोधारा"
              fill
              className="object-cover object-center"
            />
            <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#091711] shadow-sm animate-pulse" />
          </div>

          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#E5C77E] font-semibold mb-1">
              <Droplets className="w-4 h-4 text-[#C76738] animate-bounce" />
              <span>सजीव शिरोधारा सिमुलेटर • Shirodhara Flow Experience</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              ललाट पर निरंतर तैल धारा का सजीव मोशन सिमुलेशन
            </h3>
            <p className="text-xs text-[#95A79E] font-light mt-0.5">
              औषधीय तैल चुनें, धारा की गति व दोलन नियंत्रित करें और मस्तिष्क तरंगों में आने वाले शांत बदलाव को प्रत्यक्ष देखें।
            </p>
          </div>
        </div>

        {/* Top Controls: Sound & Flow State */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-[#2D5A44] bg-[#0E2319] hover:bg-[#143224] text-xs text-[#CCD7D1] transition-all cursor-pointer"
            title={isPlaying ? "सिमुलेशन रोकें" : "सिमुलेशन चालू करें"}
          >
            <RotateCcw className={`w-3.5 h-3.5 text-[#E5C77E] ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
            <span>{isPlaying ? "सक्रिय (Live)" : "रुका हुआ (Paused)"}</span>
          </button>

          <button
            onClick={toggleSound}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer ${
              soundEnabled
                ? "bg-[#C76738] border-[#E88656] text-white shadow-lg shadow-orange-950/40"
                : "bg-[#0F281E] border-[#274F3B] text-[#CCD7D1] hover:text-white"
            }`}
            title="शिरोधारा ध्यान ध्वनि चालू / बंद करें"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-white" />
                <span>ध्वनि: चालू (108 Hz)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#95A79E]" />
                <span>ध्यान ध्वनि सुनें</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left: Shirodhara Motion Graphics Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#2D5A44]/80 bg-[#040A07] shadow-2xl select-none group">
            
            {/* Cinematic Real Panchakarma Shirodhara Photography Backdrop */}
            <Image
              src="/images/panchakarma_shirodhara.jpg"
              alt="Ayurvedic Shirodhara Oil Flowing on Forehead"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-center brightness-90 contrast-105"
            />

            {/* Deep Vignette & Lighting Contrast Filter */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040A07]/90 via-[#040A07]/40 to-[#040A07]/80 pointer-events-none" />

            {/* Live Vaidya Vijay Kumar Mishra Floating Picture-in-Picture Badge */}
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
                    पंचकर्म पर्यवेक्षण
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
                  वैद्य विजय कुमार मिश्रा
                </div>
                <div className="text-[10px] text-[#95A79E] font-light">
                  18+ वर्ष अनुभव • लखनऊ
                </div>
              </div>
            </div>

            {/* Realtime Live Shirodhara Telemetry Badge (Top Right) */}
            <div className="absolute top-3 right-3 z-30 flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#060E0A]/85 backdrop-blur-md border border-[#214736] text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentOil.color }} />
              <span className="text-[#E2EAE5]">तापमान: <strong>{currentOil.temperature}</strong></span>
            </div>

            {/* SVG Motion Graphic Stream & Oscillating Dhara Patra */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 1000 625"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Dynamic Oil Glow Filter */}
                <filter id="oil-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Vertical Oil Gradient */}
                <linearGradient id="oil-stream-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.95" />
                  <stop offset="50%" stopColor={currentOil.streamHex} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={currentOil.color} stopOpacity="1" />
                </linearGradient>

                {/* Forehead Ripple Gradient */}
                <radialGradient id="ripple-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={currentOil.color} stopOpacity="0.8" />
                  <stop offset="60%" stopColor={currentOil.streamHex} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={currentOil.color} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Suspended Bronze Dhara Patra (Chamber Pot at top) */}
              <g
                transform={`translate(${streamX * 10 - 500}, 0)`}
                className="transition-transform duration-75"
              >
                {/* Hanging Chains */}
                <line x1="470" y1="0" x2="480" y2="90" stroke="#B4975A" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                <line x1="530" y1="0" x2="520" y2="90" stroke="#B4975A" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />

                {/* Bronze Vessel Outline */}
                <ellipse cx="500" cy="90" rx="36" ry="12" fill="#8C6D37" stroke="#D4AF37" strokeWidth="2" />
                <path
                  d="M 464 90 C 464 125 480 155 496 168 L 496 180 L 504 180 L 504 168 C 520 155 536 125 536 90 Z"
                  fill="url(#oil-stream-grad)"
                  stroke="#C8A356"
                  strokeWidth="2"
                  filter="url(#oil-glow)"
                />
                {/* Brass Spigot Nozzle */}
                <rect x="497" y="180" width="6" height="12" fill="#D4AF37" rx="2" />
              </g>

              {/* The Medicated Flowing Oil Stream (Falling from Vessel at y=192 to Forehead at y=485) */}
              {isPlaying && (
                <>
                  {/* Central Flow Stream Line */}
                  <line
                    x1={streamX * 10}
                    y1="192"
                    x2={streamX * 10}
                    y2="485"
                    stroke="url(#oil-stream-grad)"
                    strokeWidth={flowSpeed === "gentle" ? "4.5" : "6.5"}
                    strokeLinecap="round"
                    strokeDasharray="18 10"
                    className="pulse-line-anim"
                    filter="url(#oil-glow)"
                  />

                  {/* Secondary fluid sheen line for organic liquid texture */}
                  <line
                    x1={streamX * 10 - 1}
                    y1="192"
                    x2={streamX * 10 - 1}
                    y2="485"
                    stroke="#FFF7DB"
                    strokeWidth="1.5"
                    opacity="0.8"
                    strokeDasharray="25 35"
                    className="pulse-line-anim"
                  />

                  {/* Ajna Chakra Forehead Impact Wave Concentric Rings */}
                  <ellipse
                    cx={streamX * 10}
                    cy="485"
                    rx="32"
                    ry="12"
                    fill="url(#ripple-grad)"
                    className="animate-ping"
                    style={{ animationDuration: "1.6s" }}
                  />

                  <ellipse
                    cx={streamX * 10}
                    cy="485"
                    rx="58"
                    ry="20"
                    fill="none"
                    stroke={currentOil.color}
                    strokeWidth="1.5"
                    opacity="0.6"
                    className="animate-pulse"
                  />

                  <ellipse
                    cx={streamX * 10}
                    cy="485"
                    rx="85"
                    ry="28"
                    fill="none"
                    stroke={currentOil.streamHex}
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    opacity="0.35"
                  />

                  {/* Impact Center Glowing Droplet */}
                  <circle
                    cx={streamX * 10}
                    cy="485"
                    r="6"
                    fill="#FFF7DB"
                    filter="url(#oil-glow)"
                  />
                </>
              )}
            </svg>

            {/* Bottom Floating Information Overlay on Canvas */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#060E0A]/90 backdrop-blur-md border border-[#214736]/70 text-xs z-30">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[#CCD7D1] font-medium font-serif">
                    {currentOil.nameHi.split(" ")[0]}
                  </span>
                </div>
                <span className="text-[#8DA197] hidden sm:inline">•</span>
                <span className="text-[#E5C77E] hidden sm:inline">
                  {flowMode === "oscillating" ? "दोलन प्रवाह (Left-Right Swing)" : "स्थिर आज्ञा चक्र प्रवाह (Center Stream)"}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[#95A79E] font-mono text-[11px]">
                <span>सत्र समय: <strong>{formatMinutes(sessionSeconds)}</strong></span>
              </div>
            </div>

          </div>

          {/* Quick Flow Control Switchers Below Canvas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <button
              onClick={() => setFlowMode("oscillating")}
              className={`p-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                flowMode === "oscillating"
                  ? "bg-[#143628] border-[#C8A356] text-[#E5C77E] shadow-md"
                  : "bg-[#0A1A12] border-[#1C3B2D] text-[#8DA197] hover:text-white"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>दोलन प्रवाह (Oscillating)</span>
            </button>

            <button
              onClick={() => setFlowMode("steady")}
              className={`p-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                flowMode === "steady"
                  ? "bg-[#143628] border-[#C8A356] text-[#E5C77E] shadow-md"
                  : "bg-[#0A1A12] border-[#1C3B2D] text-[#8DA197] hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>स्थिर केंद्र (Ajna Steady)</span>
            </button>

            <button
              onClick={() => setFlowSpeed(flowSpeed === "gentle" ? "medium" : "gentle")}
              className="p-2.5 rounded-xl text-xs font-semibold tracking-wide border bg-[#0A1A12] border-[#1C3B2D] text-[#CCD7D1] hover:text-white transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#E5C77E]" />
              <span>गति: {flowSpeed === "gentle" ? "सौम्य (Gentle)" : "मध्यम (Steady)"}</span>
            </button>

            <button
              onClick={() => {
                const types: OilType[] = ["brahmi", "ksheerabala", "takra", "chandanadi"];
                const nextIdx = (types.indexOf(selectedOil) + 1) % types.length;
                setSelectedOil(types[nextIdx]);
              }}
              className="p-2.5 rounded-xl text-xs font-semibold tracking-wide border bg-[#0A1A12] border-[#1C3B2D] text-[#CCD7D1] hover:text-white transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Droplets className="w-3.5 h-3.5 text-[#C76738]" />
              <span>अगला तैल बदलें</span>
            </button>
          </div>
        </div>

        {/* Right: Formulation Selector & Neuro-Ayurvedic Telemetry (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Doctor Spotlight Card in Shirodhara */}
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
                  <span>पंचकर्म एवं शिरोधारा विशेषज्ञ</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white truncate">
                  वैद्य विजय कुमार मिश्रा
                </h4>
                <p className="text-[11px] text-[#C5D3CC] font-medium">
                  BAMS, DNYS • 18+ वर्ष अनुभव
                </p>
                <p className="text-[10px] text-[#8DA197] truncate">
                  श्री शिव शक्ति आयुर्वेद, लखनऊ
                </p>
              </div>
            </div>

            {/* Dynamic Vaidya Clinical Guidance for this Oil */}
            <div className="mt-3 pt-2.5 border-t border-[#1C3B2D]/80 flex items-start space-x-2 text-[11px] text-[#CCD7D1] leading-relaxed italic bg-[#06120D]/60 p-2.5 rounded-xl">
              <span className="text-[#E5C77E] font-serif text-lg leading-none shrink-0">“</span>
              <span>{currentOil.clinicalNote}</span>
            </div>
          </div>

          {/* 4 Herbal Oil Formulation Switcher Tabs */}
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-[#A3B3AB] font-semibold px-1">
              औषधीय तैल एवं द्रव्य चयन (Select Formulation):
            </div>

            <div className="grid grid-cols-2 gap-2">
              {OILS.map((oil) => {
                const isSelected = selectedOil === oil.id;
                return (
                  <button
                    key={oil.id}
                    onClick={() => setSelectedOil(oil.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#132C20] border-current shadow-lg scale-[1.02]"
                        : "bg-[#091711] border-[#1C3B2D] text-[#8DA197] hover:border-[#2D5A44] hover:text-white"
                    }`}
                    style={{ color: isSelected ? oil.color : undefined }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-bold">
                        {oil.nameHi.split(" ")[0]}
                      </span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-current animate-ping" />}
                    </div>
                    <div className="text-[10px] text-[#95A79E] mt-0.5 line-clamp-1">
                      {oil.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Neuro-Ayurvedic Telemetry Card */}
          <div className="p-5 rounded-2xl bg-[#091711] border border-[#214736] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1A382A] pb-3">
              <div className="flex items-center space-x-2">
                <BrainCircuit className="w-4 h-4 text-[#E5C77E]" />
                <span className="text-xs font-serif font-bold text-white">मस्तिष्क तरंग एवं प्रभाव</span>
              </div>
              <span className="text-[11px] font-mono text-[#E5C77E] bg-[#143224] px-2 py-0.5 rounded-full border border-[#24523B]">
                {currentOil.brainwaveFreq}
              </span>
            </div>

            {/* Brainwave Waveform Mini Display */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#BAC8C1]">
                <span>मस्तिष्क अवस्था:</span>
                <span className="font-semibold text-white">{currentOil.brainwave}</span>
              </div>

              {/* Animated Wave SVG */}
              <div className="h-7 w-full bg-[#040A07] rounded-lg border border-[#1A382A] overflow-hidden flex items-center px-2">
                <svg className="w-full h-5 text-emerald-400" viewBox="0 0 300 20" preserveAspectRatio="none">
                  <path
                    d="M 0 10 Q 15 2 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10 T 270 10 T 300 10"
                    fill="none"
                    stroke={currentOil.color}
                    strokeWidth="2"
                    className="pulse-line-anim"
                  />
                </svg>
              </div>
            </div>

            {/* Dosha Balance Impact Bars */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-[#06110C] border border-[#163325]">
                <span className="text-[#8DA197] block text-[10px]">वात दोष प्रभाव:</span>
                <span className="font-medium text-[#E5C77E]">{currentOil.vataEffect}</span>
              </div>

              <div className="p-2 rounded-lg bg-[#06110C] border border-[#163325]">
                <span className="text-[#8DA197] block text-[10px]">पित्त दोष प्रभाव:</span>
                <span className="font-medium text-[#C76738]">{currentOil.pittaEffect}</span>
              </div>
            </div>

            {/* Active Herbal Ingredients */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-wider text-[#7C9086] font-semibold">
                प्रयुक्त शास्त्रीय जड़ी-बूटियाँ:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentOil.herbs.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#10241A] text-[10px] text-[#DCE7E1] border border-[#1D3E2E]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Book Shirodhara Consultation Button */}
          <div className="pt-1">
            <button
              onClick={() => scrollToSection("consultation-form")}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C76738] to-[#D97746] hover:brightness-110 text-white text-xs font-semibold tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>शिरोधारा सत्र हेतु परामर्श बुक करें</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
