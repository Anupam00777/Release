import Home from "./pages/Home";
import About from "./pages/About";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./components/ThemeMode";
import Login from "./pages/Login";
import CookieHandler from "./components/CookieHandler";

//Main Application to route through different pages

function App() {
  //Using ThemeContext to set the theme of page
  const { isDarkMode } = useContext(ThemeContext);
  const [loggedIn, setLoggedIn] = useState(false);
  //Creating a Cookies context to allow lower elements to access values
  const Cookies = new CookieHandler();
  const checkLogin = async (callback = null) => {
    // Asynchronously sending data to server
    try {
      const res = await fetch("http://localhost:3001/auto_login", {
        method: "POST",
        credentials: "include",
      });
      let data = await res.json();
      data = JSON.parse(data);
      setLoggedIn(data.loggedIn);
      console.log(data.loggedIn);
      if (callback) callback(data.loggedIn);
      else return data.loggedIn;
    } catch (error) {
      console.error("Error Logging In:", error);
    }
  };
  const LoginContext = createContext({ cookies: Cookies, checkLogin });

  //If the Hash expired, then clear cookies data
  if (!Cookies.exists("hashtoken")) {
    Cookies.clearAll();
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <LoginContext.Provider value={{ cookies: Cookies, checkLogin }}>
      <div
        className={`Wrapper min-h-screen max-h-max ${
          isDarkMode ? "dark" : ""
        } font-abel `}
      >
        {/*Route all the pages from main page*/}
        <Router>
          <Routes>
            {loggedIn ? (
              <>
                <Route path="/" exact element={<Home />} />
                <Route path="/About" exact element={<About />} />
              </>
            ) : (
              <Route path="/" exact element={<Login />} />
            )}
          </Routes>
        </Router>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
