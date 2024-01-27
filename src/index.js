import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeMode } from "./components/ThemeMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* {Using ThemeMode Component to Wrap the main app} */}
    <ThemeMode>
      <App />
    </ThemeMode>
  </React.StrictMode>
);

reportWebVitals();
