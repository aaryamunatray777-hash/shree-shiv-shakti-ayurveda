"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Activity } from "lucide-react";

interface FingerData {
  id: "vata" | "pitta" | "kapha";
  nameHi: string;
  nameEn: string;
  fingerHi: string;
  fingerEn: string;
  gati: string;
  gatiEn: string;
  color: string;
  pulseSpeed: number; // in bpm
  description: string;
  classicalSense: string;
  positionPercent: { left: number; top: number }; // percentage on the real human image
}

const FINGERS: FingerData[] = [
  {
    id: "vata",
    nameHi: "वात (Vata)",
    nameEn: "Air & Ether Element",
    fingerHi: "तर्जनी उँगली",
    fingerEn: "Index Finger (Closest to Thumb)",
    gati: "सर्प गति (Serpent Movement)",
    gatiEn: "Fast, light, subtle crawling wave",
    color: "#E5C77E",
    pulseSpeed: 82,
    description: "स्नायु तंत्र, मानसिक तनाव, वायु विकार, जोड़ों का दर्द और अनिद्रा का संकेत।",
    classicalSense: "उँगली के अग्रभाग पर हल्का, तेज, चपल और वक्र (टेढ़ा) स्पंदन प्रतीत होता है।",
    positionPercent: { left: 47.5, top: 61.2 }
  },
  {
    id: "pitta",
    nameHi: "पित्त (Pitta)",
    nameEn: "Fire & Water Element",
    fingerHi: "मध्यमा उँगली",
    fingerEn: "Middle Finger",
    gati: "मण्डूक गति (Frog Movement)",
    gatiEn: "Sharp, leaping, warm bounding pulse",
    color: "#C76738",
    pulseSpeed: 74,
    description: "पाचन अग्नि, यकृत (Liver), एसिडिटी, रक्तपित्त और त्वचा विकारों का संकेत।",
    classicalSense: "उँगली पर स्पष्ट, उछलने वाला, उष्ण (गर्म) और तीव्र स्पंदन अनुभव होता है।",
    positionPercent: { left: 51.2, top: 60.5 }
  },
  {
    id: "kapha",
    nameHi: "कफ (Kapha)",
    nameEn: "Water & Earth Element",
    fingerHi: "अनामिका उँगली",
    fingerEn: "Ring Finger",
    gati: "हंस गति (Swan Movement)",
    gatiEn: "Slow, deep, graceful gliding wave",
    color: "#52B788",
    pulseSpeed: 64,
    description: "शारीरिक स्थिरता, कफ, भारीपन, जोड़ों का पोषण और श्वसन प्रणाली का संकेत।",
    classicalSense: "गहराई में भारी, धीमा, शांत और लहरदार स्पंदन महसूस होता है।",
    positionPercent: { left: 54.8, top: 57.5 }
  }
];

export default function InteractiveNadiSimulator() {
  const [activeFinger, setActiveFinger] = useState<"vata" | "pitta" | "kapha" | "all">("all");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Heartbeat pulse cycle
  useEffect(() => {
    const playSound = (frequency = 65, duration = 0.12) => {
      if (!soundEnabled || typeof window === "undefined") return;
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

        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio fallback
      }
    };

    const interval = setInterval(() => {
      if (soundEnabled) {
        playSound(70, 0.09);
        setTimeout(() => playSound(52, 0.12), 200); // lub-dub rhythm
      }
    }, 1100);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const selectedFinger = FINGERS.find((f) => f.id === activeFinger);

  return (
    <div className="w-full bg-[#091711] rounded-3xl border border-[#214736] p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C76738]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#2D5A44]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A382A] pb-6 mb-8 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E5C77E] shrink-0 shadow-xl ring-2 ring-[#C76738]/30">
            <Image
              src="/images/face2.png"
              alt="वैद्य विजय कुमार मिश्रा - नाड़ी परीक्षक"
              fill
              className="object-cover object-center"
            />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#E5C77E] font-semibold mb-1">
              <Activity className="w-4 h-4 text-[#C76738] animate-pulse" />
              <span>साक्षात नाड़ी स्पर्श • वैद्य विजय कुमार मिश्रा द्वारा</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              वास्तविक मानव हाथ और कलाई पर नाड़ी का सजीव अनुभव
            </h3>
            <p className="text-xs text-[#95A79E] font-light mt-0.5">
              रोगी की कलाई पर वैद्य जी की तीनों उँगलियों के संपर्क बिंदु पर क्लिक करके वात, पित्त और कफ की आंतरिक गति महसूस करें।
            </p>
          </div>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next && !audioCtxRef.current) {
              const AudioContextClass =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
              audioCtxRef.current = new AudioContextClass();
            }
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer shrink-0 ${
            soundEnabled
              ? "bg-[#C76738] border-[#E88656] text-white shadow-lg shadow-orange-950/40"
              : "bg-[#0F281E] border-[#274F3B] text-[#CCD7D1] hover:text-white"
          }`}
          title="स्पंदन ध्वनि चालू या बंद करें"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-white" />
              <span>धड़कन ध्वनि: चालू (Mute)</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#95A79E]" />
              <span>ध्वनि सुनें (Turn Sound ON)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left: Photorealistic Human Hand Canvas with Motion Graphic Overlay (8 cols) */}
        <div className="lg:col-span-8 relative">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#2D5A44]/70 bg-[#060E0A] shadow-2xl group select-none">
            
            {/* Real Human Hand Macro Photography */}
            <Image
              src="/images/human_nadi_hands_macro.jpg"
              alt="Real Human Hand and Wrist during Ayurvedic Nadi Parikshan"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-center brightness-95 contrast-105"
            />

            {/* Dark Vignette Overlay for Motion Graphics Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060E0A]/85 via-transparent to-[#060E0A]/40 pointer-events-none" />

            {/* Live Doctor Picture-in-Picture Floating Badge on Hand Canvas */}
            <div className="absolute top-3 left-3 z-30 flex items-center space-x-2.5 sm:space-x-3 px-3 py-2 rounded-2xl bg-[#060E0A]/90 backdrop-blur-md border border-[#C8A356]/40 shadow-2xl">
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-[#E5C77E] shrink-0 shadow-md">
                <Image
                  src="/images/face2.png"
                  alt="वैद्य विजय कुमार मिश्रा"
                  fill
                  className="object-cover object-center"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#060E0A] animate-pulse" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#E5C77E]">
                    नाड़ी परीक्षक (Diagnostician)
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

            {/* Motion Graphic SVG Overlay: Arterial Prana Flow */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 625"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="prana-stream" x1="100%" y1="65%" x2="45%" y2="61%">
                  <stop offset="0%" stopColor="#C76738" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#E5C77E" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#52B788" stopOpacity="0.8" />
                </linearGradient>

                <filter id="prana-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Arterial Pulse Stream traveling from patient arm into the Vaidya's fingertips */}
              <path
                d="M950 410 C 820 405 680 395 540 375 C 500 370 470 375 440 380"
                stroke="url(#prana-stream)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="25 80"
                className="pulse-line-anim"
                filter="url(#prana-glow)"
              />
            </svg>

            {/* 3 Real Human Fingertip Interactive Shockwave Touchpoints */}
            {FINGERS.map((finger) => {
              const isSelected = activeFinger === "all" || activeFinger === finger.id;

              return (
                <div
                  key={finger.id}
                  style={{
                    left: `${finger.positionPercent.left}%`,
                    top: `${finger.positionPercent.top}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => setActiveFinger(finger.id)}
                  className="absolute z-20 cursor-pointer group/point"
                >
                  {/* Concentric Tactile Ripple Shockwaves */}
                  {isSelected && (
                    <>
                      <div
                        className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                        style={{
                          backgroundColor: finger.color,
                          opacity: 0.5,
                          animationDuration: `${(60 / finger.pulseSpeed) * 2}s`
                        }}
                      />
                      <div
                        className="absolute -inset-4 rounded-full border border-dashed animate-spin pointer-events-none"
                        style={{
                          borderColor: finger.color,
                          opacity: 0.6,
                          animationDuration: "8s"
                        }}
                      />
                    </>
                  )}

                  {/* Fingertip Center Target */}
                  <div
                    className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl"
                    style={{
                      backgroundColor: isSelected ? finger.color : "rgba(15, 40, 30, 0.8)",
                      border: `2px solid ${finger.color}`,
                      transform: isSelected ? "scale(1.25)" : "scale(1)"
                    }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Floating Finger Label Tag */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg backdrop-blur-md text-[11px] font-serif font-bold whitespace-nowrap shadow-lg transition-all ${
                      isSelected
                        ? "bg-[#091711]/95 border border-current scale-105"
                        : "bg-[#060E0A]/80 border border-white/20 text-[#CCD7D1] opacity-75 group-hover/point:opacity-100"
                    }`}
                    style={{ color: finger.color }}
                  >
                    <span>{finger.nameHi.split(" ")[0]}</span>
                    <span className="block text-[9px] font-sans font-light text-[#9EB2A8]">
                      {finger.fingerHi.split(" ")[0]}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Bottom Overlay Legend on Canvas */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#091711]/90 backdrop-blur-md border border-[#214736]/70 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[#CCD7D1]">
                  नाड़ी प्रवाह: <strong>72-80 BPM</strong> (वास्तविक मानव स्पंदन)
                </span>
              </div>
              <div className="text-[#E5C77E] font-medium hidden sm:block">
                👆 कलाई पर स्थित किसी भी उँगली पर टैप करें
              </div>
            </div>

          </div>

          {/* Quick Selector Tabs Below Canvas */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <button
              onClick={() => setActiveFinger("all")}
              className={`py-2 px-1 rounded-xl text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                activeFinger === "all"
                  ? "bg-[#143628] border-[#C8A356] text-[#E5C77E] shadow-md"
                  : "bg-[#0A1A12] border-[#1C3B2D] text-[#8DA197] hover:text-white"
              }`}
            >
              तीनों उँगलियाँ (All)
            </button>

            {FINGERS.map((finger) => (
              <button
                key={finger.id}
                onClick={() => setActiveFinger(finger.id)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                  activeFinger === finger.id
                    ? "bg-[#143628] border-current shadow-md scale-[1.02]"
                    : "bg-[#0A1A12] border-[#1C3B2D] text-[#8DA197] hover:text-white"
                }`}
                style={{
                  color: activeFinger === finger.id ? finger.color : undefined
                }}
              >
                {finger.nameHi}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Clinical Feedback Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Vaidya Vijay Kumar Mishra Spotlight Card with Dynamic Clinical Observation */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#122A1E] to-[#0A1A12] border border-[#C8A356]/40 shadow-xl relative overflow-hidden">
            <div className="flex items-center space-x-3.5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#E5C77E] shrink-0 shadow-lg ring-2 ring-[#C76738]/40 ring-offset-2 ring-offset-[#0A1A12]">
                <Image
                  src="/images/face2.png"
                  alt="वैद्य विजय कुमार मिश्रा - नाड़ी परीक्षक"
                  fill
                  className="object-cover object-center"
                />
                <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#091711] shadow-sm animate-pulse" />
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#1C3B2D] border border-[#2D5A44] text-[10px] uppercase tracking-wider text-[#E5C77E] font-semibold">
                  <Sparkles className="w-2.5 h-2.5 text-[#C76738]" />
                  <span>नाड़ी परीक्षक (Diagnostician)</span>
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

            {/* Dynamic Vaidya Clinical Observation Quote */}
            <div className="mt-3 pt-2.5 border-t border-[#1C3B2D]/80 flex items-start space-x-2 text-[11px] text-[#CCD7D1] leading-relaxed italic bg-[#06120D]/60 p-2.5 rounded-xl">
              <span className="text-[#E5C77E] font-serif text-lg leading-none shrink-0">“</span>
              <span>
                {activeFinger === "vata" && "तर्जनी उँगली पर तीव्र चपल सर्प गति वात प्रकुपित होने, स्नायु तनाव और जोड़ों के दर्द का प्रत्यक्ष संकेत देती है।"}
                {activeFinger === "pitta" && "मध्यमा उँगली पर उछलती हुई मण्डूक गति पित्त असंतुलन, पाचन अग्नि विकार व आंतरिक उष्णता दर्शाती है।"}
                {activeFinger === "kapha" && "अनामिका उँगली पर मन्द, गहरी हंस गति शरीर में कफ की अधिकता, भारीपन और चयापचय सुस्ती का संकेत है।"}
                {activeFinger === "all" && "कलाई की रेडियल धमनी पर तीनों उँगलियाँ रखकर शरीर के त्रिदोष संतुलन और धातु पोषण का समग्र आकलन किया जाता है।"}
              </span>
            </div>
          </div>

          {selectedFinger ? (
            /* Specific Finger Deep Clinical Breakdown */
            <div className="p-6 rounded-2xl bg-[#0D2117] border border-[#2D5A44] space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#1C3B2D] pb-3">
                <div className="text-xs uppercase tracking-widest text-[#E5C77E] font-semibold">
                  {selectedFinger.fingerHi}
                </div>
                <span
                  className="w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: selectedFinger.color }}
                />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-white" style={{ color: selectedFinger.color }}>
                  {selectedFinger.nameHi}
                </h4>
                <div className="text-xs text-[#E5C77E] font-mono mt-0.5">
                  {selectedFinger.gati}
                </div>
                <p className="text-xs text-[#95A79E] italic mt-1">
                  {selectedFinger.gatiEn}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07130E] border border-[#1A382A] space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#C8A356] font-semibold">
                  उँगली के नीचे क्या महसूस होता है:
                </div>
                <p className="text-xs text-[#E4ECE7] leading-relaxed font-light">
                  {selectedFinger.classicalSense}
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#A3B3AB] font-semibold">
                  यह किस शारीरिक स्थिति का संकेत है:
                </div>
                <p className="text-xs text-[#BAC8C1] leading-relaxed font-light">
                  {selectedFinger.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1C3B2D] flex items-center justify-between text-xs text-[#7F9389]">
                <span>स्पंदन गति: ~{selectedFinger.pulseSpeed} bpm</span>
                <span className="text-[#C8A356]">त्रिदोष सिद्धांत</span>
              </div>
            </div>
          ) : (
            /* All Three Combined View */
            <div className="p-6 rounded-2xl bg-[#0D2117] border border-[#2D5A44] space-y-5">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#E5C77E] font-semibold border-b border-[#1C3B2D] pb-3">
                <Sparkles className="w-4 h-4 text-[#C76738]" />
                <span>त्रिदोष समन्वय (Tridosha Reading)</span>
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-white">
                  तीनों उँगलियों का एक साथ स्पर्श
                </h4>
                <p className="text-xs text-[#95A79E] leading-relaxed mt-2 font-light">
                  आयुर्वेद में वैद्य जी केवल एक बिंदु नहीं, बल्कि तीनों उँगलियों को एक साथ कलाई की रेडियल धमनी पर रखकर यह जांचते हैं कि शरीर में वात, पित्त और कफ में से कौन सा दोष प्रकुपित या असंतुलित है।
                </p>
              </div>

              <div className="space-y-2.5">
                {FINGERS.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setActiveFinger(f.id)}
                    className="p-2.5 rounded-xl bg-[#07130E] border border-[#1A382A] hover:border-[#C76738] transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <span className="font-serif font-semibold" style={{ color: f.color }}>
                      {f.nameHi}
                    </span>
                    <span className="text-[11px] text-[#7F9389]">{f.fingerHi}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#6C7B74] italic">
                * कलाई पर किसी भी उँगली के बिंदु पर टैप करके उसकी आंतरिक तरंग गति का विवरण देखें।
              </p>
            </div>
          )}

          {/* Clinical Booking Prompt */}
          <div className="p-4 rounded-xl bg-[#142B20] border border-[#234A37] flex items-center justify-between">
            <div className="text-xs text-[#E2EAE5]">
              <span className="block font-semibold text-white">अपनी व्यक्तिगत नाड़ी जांचें</span>
              <span className="text-[11px] text-[#95A79E]">वैद्य विजय कुमार मिश्रा • लखनऊ</span>
            </div>
            <a
              href="#consultation-form"
              className="px-4 py-2 rounded-full bg-[#C76738] hover:bg-[#D97746] text-white text-xs font-semibold tracking-wider transition-all"
            >
              परामर्श बुक करें
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
