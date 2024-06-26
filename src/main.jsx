import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TiptapProvider } from "./contexts/tiptap_context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TiptapProvider>
      <App />
    </TiptapProvider>
  </BrowserRouter>,
);
