import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shreeshivshaktiayurveda.com"),
  title: "Shree Shiv Shakti Ayurveda | Nadi Parikshan & Ayurvedic Consultation in Lucknow",
  description:
    "Nadi Parikshan, Panchakarma, Shirodhara and Ayurvedic consultation at Shree Shiv Shakti Ayurveda, Royal Plaza, Munshi Pulia, Indira Nagar, Lucknow. Root-cause wellness guided by Vaidya Vijay Kumar Mishra.",
  keywords: [
    "Shree Shiv Shakti Ayurveda",
    "Nadi Parikshan Lucknow",
    "Ayurvedic Doctor Lucknow",
    "Vaidya Vijay Kumar Mishra",
    "Panchakarma Lucknow",
    "Munshi Pulia Ayurvedic Clinic",
    "Shirodhara Lucknow",
    "Ayurvedic Consultation Lucknow"
  ],
  authors: [{ name: "Shree Shiv Shakti Ayurveda" }],
  openGraph: {
    title: "Shree Shiv Shakti Ayurveda | Nadi Parikshan in Lucknow",
    description:
      "Nadi Parikshan, Panchakarma, Shirodhara and classical Ayurvedic consultations in Lucknow at Munshi Pulia, Indira Nagar.",
    url: "https://shreeshivshaktiayurveda.com",
    siteName: "Shree Shiv Shakti Ayurveda",
    images: [
      {
        url: "/images/hero_nadi_parikshan.jpg",
        width: 1200,
        height: 675,
        alt: "Nadi Parikshan at Shree Shiv Shakti Ayurveda, Lucknow"
      }
    ],
    locale: "hi_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Shiv Shakti Ayurveda | Lucknow",
    description:
      "Classical Nadi Parikshan and Ayurvedic therapies at Munshi Pulia, Indira Nagar, Lucknow.",
    images: ["/images/hero_nadi_parikshan.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Shree Shiv Shakti Ayurveda",
  "description": "Classical Ayurvedic Consultation, Nadi Parikshan and Panchakarma therapies in Lucknow.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Royal Plaza, Shop No. 11, L.G.F., Behind Pulse Heart Center, Munshi Pulia, Indira Nagar",
    "addressLocality": "Lucknow",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "226016",
    "addressCountry": "IN"
  },
  "telephone": "+918090070037",
  "medicalSpecialty": "Ayurveda",
  "founder": {
    "@type": "Person",
    "name": "Vaidya Vijay Kumar Mishra",
    "jobTitle": "Ayurvedic Physician & Nadi Parikshan Practitioner"
  },
  "openingHours": "Mo,Tu,We,Th,Fr,Sa 10:00-19:00",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI, Card"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FBF9F4] text-[#1B2420] antialiased selection:bg-[#C76738] selection:text-white">
        {children}
      </body>
    </html>
  );
}
