/**
 * Handles user details on the client and synchronizes them to the server.
 * Manages user login, logout, signup, and authentication status.
 */

import React, { createContext, useEffect, useState } from "react";
import CookieHandler from "./CookieHandler";
import { checkLogin, handleServerError } from "./RequestHandler";
import { toggleAlert } from "./Alert";
// Create a context to share user data throughout the app
export const UserContext = createContext();

// Initialize a new CookieHandler instance
const Cookies = new CookieHandler();

/**
 * UserDetails component manages user login, logout, and authentication status.
 * @param {ReactNode} children - The children components wrapped by the UserDetails component.
 * @returns {JSX.Element} - Returns JSX for the UserDetails component.
 */
export default function UserDetails({ children }) {
  // State variables to manage user login and hash token
  const [loggedIn, setLoggedIn] = useState(Cookies.get("loggedIn"));
  const [hashtoken, updateHash] = useState();

  useEffect(() => {
    // Check for user login status and attempt auto login
    const updateLoginStatus = async () => {
      if (!Cookies.exists("loggedIn")) return;
      if (!Cookies.get("loggedIn")) {
        if (Cookies.exists("hashtoken")) Cookies.remove("hashtoken");
      }
      try {
        // Asynchronously send data to server for login status check
        const login = await checkLogin((data) => {
          setLoggedIn(data.loggedIn);
          updateHash(Cookies.get("hashtoken"));
          return data;
        });

        // Show alert based on server response
        if (login.type)
          toggleAlert(login.type, login.message, login.time || 2000);
      } catch (error) {
        handleServerError(error);
      }
    };

    updateLoginStatus();
  }, []);

  return (
    <UserContext.Provider value={{ Cookies, loggedIn, hashtoken, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
/**
 * UserLogOut function to handle user logout.
 * Removes user hash token, authentication status, and redirects to the homepage.
 */
export const UserLogOut = () => {
  Cookies.remove("hashtoken");
  Cookies.remove("loggedIn");
  setTimeout(() => {
    window.location = "/";
  }, 0);
};
