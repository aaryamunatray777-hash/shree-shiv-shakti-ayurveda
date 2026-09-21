export interface LeadFormData {
  fullName: string;
  mobileNumber: string;
  age?: string;
  cityArea: string;
  healthConcern: string;
  preferredTime: string;
  message?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  leadId?: string;
  metaStatus?: "PROCESSED" | "META_INTEGRATION_PENDING" | "FAILED";
  errors?: Record<string, string>;
}

export const HEALTH_CONCERNS_LIST = [
  "Diabetes",
  "Arthritis",
  "Acidity",
  "Paralysis",
  "Digestive Disorders",
  "Kidney Stones",
  "Skin Diseases",
  "Leucoderma",
  "Vitiligo",
  "PCOD",
  "Infertility",
  "Sciatica",
  "Gout",
  "Piles",
  "Blood Pressure",
  "Sugar-related concerns",
  "Migraine",
  "Neuromuscular Disorders",
  "Hair Fall"
] as const;

export type HealthConcern = typeof HEALTH_CONCERNS_LIST[number];

export const CONSULTATION_TIME_SLOTS = [
  "सुबह (10:00 AM - 01:00 PM)",
  "दोपहर (02:00 PM - 05:00 PM)",
  "शाम (05:00 PM - 08:00 PM)",
  "किसी भी समय (Anytime)"
] as const;

export const LUCKNOW_AREAS = [
  "Munshipulia / Indira Nagar",
  "Gomti Nagar / Vibhuti Khand",
  "Aliganj / Kapoorthala",
  "Hazratganj / Mahanagar",
  "Jankipuram / Vikas Nagar",
  "Ashiyana / Kanpur Road",
  "Chowk / Old Lucknow",
  "Other (अन्य क्षेत्र)"
] as const;
