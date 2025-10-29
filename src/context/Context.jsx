import { createContext, useState } from "react";
import sendMessage from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await sendMessage(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await sendMessage(input);
    }

    // --- Start: Robust Markdown to HTML Conversion ---
    let formattedResponse = response;

    // 1. Bold: **text** -> <b>text</b>
    formattedResponse = formattedResponse.replace(
      /\*\*(.*?)\*\*/g,
      "<b>$1</b>"
    );

    // 2. Headings: ## Heading -> <h2>Heading</h2> (using multiline flag)
    formattedResponse = formattedResponse.replace(
      /^###\s*(.*)$/gm,
      "<h3>$1</h3>"
    );
    formattedResponse = formattedResponse.replace(
      /^##\s*(.*)$/gm,
      "<h2>$1</h2>"
    );

    // 3. Lists: \n* item -> <br>• item (Simple visual list simulation)
    formattedResponse = formattedResponse.replace(/\n\*\s*/g, "<br>• ");

    // 4. Newlines: convert remaining single \n to <br> for proper breaks
    formattedResponse = formattedResponse.replace(/\n/g, "<br>");
    // --- End: Robust Markdown to HTML Conversion ---

    // --- Start: Typewriter Effect Implementation ---
    // Extract plain text for the typewriter speed (removes HTML tags temporarily)
    const plainTextForTyping = formattedResponse.replace(/<[^>]*>/g, "");
    const plainTextArray = plainTextForTyping.split(" ");

    setResultData(""); // Reset for typewriter effect

    const finalWordIndex = plainTextArray.length - 1;

    for (let i = 0; i < plainTextArray.length; i++) {
      const nextWord = plainTextArray[i];

      setTimeout(() => {
        // Update the result word-by-word (as plain text)
        setResultData((prev) => prev + nextWord + " ");

        if (i === finalWordIndex) {
          // On the very last word, set the final, fully structured HTML
          setResultData(formattedResponse);
          setLoading(false);
          setInput("");
        }
      }, 75 * i);
    }

    if (plainTextArray.length === 0) {
      setLoading(false);
      setInput("");
    }
    // --- End: Typewriter Effect Implementation ---
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
