import React, { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';
import './ChatbotPopup.css'; // Add necessary styles
import AssistantIcon from '@mui/icons-material/Assistant';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { classNames } from '@react-pdf-viewer/core';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen? "show":"hide")

  return (
    <div>
    <div className="chatbot-popup">
      <div className={isOpen?"show":"hide"}>
        
      {isOpen && <ChatbotWindow />} 
      </div>
      <button className="chatbot-toggle h-[60px] w-[60px] flex justify-center items-center" onClick={toggleChatbot}>
         <AssistantIcon className='closed'/>
      </button> 
    </div>
    
    </div>  
  );
};

export default ChatbotPopup;
