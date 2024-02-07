/**
 * Code from file ThemeMode.js
 *
 * This code defines a ThemeMode component in React that creates a context to share theme data throughout the app.
 * It detects the user's system color scheme and checks for a preferred theme set in the local storage.
 * The initial theme state is set based on the preferred theme.
 * It also provides a toggle function to switch between dark and light themes, and stores the preference in the local storage for later use.
 */

import { useState, createContext } from "react";

// Create a context to share theme data throughout the app
const ThemeContext = createContext();

/**
 * ThemeMode component to manage the theme of the application.
 * @param {ReactNode} children - The children components wrapped by the ThemeMode component.
 * @returns {JSX.Element} - Returns JSX for the ThemeMode component.
 */
function ThemeMode({ children }) {
  // Detect user's system color scheme to implement dark theme
  // Check for default browser theme (light|dark) or else set preferred to light
  let prefersDarkMode =
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) ||
    false;

  // Check from local storage if user has set the theme
  if (localStorage.getItem("darkMode") !== null) {
    // The value at local storage is a string value, to convert it to boolean
    prefersDarkMode =
      localStorage.getItem("darkMode").toLowerCase() === "false" ? false : true;
  }

  // Set the initial theme state to preferred
  const [isDarkMode, setDarkMode] = useState(prefersDarkMode);

  /**
   * Function to toggle between dark and light themes.
   * Sets the theme mode and updates the preference in local storage.
   */
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    // Set preference in local storage for later use
    localStorage.setItem("darkMode", !isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Export ThemeMode component and ThemeContext context
export { ThemeMode, ThemeContext };
