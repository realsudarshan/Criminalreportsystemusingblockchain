import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="min-h-screen bg-dark-300 font-poppins antialiased text-white">
      <Auth0Provider
        domain="dev-osoxd3sw3grgmsey.us.auth0.com"
        clientId="V9MEmafBsgySyP3F47UGgb8nQUFGpwFO"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </div>
  </BrowserRouter>
);
