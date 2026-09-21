"use client";

import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NadiParikshan from "@/components/NadiParikshan";
import ClinicIntro from "@/components/ClinicIntro";
import Doctor from "@/components/Doctor";
import PanchakarmaStory from "@/components/PanchakarmaStory";
import Shirodhara from "@/components/Shirodhara";
import HealthConcerns from "@/components/HealthConcerns";
import Philosophy from "@/components/Philosophy";
import LocationTrust from "@/components/LocationTrust";
import LeadForm from "@/components/LeadForm";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#FBF9F4] text-[#1B2420] selection:bg-[#C76738] selection:text-white pb-14 md:pb-0">
        {/* Scroll Progress & Section Wayfinding Indicator */}
        <ScrollProgress />

        {/* Luxury Fixed Header */}
        <Header />

        {/* 1. Hero First Impression */}
        <Hero />

        {/* 2. Nadi Parikshan Story & Pulse Science */}
        <NadiParikshan />

        {/* 3. Shree Shiv Shakti Ayurveda Introduction (Dark Forest Section) */}
        <ClinicIntro />

        {/* 4. Vaidya Vijay Kumar Mishra Spotlight (Warm Sand Section) */}
        <Doctor />

        {/* 5. Panchakarma Experience (Dark Forest Storytelling) */}
        <PanchakarmaStory />

        {/* 6. Shirodhara Rejuvenation Sanctuary (Midnight Forest) */}
        <Shirodhara />

        {/* 7. Health Concerns Typographic Wall (Warm Ivory Section) */}
        <HealthConcerns />

        {/* 8. Ayurveda Philosophy & Heritage (Dark Forest Section) */}
        <Philosophy />

        {/* 9. Local Trust & Lucknow Clinic Location (Warm Sand Section) */}
        <LocationTrust />

        {/* 10. Meta High-Converting Lead Generation Form (Dark Sanctuary) */}
        <LeadForm />

        {/* Footer with Medical Disclaimers & Landmark */}
        <Footer />

        {/* Floating WhatsApp Action Button (Direct Chat with Doctor: 8090070037) */}
        <FloatingWhatsApp />

        {/* Sticky Mobile Action Bar for Meta Ad Visitors */}
        <StickyMobileCTA />
      </main>
    </SmoothScroll>
  );
}
