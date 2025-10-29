// const apiKey = "AIzaSyDazlylRMKte4nGiAaooieoj1lMISB4AHg";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "API Key not found. Check your .env file and environment variable name."
  );
}

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

/**
 * Sends a text prompt to the Gemini model and logs the response.
 * @param {string} promptText The user's input/chat message.
 */
async function sendMessage(promptText) {
  if (!apiKey || !promptText) {
    console.log("Cannot send message: Missing API key or prompt text.");
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // Pass the variable holding the chat text here
      contents: promptText,
    });

    // The response text is what you want to display back to the user
    console.log("User Input:", promptText);
    console.log("Gemini Response:", response.text);

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Sorry, I ran into an error generating a response.";
  }
}

export default sendMessage;

// --- Example Usage ---
// To use this in your clone, you would call this function whenever the user
// presses 'Send' or 'Enter' in the chat interface.

// const userChatInput = "What are the three largest planets in our solar system?";
// sendMessage(userChatInput);
