import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeMode } from "./components/ThemeMode";
import UserDetails from "./components/UserDetails";
import { AlertProvider } from "./components/Alert";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* {Using ThemeMode Component to Wrap the main app} */}
    <ThemeMode>
      <AlertProvider />
      {/* {Using UserDetails Component to ensure user data to be accessible for all parts} */}
      <UserDetails>
        <App />
      </UserDetails>
    </ThemeMode>
  </React.StrictMode>
);

reportWebVitals();
