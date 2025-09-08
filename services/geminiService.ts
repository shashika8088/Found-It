import { GoogleGenAI, Type } from "@google/genai";
import { Item } from "../types";

// FIX: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY.
// The environment is assumed to be configured correctly, so manual checks are not needed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
};

export const generateItemDetailsFromImage = async (base64Image: string, mimeType: string): Promise<{ title: string; description: string; category: string; }> => {
  // FIX: Removed redundant API key check as per guidelines.
  try {
    const imagePart = fileToGenerativePart(base64Image, mimeType);
    const textPart = {
      text: `Analyze this image from a lost and found context. Provide a concise title, a brief but helpful description, and a single-word category (e.g., Electronics, Apparel, Keys, Bag, Bottle, Other).`
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING }
          }
        }
      }
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error generating item details from image:", error);
    throw new Error("Could not analyze image. Please enter details manually.");
  }
};

export const findMatchingItems = async (query: string, items: Item[]): Promise<string[]> => {
  // FIX: Removed redundant API key check as per guidelines.
  try {
    const simplifiedItems = items.map(({ id, title, description, category, location }) => ({ id, title, description, category, location }));

    const prompt = `You are a smart search engine for a lost and found application. A user is searching for an item. The user's query is: "${query}". Here is a list of available items in JSON format: ${JSON.stringify(simplifiedItems)}. Compare the user's query to the title, description, category, and location of each item. Return a JSON object with a single key, "matching_ids", which is an array of the "id" strings of the most relevant items. Only include items that are a strong match. If no items are a good match, return an empty array.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matching_ids: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.matching_ids || [];

  } catch (error) {
    console.error("Error finding matching items:", error);
    throw new Error("Failed to perform search. Please try again.");
  }
};