import { NextRequest, NextResponse } from "next/server";
import { LeadFormData } from "@/lib/types";
import { processMetaLead } from "@/services/metaLeads";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<LeadFormData>;

    const errors: Record<string, string> = {};

    // 1. Full Name Validation
    if (!body.fullName || body.fullName.trim().length < 2) {
      errors.fullName = "कृपया अपना पूरा नाम दर्ज करें (कम से कम 2 अक्षर)।";
    }

    // 2. Indian Mobile Number Validation
    // Accepts formats: 9876543210, +919876543210, 09876543210, 919876543210
    const rawMobile = body.mobileNumber?.trim() || "";
    const cleanMobile = rawMobile.replace(/[\s\-()]/g, "").replace(/^(\+91|0)/, "");
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!cleanMobile) {
      errors.mobileNumber = "कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें।";
    } else if (!indianPhoneRegex.test(cleanMobile)) {
      errors.mobileNumber = "कृपया वैध 10-अंकीय भारतीय मोबाइल नंबर दर्ज करें (6-9 से शुरू होने वाला)।";
    }

    // 3. Health Concern
    if (!body.healthConcern || body.healthConcern.trim().length === 0) {
      errors.healthConcern = "कृपया अपनी स्वास्थ्य समस्या या परामर्श का विषय चुनें।";
    }

    // 4. City / Area
    if (!body.cityArea || body.cityArea.trim().length === 0) {
      errors.cityArea = "कृपया अपना क्षेत्र या शहर चुनें।";
    }

    // 5. Preferred Consultation Time
    if (!body.preferredTime || body.preferredTime.trim().length === 0) {
      errors.preferredTime = "कृपया परामर्श का पसंदीदा समय चुनें।";
    }

    // If any validation errors exist, return 400
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "कृपया फॉर्म में सही जानकारी भरें।",
          errors
        },
        { status: 400 }
      );
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const sanitizedLead: LeadFormData = {
      fullName: body.fullName!.trim(),
      mobileNumber: cleanMobile,
      age: body.age?.trim() || "",
      cityArea: body.cityArea!.trim(),
      healthConcern: body.healthConcern!.trim(),
      preferredTime: body.preferredTime!.trim(),
      message: body.message?.trim() || ""
    };

    const response = await processMetaLead(sanitizedLead, {
      ip: clientIp,
      userAgent
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[API_LEADS_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "तकनीकी समस्या के कारण अनुरोध पूरा नहीं हो सका। कृपया पुनः प्रयास करें या सीधे कॉल करें।"
      },
      { status: 500 }
    );
  }
}
