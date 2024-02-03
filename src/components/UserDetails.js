import React, { createContext, useEffect, useState } from "react";
import CookieHandler from "./CookieHandler";
import { checkLogin } from "./RequestHandler";

export const UserContext = createContext();

export default function UserDetails({ children }) {
  const Cookies = new CookieHandler();
  const [loggedIn, setLoggedIn] = useState();
  const [hashtoken, updateHash] = useState();
  //Creating a Cookies context to allow lower elements to access values

  useEffect(() => {
    if (!Cookies.exists("hashtoken")) {
      Cookies.set("loggedIn", false);
    }
    const updateLoginStatus = async () => {
      // Asynchronously sending data to server
      try {
        await checkLogin((data) => {
          console.log(data);
          setLoggedIn(data.loggedIn);
        });
      } catch (error) {
        console.error("Error Logging In:", error);
      }
      //If the Hash expired, then clear cookies data
    };
    updateLoginStatus();
  }, []);

  return (
    <UserContext.Provider value={{ Cookies, loggedIn, hashtoken, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
