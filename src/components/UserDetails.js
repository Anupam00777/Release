//Handling user queries on client and synchronising them to server
import React, { createContext, useEffect, useState } from "react";
import CookieHandler from "./CookieHandler";
import { SendUserData, checkLogin } from "./RequestHandler";
import { toggleAlert } from "./Alert";
import serverPaths from "./manifest.json";

export const UserContext = createContext();

//Creating a Cookies context to allow lower elements to access values
const Cookies = new CookieHandler();
export default function UserDetails({ children }) {
  const [loggedIn, setLoggedIn] = useState(Cookies.get("loggedIn"));
  const [hashtoken, updateHash] = useState();

  useEffect(() => {
    //Check for user login status and attempting auto login
    const updateLoginStatus = async () => {
      if (!Cookies.exists("loggedIn")) return;
      if (!Cookies.get("loggedIn")) {
        if (Cookies.exists("hashtoken")) Cookies.remove("hashtoken");
      }
      // Asynchronously sending data to server
      try {
        const login = await checkLogin((data) => {
          setLoggedIn(data.loggedIn);
          updateHash(Cookies.get("hashtoken"));
          return data;
        });

        if (login.type)
          toggleAlert(login.type, login.message, login.time || 2000);
      } catch (error) {
        toggleAlert("error", "Error trying to connect to server.", 3000);
        console.error(error);
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

export const UserLogOut = () => {
  Cookies.remove("hashtoken");
  Cookies.remove("loggedIn");
  window.location = "/";
};

export const UserLogin = (user) => {
  try {
    SendUserData(user, serverPaths.userLogin, async (res) => {
      const data = await res;
      const json = await data.json();

      if (json) {
        toggleAlert(json.type, json.message, json.time || 2000);
        if (json.type === "success")
          setTimeout(() => {
            window.location = "/";
          }, 2000);
      } else return false;
    });
  } catch (error) {
    toggleAlert("error", "Error: Cannot Login");
  }
};

export const UserSignup = (user) => {
  try {
    SendUserData(user, serverPaths.userSignup, async (res) => {
      const json = await res.json();
      if (json) {
        toggleAlert(json.type, json.message, json.time || 2000);
        if (json.type === "success")
          setTimeout(() => {
            window.location = "/";
          }, 2000);
      } else return false;
    });
  } catch (error) {
    toggleAlert("error", "Error: Cannot SignUp");
  }
};
