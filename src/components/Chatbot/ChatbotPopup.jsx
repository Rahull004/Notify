/* This code snippet is a React component called `ChatbotPopup`. Here's a breakdown of what it does: */
import React, { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";
import "./ChatbotPopup.css"; // Add necessary styles
import AssistantIcon from "@mui/icons-material/Assistant";
import CloseIcon from "@mui/icons-material/Close";

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="chatbot-popup">
        <div className={isOpen ? "show" : "hide"}>
          {isOpen && <ChatbotWindow />}
        </div>
        <button
          className="chatbot-toggle h-[60px] w-[60px] flex justify-center items-center"
          onClick={toggleChatbot}
        >
          {isOpen ? (
            <CloseIcon className="open" />
          ) : (
            <AssistantIcon className="closed" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatbotPopup;
