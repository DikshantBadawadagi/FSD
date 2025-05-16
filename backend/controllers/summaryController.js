import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); 

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("FATAL ERROR: GEMINI_API_KEY is not set in the .env file.");
}
const genAI = new GoogleGenerativeAI(apiKey);

const modelConfig = {
  // model: "gemini-1.5-pro-latest", 
  model: "gemini-1.5-flash-latest", 

  safetySettings: [ 
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ],
};


/**
 * @param {Array} messages
 * @returns {Promise<string>} 
 * @throws {Error} 
 */
export const generateSummary = async (messages) => {
  if (!apiKey) {
    throw new Error("AI Service is not configured. Missing API Key.");
  }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new Error("A valid, non-empty messages array is required for summarization.");
  }

  const formattedChat = messages
    .map(
      (msg) =>
        `${msg.sender || 'Unknown Sender'}: ${msg.content || '(empty message)'} [${new Date(msg.timestamp).toLocaleString()}]`
    )
    .join("\n");

  const prompt = `
    You are an expert chat summarizer.
    Below is a chat conversation. Please provide a concise, neutral, and informative summary highlighting:
    - Main topics discussed
    - Key information or facts shared
    - Any decisions made
    - Any actions planned or agreed upon
    
    Focus on the most important elements and present the summary clearly.
    Avoid adding any conversational filler before or after the actual summary.

    CHAT CONVERSATION:
    ${formattedChat}
    
    SUMMARY:
  `;

  try {
    const model = genAI.getGenerativeModel(modelConfig);
    
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],

    });
    
    const response = result.response;

    if (response.promptFeedback && response.promptFeedback.blockReason) {
      console.warn(`AI summary generation blocked. Reason: ${response.promptFeedback.blockReason}`, response.promptFeedback);
      throw new Error(`Summary generation was blocked by the AI: ${response.promptFeedback.blockReason}. Please revise the input.`);
    }
    
    const summaryText = response.text();

    if (!summaryText && response.candidates && response.candidates.length > 0 && response.candidates[0].finishReason !== 'STOP') {
        console.warn("AI summary response has no text, finishReason:", response.candidates[0].finishReason);
        throw new Error(`AI model generation finished unexpectedly: ${response.candidates[0].finishReason}.`);
    }
    
    return summaryText.trim();

  } catch (error) {
    console.error("Error during Gemini API call in generateAISummary:", error);
    if (error.message.startsWith("Summary generation was blocked") || error.message.startsWith("AI model generation finished unexpectedly")) {
        throw error;
    }
    throw new Error("The AI model failed to generate a summary. Please check server logs.");
  }
};