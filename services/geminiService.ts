import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY || '';
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const generateDiagnosticReport = async (alertMessage: string, deviceType: string) => {
  try {
    const client = getAiClient();
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are an expert HVAC technician and AI diagnostic agent for "Ambient Twin".
      
      Context: A ${deviceType} located in Toronto has triggered the following alert: "${alertMessage}".
      
      Task: Provide a concise, professional technical resolution plan.
      
      Requirements:
      1. Explain the likely root cause in technical terms.
      2. Recommend specific tools needed for the truck roll.
      3. Estimate the part cost range in CAD.
      4. Keep it under 100 words.
      5. Tone: Enterprise, technical, authoritative.
    `;

    const response = await client.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Diagnostic Service Unavailable. Please proceed with manual inspection protocol ISO-9001.";
  }
};