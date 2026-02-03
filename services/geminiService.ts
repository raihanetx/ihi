
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImage = async (base64Data: string, mimeType: string): Promise<AIAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: base64Data.split(',')[1] || base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: "Analyze this portrait image. Provide a creative title, a poetic one-sentence description, and 5 metadata tags. Return in pure JSON.",
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "description", "tags"],
        },
      },
    });

    const resultText = response.text || '{}';
    return JSON.parse(resultText) as AIAnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      title: "Unnamed Portrait",
      description: "A moment captured in silence.",
      tags: ["Archive"],
    };
  }
};
