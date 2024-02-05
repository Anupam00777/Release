import Home from "./pages/Home";
import About from "./pages/About";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./components/ThemeMode";
import Register from "./pages/Register";
import { UserContext } from "./components/UserDetails";
import Settings from "./pages/Settings";
import data from "./components/data";
//Main Application to route through different pages

function App() {
  //Using ThemeContext to set the theme of page
  const { isDarkMode } = useContext(ThemeContext);
  const { loggedIn } = useContext(UserContext);
  return (
    <div
      className={`Wrapper min-h-screen max-h-max flex flex-col dark:bg-gray-950 bg-white ${
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
              <Route
                path="/Settings"
                exact
                element={<Settings settingsObj={data.settingsOptions} />}
              />
            </>
          ) : (
            <>
              <Route path="/" exact element={<Register type={0} />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
