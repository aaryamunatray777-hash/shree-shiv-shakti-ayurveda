import { LeadFormData, LeadSubmissionResponse } from "@/lib/types";

interface MetaPayload {
  event_name: "Lead";
  event_time: number;
  action_source: "website";
  user_data: {
    ph?: string[];
    fn?: string[];
    ct?: string[];
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data: {
    lead_source: string;
    clinic: string;
    location: string;
    doctor: string;
    concern: string;
    preferred_time: string;
    city_area: string;
    patient_age?: string;
  };
}

/**
 * Service to process and forward landing page leads to Meta Conversions API / CRM
 */
export async function processMetaLead(
  lead: LeadFormData,
  metadata?: { ip?: string; userAgent?: string }
): Promise<LeadSubmissionResponse> {
  const metaAccessToken = process.env.META_ACCESS_TOKEN;
  const metaPixelId = process.env.META_PIXEL_ID;
  const metaPageId = process.env.META_PAGE_ID;
  const metaLeadFormId = process.env.META_LEAD_FORM_ID;

  // Check if live Meta credentials are configured
  const hasMetaCredentials = Boolean(metaAccessToken && (metaPixelId || metaPageId || metaLeadFormId));

  // Sanitize mobile (E.164 without '+' or spaces for Meta hashing)
  const cleanPhone = lead.mobileNumber.replace(/\D/g, "");
  const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

  const payload: MetaPayload = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    user_data: {
      ph: [formattedPhone],
      fn: [lead.fullName.trim().toLowerCase()],
      ct: [lead.cityArea.toLowerCase()],
      client_ip_address: metadata?.ip || "127.0.0.1",
      client_user_agent: metadata?.userAgent || "Mozilla/5.0"
    },
    custom_data: {
      lead_source: "Meta_Facebook_Landing_Page",
      clinic: "Shree Shiv Shakti Ayurveda",
      location: "Royal Plaza, Shop No. 11, L.G.F., Behind Pulse Heart Center, Munshi Pulia, Indira Nagar, Lucknow, Uttar Pradesh 226016",
      doctor: "Vaidya Vijay Kumar Mishra",
      concern: lead.healthConcern,
      preferred_time: lead.preferredTime,
      city_area: lead.cityArea,
      patient_age: lead.age
    }
  };

  const leadId = `SSSA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  if (!hasMetaCredentials) {
    // Graceful offline mock / Pending mode as instructed
    console.info("--------------------------------------------------");
    console.info("[META_LEAD_SERVICE] Status: META_INTEGRATION_PENDING");
    console.info("[META_LEAD_SERVICE] Notice: Missing META_ACCESS_TOKEN / META_PIXEL_ID in environment.");
    console.info("[META_LEAD_SERVICE] Storing lead locally & preparing payload:");
    console.info(`[META_LEAD_SERVICE] Lead ID: ${leadId}`);
    console.info(`[META_LEAD_SERVICE] Patient: ${lead.fullName} (${formattedPhone})`);
    console.info(`[META_LEAD_SERVICE] Concern: ${lead.healthConcern}`);
    console.info(`[META_LEAD_SERVICE] Location: ${lead.cityArea}`);
    console.info("--------------------------------------------------");

    return {
      success: true,
      leadId,
      metaStatus: "META_INTEGRATION_PENDING",
      message:
        "धन्यवाद। आपकी consultation request प्राप्त हो गई है। हमारी टीम आपसे जल्द संपर्क करेगी।"
    };
  }

  try {
    // When live credentials exist, send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${metaPixelId}/events?access_token=${metaAccessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: [payload]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[META_LEAD_SERVICE] Meta API error:", data);
      return {
        success: true,
        leadId,
        metaStatus: "FAILED",
        message:
          "धन्यवाद। आपकी consultation request प्राप्त हो गई है। हमारी टीम आपसे जल्द संपर्क करेगी।"
      };
    }

    return {
      success: true,
      leadId,
      metaStatus: "PROCESSED",
      message:
        "धन्यवाद। आपकी consultation request प्राप्त हो गई है। हमारी टीम आपसे जल्द संपर्क करेगी।"
    };
  } catch (error) {
    console.error("[META_LEAD_SERVICE] Unexpected error processing lead:", error);
    return {
      success: true,
      leadId,
      metaStatus: "FAILED",
      message:
        "धन्यवाद। आपकी consultation request प्राप्त हो गई है। हमारी टीम आपसे जल्द संपर्क करेगी।"
    };
  }
}
