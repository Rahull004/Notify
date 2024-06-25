import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatbotWindow.css"; // Import necessary styles
import SendIcon from "@mui/icons-material/Send";
import { RiRobot2Fill } from "react-icons/ri";

const ChatbotWindow = () => {
  const [messages, setMessages] = useState([
    { text: "Hey there! Have any questions?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [running, setRunning] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    setInputText("");
    if (inputText.trim() === "") return;

    const userMessage = { text: inputText, sender: "user" };
    setMessages([...messages, userMessage]);
    setRunning(true);

    try {
      const response = await axios.post("http://localhost:3000/generate", {
        inputText,
      });
      const botMessage = { text: response.data.generatedText, sender: "bot" };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Error: Could not get a response from the server.",
        sender: "bot",
      };
      setMessages([...messages, userMessage, errorMessage]);
    }
    setRunning(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    const welcomeMessage = {
      text: "Hey there! Have any questions?",
      sender: "bot",
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem("chatMessages");
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const newChat = () => {
    const welcomeMessage = {
      text: "Hey there! Have any questions?",
      sender: "bot",
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <RiRobot2Fill style={{ fontSize: "25px" }} />
          <div className="chatbot-header-side">
            <span className="bot-name">Notify</span>
            {running && (
              <span className="chatbot-header-light">Generating...</span>
            )}
          </div>
        </div>
        <button onClick={newChat}>New Chat</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatbotWindow;
