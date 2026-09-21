"use client";

import { MapPin, Phone, Clock, Navigation, CheckCircle2, Building2, Compass, ExternalLink, MessageCircle } from "lucide-react";

export default function LocationTrust() {
  const clinicPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE || "+91 80900 70037";
  const whatsappNumber = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || "918090070037";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    "नमस्ते वैद्य जी, मुझे श्री शिव शक्ति आयुर्वेद (रॉयल प्लाजा, मुंशी पुलिया, लखनऊ) में नाड़ी परीक्षण एवं परामर्श के लिए समय लेना है।"
  )}`;
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Shri+Shiv+Shakti+Ayurveda,+Royal+Plaza,+Shop+No.+11,+L.G.F.,+behind+Pulse+Heart+Center,+Munshi+Pulia,+Indira+Nagar,+Lucknow,+Uttar+Pradesh+226016";

  const googleMapsEmbedUrl =
    "https://maps.google.com/maps?q=Shri+Shiv+Shakti+Ayurveda,+Royal+Plaza,+Shop+No.+11,+L.G.F.,+behind+Pulse+Heart+Center,+Munshi+Pulia,+Indira+Nagar,+Lucknow,+Uttar+Pradesh+226016&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="relative py-24 sm:py-32 bg-[#FBF9F4] text-[#1B2420] overflow-hidden">
      {/* Background Soft Accents */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#C76738]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#2D5A44]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sub-Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAE0CF]/70 border border-[#B4A082]/30 text-xs text-[#8C4A26] font-medium tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#C76738]" />
            <span>सत्यापित क्लिनिक स्थान (Verified Clinic Location)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury text-[#1B2420] tracking-tight leading-tight">
            “Lucknow में... <br />
            <span className="text-[#C76738] font-serif italic">आपके करीब।</span>”
          </h2>

          <p className="text-sm sm:text-base text-[#4E5B55] font-light">
            मुंशी पुलिया, इंदिरा नगर, गोमती नगर एवं संपूर्ण लखनऊ से सुगम पहुंच
          </p>
        </div>

        {/* Main Location & Map Card Composition */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-[#EAE0CF] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Verified Address Details & Hours (6 cols) */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-7 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#8C4A26] uppercase">
                  <Building2 className="w-4 h-4 text-[#C76738]" />
                  <span>प्रमाणित आयुर्वेदिक चिकित्सालय • लखनऊ</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display-luxury text-[#1B2420]">
                  Shri Shiv Shakti Ayurveda
                </h3>

                {/* Verified Exact Address Card */}
                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#EAE0CF] space-y-2">
                  <div className="flex items-start space-x-3 text-[#1B2420]">
                    <MapPin className="w-5 h-5 text-[#C76738] shrink-0 mt-1" />
                    <div className="space-y-1 leading-relaxed text-sm sm:text-base">
                      <div className="font-serif font-bold text-[#1B2420] text-base sm:text-lg">
                        Royal Plaza, Shop No. 11, L.G.F.
                      </div>
                      <div className="text-sm font-semibold text-[#C76738]">
                        Behind Pulse Heart Center
                      </div>
                      <div className="text-sm text-[#4E5B55]">
                        Munshi Pulia, Indira Nagar
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#2E3C36]">
                        Lucknow, Uttar Pradesh 226016
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timing & Doctor Presence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE0CF] space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#8C4A26]">
                      <Clock className="w-4 h-4 text-[#C76738]" />
                      <span>परामर्श समय</span>
                    </div>
                    <div className="text-xs sm:text-sm font-serif font-bold text-[#1B2420]">
                      10:00 AM - 07:00 PM
                    </div>
                    <div className="text-[11px] text-[#6C7B74]">
                      सोमवार से शनिवार
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE0CF] space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#8C4A26]">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A44]" />
                      <span>परामर्शदाता वैद्य</span>
                    </div>
                    <div className="text-xs sm:text-sm font-serif font-bold text-[#1B2420]">
                      वैद्य विजय कुमार मिश्रा
                    </div>
                    <div className="text-[11px] text-[#6C7B74]">
                      BAMS, DNYS • 18+ वर्ष अनुभव
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Get Directions, WhatsApp & Call */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#1B2420] hover:bg-[#C76738] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                  title="Google Maps पर Shri Shiv Shakti Ayurveda का सटीक नेविगेशन खोलें"
                >
                  <Navigation className="w-4 h-4 text-[#E5C77E]" />
                  <span>Get Directions (गूगल मैप)</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#0E3825] hover:bg-[#155337] border border-emerald-500/50 text-emerald-300 hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  title="WhatsApp पर डॉक्टर को मैसेज भेजें (8090070037)"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp पर मैसेज करें</span>
                </a>

                <a
                  href={`tel:${clinicPhone}`}
                  className="px-5 py-3 rounded-full border border-[#C76738] hover:bg-[#C76738] text-[#8C4A26] hover:text-white text-xs sm:text-sm font-medium tracking-wide transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>8090070037</span>
                </a>
              </div>

            </div>

            {/* Right Column: Live Interactive Google Map Embed & Landmarks (6 cols) */}
            <div className="lg:col-span-6 bg-[#0E2218] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#EAE0CF] relative overflow-hidden">
              
              {/* Interactive Live Google Map Iframe */}
              <div className="relative w-full h-[340px] sm:h-[380px] lg:h-full min-h-[340px]">
                <iframe
                  title="Shri Shiv Shakti Ayurveda Location Map"
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "contrast(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating Map Header Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#091711]/95 backdrop-blur-md border border-[#2D5A44]/70 shadow-xl text-white text-xs pointer-events-none">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span className="font-serif font-bold text-[#E5C77E] truncate">
                      Shri Shiv Shakti Ayurveda
                    </span>
                    <span className="text-[10px] text-[#A3B3AB] hidden sm:inline truncate">
                      • Behind Pulse Heart Center
                    </span>
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#C76738] hover:bg-[#D97746] text-white text-[11px] font-medium transition-colors"
                  >
                    <span>Full Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Bottom Overlay Pill with Landmark Context */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#060E0A]/95 backdrop-blur-md border border-[#214736] text-white text-xs space-y-1 pointer-events-auto">
                  <div className="flex items-center space-x-2 text-[#E5C77E] font-semibold text-[11px] uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-[#C76738]" />
                    <span>सटीक लैंडमार्क</span>
                  </div>
                  <p className="text-[11px] text-[#CCD7D1] leading-tight">
                    मुंशी पुलिया, इंदिरा नगर में <strong>Pulse Heart Center</strong> के ठीक पीछे स्थित <strong>Royal Plaza</strong> (Shop No. 11, Lower Ground Floor).
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
