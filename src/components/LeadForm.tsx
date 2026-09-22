"use client";

import { useState, useEffect } from "react";
import { LeadFormData, HEALTH_CONCERNS_LIST, CONSULTATION_TIME_SLOTS, LUCKNOW_AREAS } from "@/lib/types";
import { Send, CheckCircle2, AlertCircle, Sparkles, Phone, Lock, MessageCircle } from "lucide-react";

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    mobileNumber: "",
    age: "",
    cityArea: "Munshipulia / Indira Nagar",
    healthConcern: "",
    preferredTime: "सुबह (10:00 AM - 01:00 PM)",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Listen for custom events from Health Concerns wall
  useEffect(() => {
    const handleSelectedConcern = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setFormData((prev) => ({ ...prev, healthConcern: customEvent.detail }));
        setErrors((prev) => ({ ...prev, healthConcern: "" }));
      }
    };

    window.addEventListener("select-health-concern", handleSelectedConcern);
    return () => window.removeEventListener("select-health-concern", handleSelectedConcern);
  }, []);

  const validateClient = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "कृपया अपना पूरा नाम दर्ज करें (कम से कम 2 अक्षर)।";
    }

    const cleanMobile = formData.mobileNumber.replace(/[\s\-()]/g, "").replace(/^(\+91|0)/, "");
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!cleanMobile) {
      newErrors.mobileNumber = "कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें।";
    } else if (!indianPhoneRegex.test(cleanMobile)) {
      newErrors.mobileNumber = "कृपया वैध 10-अंकीय भारतीय मोबाइल नंबर दर्ज करें (6-9 से शुरू)।";
    }

    if (!formData.healthConcern) {
      newErrors.healthConcern = "कृपया स्वास्थ्य समस्या या परामर्श का विषय चुनें।";
    }

    if (!formData.cityArea) {
      newErrors.cityArea = "कृपया अपना क्षेत्र या शहर चुनें।";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "कृपया परामर्श का पसंदीदा समय चुनें।";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateClient()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setLeadId(data.leadId || null);

        // Fire Meta standard Lead event ONLY on verified successful submission
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "Lead");
        }
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setGeneralError(data.message || "कुछ गलत हुआ। कृपया सीधे कॉल करें।");
        }
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setGeneralError("नेटवर्क समस्या। कृपया सीधे क्लिनिक कॉल करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultation-form" className="relative py-24 sm:py-32 bg-[#060E0A] text-[#F7F4ED] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#C76738]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#143628]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0F281E] border border-[#2D5A44]/60 text-xs text-[#E5C77E] font-medium tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C76738]" />
            <span>गोपनीय एवं व्यक्तिगत परामर्श</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-[#F7F4ED] tracking-tight leading-tight">
            “अपनी स्वास्थ्य समस्या के लिए <br />
            <span className="gold-gradient-text font-serif italic">परामर्श लें।</span>”
          </h2>

          <p className="text-sm sm:text-base text-[#A3B3AB] font-light leading-relaxed">
            नाड़ी परीक्षण और आयुर्वेदिक परामर्श के लिए अपनी जानकारी साझा करें।
          </p>
        </div>

        {/* The Card Form */}
        <div className="bg-[#091711] border border-[#214736] rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {submitted ? (
            /* Success State */
            <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-[#133327] border border-[#2D5A44] flex items-center justify-center text-[#E5C77E] mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display-luxury text-white">
                  धन्यवाद! आपकी रिक्वेस्ट प्राप्त हो गई है।
                </h3>
                <p className="text-base text-[#CCD9D2] font-serif italic max-w-lg mx-auto">
                  “धन्यवाद। आपकी consultation request प्राप्त हो गई है। हमारी टीम आपसे जल्द संपर्क करेगी।”
                </p>
              </div>

              {leadId && (
                <div className="inline-block bg-[#060E0A] px-4 py-2 rounded-full border border-[#1E3E30] text-xs text-[#8DA197] font-mono">
                  परामर्श संदर्भ आईडी: <strong className="text-[#E5C77E]">{leadId}</strong>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/918090070037?text=${encodeURIComponent(
                    `नमस्ते वैद्य जी, मैंने वेबसाइट पर परामर्श अनुरोध भेजा है।${leadId ? ` (संदर्भ ID: ${leadId})` : ""}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#0E3825] hover:bg-[#155337] border border-emerald-500/50 text-emerald-300 hover:text-white text-xs font-semibold tracking-wider transition-all flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp पर तुरंत संदेश भेजें</span>
                </a>

                <a
                  href={`tel:${process.env.NEXT_PUBLIC_CLINIC_PHONE || "+918090070037"}`}
                  className="px-6 py-3 rounded-full bg-[#C76738] hover:bg-[#D97746] text-white text-xs font-semibold tracking-wider transition-all flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>सीधे कॉल करें (8090070037)</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      mobileNumber: "",
                      age: "",
                      cityArea: "Munshipulia / Indira Nagar",
                      healthConcern: "",
                      preferredTime: "सुबह (10:00 AM - 01:00 PM)",
                      message: ""
                    });
                  }}
                  className="px-6 py-3 rounded-full border border-[#2D5A44] text-[#BAC7C0] hover:text-white text-xs font-semibold tracking-wider transition-all"
                >
                  नया फॉर्म भरें
                </button>
              </div>
            </div>
          ) : (
            /* Lead Form Inputs */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {generalError && (
                <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{generalError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#BAC7C0]">
                    पूरा नाम (Full Name) <span className="text-[#C76738]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="उदा. अमित शर्मा"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-[#060E0A] border rounded-xl px-4 py-3 text-sm text-white placeholder-[#5C6E66] focus:outline-none focus:ring-1 transition-all ${
                        errors.fullName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#1F3D2F] focus:border-[#C76738] focus:ring-[#C76738]"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#BAC7C0]">
                    मोबाइल नंबर (Mobile Number) <span className="text-[#C76738]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F8379] text-xs font-mono">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.mobileNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, "") })
                      }
                      className={`w-full bg-[#060E0A] border rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-[#5C6E66] focus:outline-none focus:ring-1 font-mono transition-all ${
                        errors.mobileNumber
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#1F3D2F] focus:border-[#C76738] focus:ring-[#C76738]"
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.mobileNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Age */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#BAC7C0]">
                    उम्र (Age)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={110}
                    placeholder="उदा. 42"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-[#060E0A] border border-[#1F3D2F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#5C6E66] focus:outline-none focus:border-[#C76738] focus:ring-1 focus:ring-[#C76738]"
                  />
                </div>

                {/* City / Area */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#BAC7C0]">
                    शहर / क्षेत्र (City / Area) <span className="text-[#C76738]">*</span>
                  </label>
                  <select
                    value={formData.cityArea}
                    onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                    className="w-full bg-[#060E0A] border border-[#1F3D2F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C76738] focus:ring-1 focus:ring-[#C76738]"
                  >
                    {LUCKNOW_AREAS.map((area) => (
                      <option key={area} value={area} className="bg-[#091711] text-white">
                        {area}
                      </option>
                    ))}
                  </select>
                  {errors.cityArea && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.cityArea}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Health Concern */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#BAC7C0]">
                    स्वास्थ्य समस्या (Health Concern) <span className="text-[#C76738]">*</span>
                  </label>
                  <select
                    value={formData.healthConcern}
                    onChange={(e) => setFormData({ ...formData, healthConcern: e.target.value })}
                    className={`w-full bg-[#060E0A] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 ${
                      errors.healthConcern
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#1F3D2F] focus:border-[#C76738] focus:ring-[#C76738]"
                    }`}
                  >
                    <option value="" className="bg-[#091711] text-[#788C83]">
                      -- समस्या चुनें --
                    </option>
                    {HEALTH_CONCERNS_LIST.map((concern) => (
                      <option key={concern} value={concern} className="bg-[#091711] text-white">
                        {concern}
                      </option>
                    ))}
                  </select>
                  {errors.healthConcern && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.healthConcern}</p>
                  )}
                </div>

                {/* Preferred Consultation Time */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#BAC7C0]">
                    पसंदीदा समय (Preferred Time) <span className="text-[#C76738]">*</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#060E0A] border border-[#1F3D2F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C76738] focus:ring-1 focus:ring-[#C76738]"
                  >
                    {CONSULTATION_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#091711] text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider text-[#BAC7C0]">
                  अतिरिक्त जानकारी / संदेश (Message)
                </label>
                <textarea
                  rows={3}
                  placeholder="अपनी समस्या के लक्षण, कितने समय से है, आदि संक्षेप में लिखें..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#060E0A] border border-[#1F3D2F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#5C6E66] focus:outline-none focus:border-[#C76738] focus:ring-1 focus:ring-[#C76738]"
                />
              </div>

              {/* Privacy Notice */}
              <div className="flex items-center space-x-2 text-[11px] text-[#7C8F85]">
                <Lock className="w-3.5 h-3.5 text-[#C8A356] shrink-0" />
                <span>आपकी जानकारी पूर्णतः सुरक्षित और गोपनीय रखी जाती है।</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C76738] via-[#D36B3B] to-[#DB7444] text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-orange-950/60 transition-all hover:brightness-105 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <span>अनुरोध भेजा जा रहा है...</span>
                ) : (
                  <>
                    <span>Consultation Request भेजें</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Or WhatsApp Doctor Directly */}
              <div className="pt-3 text-center border-t border-[#1C3B2D]/80">
                <p className="text-xs text-[#8DA197] mb-2 font-light">
                  या सीधे डॉक्टर को WhatsApp पर अपनी समस्या लिखें:
                </p>
                <a
                  href={`https://wa.me/918090070037?text=${encodeURIComponent(
                    `नमस्ते वैद्य जी, मुझे श्री शिव शक्ति आयुर्वेद क्लिनिक (मुंशी पुलिया, लखनऊ) में परामर्श के लिए बात करनी है।${
                      formData.healthConcern ? ` समस्या: ${formData.healthConcern}` : ""
                    }`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-[#0E3825] hover:bg-[#155337] border border-emerald-500/50 text-emerald-300 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp पर सीधे मैसेज करें (8090070037)</span>
                </a>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
