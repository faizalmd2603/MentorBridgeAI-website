import { GoogleGenAI } from "@google/genai";
import { AppMode, ChatMessage, Language } from "../types";
import { SYSTEM_INSTRUCTION_BASE } from "../constants";

// Ideally, in a real app, backend proxies this. For this demo, we use env var directly.
// Ensure your build process or environment has process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIResponse = async (
  history: ChatMessage[],
  newMessage: string,
  mode: AppMode,
  language: Language
): Promise<string> => {
  try {
    const systemInstruction = `
      ${SYSTEM_INSTRUCTION_BASE}
      
      CURRENT CONTEXT:
      Mode: ${mode}
      Selected Language: ${language === 'ta' ? 'Tamil (தமிழ்)' : 'English'}
      
      Instruction for this turn:
      If mode is TYPING_COACH, give short, encouraging feedback on their stats if provided.
      If mode is TALLY_COACH, act as an accounting tutor.
      If mode is INTERVIEW_SIM, maintain the persona of a professional HR recruiter.
    `;

    // Convert internal chat history format to Gemini API format
    // We limit history to last 10 turns to save tokens and keep context fresh
    const chatHistory = history.slice(-10).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // For 2.5 Flash which is fast and free-tier eligible
    const modelId = 'gemini-2.5-flash';

    // We can't pass systemInstruction directly in chat history for this SDK usually, 
    // but we can prepend it to the first message or use the systemInstruction config if available.
    // The @google/genai SDK supports systemInstruction in config.

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Balanced creativity
      },
      history: chatHistory as any, // Cast to avoid strict type mismatch if SDK types vary slightly
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I apologize, I couldn't generate a response. Please try again.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ta' 
      ? "மன்னிக்கவும், தொழில்நுட்ப கோளாறு ஏற்பட்டுள்ளது. சிறிது நேரம் கழித்து முயற்சிக்கவும்." 
      : "Sorry, I encountered an error. Please check your connection and try again.";
  }
};
