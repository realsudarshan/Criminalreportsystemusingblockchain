import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { PassageProvider } from "@passageidentity/passage-react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="min-h-screen bg-dark-300 font-poppins antialiased text-white">
      <PassageProvider appId={import.meta.env.VITE_PASSAGE_APP_ID}>
        <App />
      </PassageProvider>
    </div>
  </BrowserRouter>
);
