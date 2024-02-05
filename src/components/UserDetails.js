//Handling user queries on client and synchronising them to server
import React, { createContext, useContext, useEffect, useState } from "react";
import CookieHandler from "./CookieHandler";
import { checkLogin } from "./RequestHandler";
import { AlertContext } from "./Alert";

export const UserContext = createContext();

//Creating a Cookies context to allow lower elements to access values
const Cookies = new CookieHandler();
export default function UserDetails({ children }) {
  const [loggedIn, setLoggedIn] = useState(Cookies.get("loggedIn"));
  const [hashtoken, updateHash] = useState();

  const toggleAlert = useContext(AlertContext);

  useEffect(() => {
    //Check for user login status and attempting auto login
    const updateLoginStatus = async () => {
      if (!Cookies.get("loggedIn")) {
        if (Cookies.exists("hashtoken")) Cookies.remove("hashtoken");
      }
      // Asynchronously sending data to server
      try {
        const login = await checkLogin((data) => {
          setLoggedIn(data.loggedIn);
        });
        if (login.error)
          toggleAlert("error", "Error trying to connect to server.", 5000);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    //If the Hash expired, then clear cookies data
    updateLoginStatus();
  }, []);
  return (
    <UserContext.Provider value={{ Cookies, loggedIn, hashtoken, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

//Logout the user form the app
export const UserLogOut = () => {
  Cookies.remove("hashtoken");
  Cookies.set("loggedIn", false);
  window.location = "/";
};
