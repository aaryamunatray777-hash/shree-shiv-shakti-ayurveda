# Walkthrough: Shree Shiv Shakti Ayurveda Landing Page

We have created and updated the **production-ready, premium, cinematic Ayurvedic healthcare landing page** for **Shree Shiv Shakti Ayurveda** (Munshipulia, Lucknow; Vaidya Vijay Kumar Mishra), optimized for Meta/Facebook advertising, patient engagement, and high lead conversion.

The website is currently **live and running on [http://localhost:3002](http://localhost:3002)**.

---

## 1. Visual Aesthetics & Editorial Storytelling

The design incorporates a luxury Ayurvedic wellness brand aesthetic, alternating between **Warm Ivory / Sand** (`#FBF9F4`, `#F5EFE3`) and **Deep Forest & Charcoal** (`#060E0A`, `#091711`) with **Muted Saffron** (`#C76738`) and **Antique Gold** (`#C8A356`, `#E5C77E`) accents.

### Bespoke Visual Assets & Real Photography
- **Official Brand Logo**: `logo.png` / `shiv_shakti_logo.png`
- **Authentic Doctor Portrait**: `vaidya.jpeg` (Full profile portrait)
- **Clinical Face Circular Avatar**: `face2.png` (Full face framed in circular clinician badges across all interactive simulators)
- **Macro Human Hand Pulse Photography**: `human_nadi_hands_macro.jpg`
- **Panchakarma & Classical Sanctuary Atmospheres**: `panchakarma_therapies.jpg`, `panchakarma_shirodhara.jpg`, `ayurveda_botanical_herbs.jpg`

---

## 2. Interactive Motion Graphics & Simulation Suite

### A. Nadi Parikshan Simulator (Pulse Examination)
- **Macro Human Hand Experience**:
  - Real human patient forearm and wrist resting on natural linen.
  - Vaidya's hand placing 3 fingertips precisely on the radial wrist artery.
  - Flowing golden and terracotta arterial prana pulse waves.
- **Interactive Three-Finger Diagnostics**:
  - **तर्जनी (वात / Vata - Index Finger)**: सर्प गति (~82 BPM) — स्नायु तंत्र, अनिद्रा व वात प्रकोप
  - **मध्यमा (पित्त / Pitta - Middle Finger)**: मण्डूक गति (~74 BPM) — पाचन अग्नि, यकृत व एसिडिटी
  - **अनामिका (कफ / Kapha - Ring Finger)**: हंस गति (~64 BPM) — शारीरिक स्थिरता, भारीपन व कफ
- **Doctor Face Avatar (`face2.png`)**:
  - Circular gold-rimmed avatar with live status indicator and clinical telemetry.
- **Synthesized Heartbeat Audio**:
  - Interactive Web Audio API toggle (*lub-dub... lub-dub...*).

---

### B. Interactive Shirodhara Simulator
- **Live Suspended Bronze Vessel (धारा पात्र)**:
  - Copper chains and oscillating spigot over the Ajna Chakra (Third Eye).
- **Viscous Medicated Oil Stream**:
  - Smooth rhythmic stream with concentric impact ripple waves.
- **4 Classical Herbal Formulations**:
  1. **ब्राह्मी तैल (Brahmi Taila)**: 38.5°C Sukhoshna • Alpha waves (8-10 Hz) • Insomnia & stress relief.
  2. **क्षीरबला तैल (Ksheerabala Taila)**: 39.0°C • Theta waves (5-7 Hz) • Migraine & nerve nourishment.
  3. **तक्र धारा (Medicated Buttermilk)**: 24.0°C Sheetal • High Pitta pacification (-95%), scalp & psoriasis care.
  4. **चन्दनादि तैल (Chandanadi Taila)**: 37.5°C • Blood pressure equilibrium & deep meditative calm.
- **Vaidya Observation Card & Circular Badge (`face2.png`)**:
  - Direct clinical notes for each herbal formulation.
- **Meditative Harmonic Audio**:
  - 108 Hz warm drone synthesized in real-time.

---

### C. Classical Panchakarma & Sthanik Basti Motion Simulator
Located in `components/InteractivePanchakarmaSimulator.tsx`:
Interactive SVG engines and real-time clinical parameters for all classical therapies:
1. **जानु बस्ति (Janu Basti)**:
   - Medicated black gram dough ring (माष पिष्ट रिंग) around the knee joint.
   - Warm Mahanarayana oil pool at 40.5°C with thermal convection lines penetrating the cartilage and synovial fluid.
2. **कटि बस्ति (Kati Basti)**:
   - Dough reservoir over the L3-L5-S1 lumbar spine.
   - 41.0°C Dhanwantharam oil pool relieving sciatica nerve pressure and herniated disc spasm.
3. **ग्रीवा बस्ति (Greeva Basti)**:
   - Dough reservoir pool over cervical vertebrae (C1-C7) relieving computer neck strain and cervical spondylosis.
4. **अभ्यंग (Abhyanga)**:
   - Full body rhythmic stroke flow across all 107 Marma points with medicated sesame oil.
5. **स्वेदन (Swedana / Steam Therapy)**:
   - Dashamoola herbal vapor chamber with rising steam plumes opening skin micro-pores and melting deep toxins (विजातीय तत्व).
6. **उद्वर्तन (Udwarthana)**:
   - Upward friction massage (प्रतिलोम घर्षण) with dry Triphala & Kolakulathadi herbal powders to reduce meda (fat) and promote lymphatic drainage.
7. **विरेचन (Virechana)**:
   - Classical Pitta shodhana demonstrating metabolic toxin clearance from the liver and gallbladder down through the gastrointestinal tract.
8. **रक्त मोक्षण (Rakta Mokshan)**:
   - Traditional blood purification therapy utilizing Jalauka (medicinal leech) micro-drainage for localized inflammatory toxins and gout/psoriasis relief.
9. **शिरोधारा (Shirodhara)**:
   - Ajna chakra stream integration within the panchakarma sequence.

Each therapy displays:
- Real-time temperature monitor (e.g. 40.5° C सुखोष्ण)
- Recommended session cycle (7 to 21 days)
- Classical medicated medium & herbal ingredients
- Key clinical indications
- Vaidya Vijay Kumar Mishra diagnostic quote and live picture-in-picture circle (`face2.png`)

---

## 3. Complete Page Structure

1. **Header**: Official logo, direct phone call button, smooth anchor navigation, and responsive mobile drawer.
2. **Hero Section**:
   - Headline: *“आपकी नाड़ी... आपके शरीर की कहानी कह सकती है।”*
   - Subtitle: *“आयुर्वेद की प्राचीन पद्धति — नाड़ी परीक्षण।”*
   - Landmark pill: *Munshipulia Petrol Pump ke bagal mein, Lucknow*
   - Dual CTAs: Lead form jump & Doctor introduction jump.
3. **Nadi Parikshan Story**:
   - Macro human hand simulation + pulse science + ethical credibility pillars.
4. **Clinic Introduction (Shree Shiv Shakti Ayurveda)**:
   - Four pillars: Nadi Parikshan, Consultation, Panchakarma Detox, Shirodhara & Peace.
5. **Vaidya Vijay Kumar Mishra Spotlight**:
   - Verified credentials: **BAMS, DNYS**
   - Clinical experience: **18+ Years**
   - Core specialization: **Infertility & Arthritis Specialist (संतानहीनता एवं गठिया / संधिवात विशेषज्ञ)**
   - Authentic photograph (`vaidya.jpeg`).
6. **Panchakarma Story & Simulation Suite**:
   - Pinned 8-therapy sequence + full interactive motion graphics engine.
7. **Shirodhara Sensory Sanctuary**:
   - Dedicated meditative simulator + 4 formulation switcher + benefit cards.
8. **Health Concerns Typographic Wall**:
   - Exact 19 concerns (*Diabetes, Arthritis, Acidity, Paralysis, Digestive Disorders, Kidney Stones, Skin Diseases, Leucoderma, Vitiligo, PCOD, Infertility, Sciatica, Gout, Piles, Blood Pressure, Sugar-related concerns, Migraine, Neuromuscular Disorders, Hair Fall*).
   - Interactive click: Clicking any concern auto-scrolls to the form and pre-selects the concern.
9. **Ayurveda Philosophy**:
   - Charaka Samhita shloka: *“स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं च।”*
   - Ahara, Vihara, and Aushadha tri-pillars.
10. **Lucknow Local Trust & Verified Clinic Location**:
    - Exact Verified Address: *Shri Shiv Shakti Ayurveda, Royal Plaza, Shop No. 11, L.G.F., Behind Pulse Heart Center, Munshi Pulia, Indira Nagar, Lucknow, Uttar Pradesh 226016*.
    - Landmark: *Behind Pulse Heart Center, Royal Plaza (Lower Ground Floor)*.
    - Exact Google Maps Navigation link configured directly to this business location.
    - Operating hours: 10:00 AM - 07:00 PM (Monday - Saturday).
11. **Meta / Facebook High-Converting Lead Form**:
    - Validates 10-digit Indian mobile numbers (`^[6-9]\d{9}$`).
    - Area selector, health concern auto-fill, preferred timing slot.
    - Server API endpoint `/api/leads` with Meta Conversions API readiness.
12. **Sticky Mobile Action Bar & Floating WhatsApp Button**:
    - Direct 1-tap WhatsApp consultation linked to doctor at **`8090070037`** (`https://wa.me/918090070037`).
    - Pre-filled message for quick patient inquiry.
    - Floating desktop and mobile WhatsApp button with live pulse status.
13. **Footer**:
    - Medical disclaimer, copyright, and direct clickable phone/WhatsApp links (`+91 80900 70037`).

---

## 4. Verification & Server Status

- **Build Status**: Production build successfully compiled in 2.6s with zero TypeScript or lint errors.
- **Server Status**: Live on **[http://localhost:3002](http://localhost:3002)**.
- **WhatsApp Integration**: All buttons (Floating button, Header, Doctor spotlight, Lead form, Location section, Mobile action bar, and Footer) linked to `wa.me/918090070037`.
- **Lead API Validation**:
  - `POST /api/leads` tested with invalid input: returns `400 Bad Request` with Hindi validation messages.
  - `POST /api/leads` tested with valid payload: returns `200 OK` with unique lead ID (e.g. `SSSA-1789985122268-520`).
