import Home from "./pages/Home";
import About from "./pages/About";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./components/ThemeMode";

//Main Application to route through different pages

function App() {
  //Using ThemeContext to set the theme of page
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className={`Wrapper ${isDarkMode ? "dark" : ""}`}>
      {/*Route all the pages from main page*/}
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/About" exact element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
