import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="min-h-screen bg-dark-300 font-poppins antialiased text-white">
      <App />
    </div>
  </BrowserRouter>
);
