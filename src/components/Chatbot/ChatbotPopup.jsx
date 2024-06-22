import React, { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';
import './ChatbotPopup.css'; // Add necessary styles

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-popup">
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? 'Close Chatbot' : 'Open Chatbot'}
      </button>
      {isOpen && <ChatbotWindow />}
    </div>
  );
};

export default ChatbotPopup;
