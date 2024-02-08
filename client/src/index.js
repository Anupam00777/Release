import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeMode } from "./components/ThemeMode";
import UserDetails from "./components/UserDetails";
import { AlertProvider } from "./components/Alert";

// Create a root for rendering the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application within a React StrictMode
root.render(
  <React.StrictMode>
    {/* Use ThemeMode Component to Wrap the main app */}
    <ThemeMode>
      <AlertProvider />
      {/* Use UserDetails Component to ensure user data accessibility for all parts */}
      <UserDetails>
        <App />
      </UserDetails>
    </ThemeMode>
  </React.StrictMode>
);

// Report web vitals
reportWebVitals();
