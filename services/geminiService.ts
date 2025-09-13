
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const verifyImageWithGemini = async (base64Image: string, prompt: string): Promise<boolean> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };

    const textPart = {
      text: prompt,
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    const resultText = response.text.trim().toUpperCase();

    return resultText === 'YES';

  } catch (error) {
    console.error("Error verifying image with Gemini:", error);
    // In case of an API error, we can decide whether to fail open or closed.
    // For this game, failing closed (returning false) is safer.
    return false;
  }
};
