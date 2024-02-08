import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./components/ThemeMode";
import Register from "./pages/Register";
import { UserContext } from "./components/UserDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";
import data from "./components/data";
import MyProfile from "./pages/Profile";

// Main Application to route through different pages
function App() {
  // Using ThemeContext to set the theme of the page
  const { isDarkMode } = useContext(ThemeContext);
  const { loggedIn } = useContext(UserContext);

  return (
    <div
      className={`Wrapper min-h-screen max-h-max flex flex-col dark:bg-gray-950 bg-white ${
        isDarkMode ? "dark" : ""
      } font-abel`}
    >
      {/* Route all the pages from the main page */}
      <Router>
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route
                path="/settings"
                element={<Settings settingsObj={data.settingsOptions} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Register type={0} />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
