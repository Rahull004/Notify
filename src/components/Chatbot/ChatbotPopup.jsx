import React, { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';
import './ChatbotPopup.css'; // Add necessary styles
import AssistantIcon from '@mui/icons-material/Assistant';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-popup">
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? <ExpandMoreIcon className='open'/> : ( <><AssistantIcon className='close'/>  Skribbl! </>)} 
      </button>
      {isOpen && <ChatbotWindow />}
    </div>
  );
};

export default ChatbotPopup;
