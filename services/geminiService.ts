import { GoogleGenAI, Type } from "@google/genai";
import { PostalRecord } from "../types";

export const fetchPincodeInfoWithAI = async (query: string): Promise<PostalRecord[]> => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing.");
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Find the postal code details for: "${query}" in Pakistan.
      If the user asks for a city, provide the main GPO or popular areas.
      Return a list of up to 5 relevant records.
      Ensure 'province' matches standard Pakistan provinces (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad, Gilgit-Baltistan, Azad Kashmir).
      Set 'country' to 'Pakistan'.
      Guess 'deliveryStatus' based on if it's a main city (Delivery) or remote (Non-Delivery) if unsure, default to Delivery.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              pincode: { type: Type.STRING },
              officeName: { type: Type.STRING },
              city: { type: Type.STRING },
              district: { type: Type.STRING },
              province: { type: Type.STRING },
              deliveryStatus: { type: Type.STRING, enum: ["Delivery", "Non-Delivery"] },
              country: { type: Type.STRING },
            },
            required: ["pincode", "officeName", "city", "province", "country"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const rawData = JSON.parse(jsonText);
    
    // Map to PostalRecord adding generic IDs
    return rawData.map((item: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      pincode: item.pincode,
      officeName: item.officeName,
      city: item.city,
      district: item.district || item.city, // Fallback
      province: item.province,
      deliveryStatus: item.deliveryStatus as 'Delivery' | 'Non-Delivery',
      country: item.country
    }));

  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};
