"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero", index: "01", label: "परिचय" },
  { id: "nadi-parikshan", index: "02", label: "नाड़ी परीक्षण" },
  { id: "clinic-intro", index: "03", label: "क्लिनिक परिचय" },
  { id: "doctor", index: "04", label: "वैद्य जी" },
  { id: "panchakarma", index: "05", label: "पंचकर्म" },
  { id: "shirodhara", index: "06", label: "शिरोधारा" },
  { id: "health-concerns", index: "07", label: "स्वास्थ्य समस्याएँ" },
  { id: "philosophy", index: "08", label: "आयुर्वेद दर्शन" },
  { id: "location", index: "09", label: "क्लिनिक स्थान" },
  { id: "consultation-form", index: "10", label: "परामर्श फॉर्म" }
];

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${p})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Intersection observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (i >= 0) setCurrent(i);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const active = SECTIONS[current] || SECTIONS[0];

  return (
    <>
      {/* Top Hairline Progress Bar */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] bg-transparent"
        aria-hidden="true"
      >
        <div
          ref={bar}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#C76738] via-[#D4AF37] to-[#C76738]"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Right-Edge Editorial Wayfinding Indicator */}
      <div
        className="pointer-events-none fixed right-4 bottom-1/2 z-40 hidden translate-y-1/2 flex-col items-end gap-1.5 xl:flex select-none"
        aria-hidden="true"
        style={{ mixBlendMode: "difference", color: "#EDE0CF" }}
      >
        <span className="font-serif text-sm font-bold text-[#E5C77E]">
          {active.index}
        </span>
        <span className="h-8 w-[1px] bg-current opacity-40" />
        <span className="font-serif text-[11px] opacity-60">
          {String(SECTIONS.length).padStart(2, "0")}
        </span>
        <span
          className="mt-2 font-serif text-[11px] tracking-wider whitespace-nowrap opacity-80"
          style={{ writingMode: "vertical-rl" }}
        >
          {active.label}
        </span>
      </div>
    </>
  );
}
