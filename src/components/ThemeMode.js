/**
 * Code from file ThemeMode.js
 *
 * This code defines a ThemeMode component in React that creates a context to share theme data throughout the app.
 * It detects the user's system color scheme and checks for a preferred theme set in the local storage.
 * The initial theme state is set based on the preferred theme.
 * It also provides a toggle function to switch between dark and light themes, and stores the preference in the local storage for later use.
 */

import { useState, createContext } from "react";

const ThemeContext = createContext();

function ThemeMode({ children }) {
  // Detect user's system color scheme to implement dark theme
  //Check for default browser theme (light|dark) or else set preferred to light
  let prefersDarkMode =
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    false;

  //Check from localstorage if user has set the theme

  if (localStorage.getItem("darkMode") !== null) {
    //The value at localstorage is a string value, to convert it to boolean I used this method
    prefersDarkMode =
      localStorage.getItem("darkMode").toLowerCase() === "false" ? false : true;
  }
  // Set the initial theme state to preferred

  const [isDarkMode, setDarkMode] = useState(prefersDarkMode);

  // Toggle dark mode (Button to toggle themes is in header component)
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    //Set preference in localstorage for later use
    localStorage.setItem("darkMode", !isDarkMode);
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeMode, ThemeContext };
