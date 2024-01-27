/**
 * This is a React component for the Header section of the website.
 * It includes a logo, Search Bar, navigation links, and on mobile screens - A slider to access the navigation links.
 */

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import * as Svg from "../SVGlogo";
import { ThemeContext } from "./ThemeMode";

// Navigation links
const NavLinks = [
  { sno: 1, title: "Home", href: "/", onClick: "" },
  { sno: 2, title: "Trending", href: "/", onClick: "" },
  { sno: 3, title: "About", href: "/About", onClick: "" },
];

// Header component
const MyHeader = () => {
  // Getting Theme context for theme change button

  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  //States for needed variables
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //Functions to toggle the above States
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  //In mobile mode, serach bar will only contract if there is no Text inside
  const toggleSearchBar = () => {
    if (inputValue.trim() === "") {
      setSearchBarOpen(!isSearchBarOpen);
    } else {
      initiateSearch(inputValue);
    }
  };

  //Logic for Search Button
  const initiateSearch = () => {};

  return (
    <>
      {/* Header Section */}

      <header className="sticky dark:bg-black bg-white shadow-lg transition-all">
        <div className="mx-auto container flex lg:justify-evenly justify-between items-center p-3 sm:p-4 md:p-5">
          {/* Logo and Website Name */}

          <Banner title="Release" href={"/"} />

          <div className="flex space-x-2">
            {/* Search Button */}

            <SearchBar
              toggleSearchBar={toggleSearchBar}
              isSearchBarOpen={isSearchBarOpen}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />

            {/* {Dark-Light Mode Toggle Button} */}

            <DarkModeBtn
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />

            {/* Mobile Menu Button */}

            <SideBarIcon onClick={toggleMobileMenu} />
          </div>

          {/* Navigation Links */}

          <NavBar />
        </div>
      </header>

      {/* Hidden Side Bar */}

      <HiddenSideBar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </>
  );
};

// Banner component
const Banner = ({ title, href }) => {
  return (
    <Link
      to={href}
      className="flex items-center space-x-2 sm:space-x-4 cursor-pointer"
    >
      <img
        src={logo}
        alt={title}
        className="md:h-12 md:w-12 sm:h-10 sm:w-10 h-8 w-8 rounded-full border-2 border-white"
      />
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-red-500">
        {title}
      </h1>
    </Link>
  );
};

// NavBar component
const NavBar = () => {
  //Mapping all the elements of Navlinks to a Link for routing
  const elements = NavLinks.map((e) => {
    return (
      <Link
        to={e.href}
        key={e.sno}
        onClick={e.onClick}
        className="text-red-500 dark:hover:text-gray-200 hover:text-black text-lg"
      >
        {e.title}
      </Link>
    );
  });

  return <nav className="hidden md:flex space-x-8">{elements}</nav>;
};

// SearchBar component
const SearchBar = (props) => {
  return (
    <div
      className={`dark:bg-white dark:text-red-500 bg-red-500 text-white px-2 rounded-full focus:outline-none focus:shadow-outline-blue justify-center items-center flex`}
    >
      {/* {Making search bar contractable in mobile screens} */}
      <div
        className={`flex justify-center items-center rounded-full transition-all duration-300 md:w-40 lg:w-80 ${
          props.isSearchBarOpen ? "w-32" : "w-0 px-0"
        }`}
      >
        <input
          type="text"
          className={`bg-inherit flex outline-0 rounded-full w-full px-2 dark:placeholder:text-red-500 placeholder:text-white`}
          placeholder="Search..."
          value={props.inputValue}
          onChange={(e) => {
            props.setInputValue(e.target.value);
          }}
        />
      </div>
      <button className="relative" onClick={props.toggleSearchBar}>
        <Svg.SearchSVG />
      </button>
    </div>
  );
};

// SideBarIcon component
const SideBarIcon = ({ onClick }) => {
  return (
    <>
      <button className="md:hidden focus:outline-none" onClick={onClick}>
        <Svg.OptionsSVG />
      </button>
    </>
  );
};

// HiddenSideBar component
const HiddenSideBar = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  //Similar as NavBar
  const elements = NavLinks.map((e) => {
    return (
      <Link
        to={e.href}
        key={e.sno}
        onClick={e.onClick}
        className="text-red-500 dark:hover:text-gray-200 hover:text-black text-lg py-3"
      >
        {e.title}
      </Link>
    );
  });

  return (
    <>
      <div
        className={`z-40 absolute top-0 left-0 h-[100vh] w-[100vw] transition-all duration-500 ${
          isMobileMenuOpen ? "!backdrop-blur-sm" : "hidden "
        }`}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 transition-all duration-500 w-1/2 ${
          isMobileMenuOpen ? "" : "!translate-x-full "
        }`}
      >
        <div className="flex justify-end p-4">
          <button className="focus:outline-none" onClick={toggleMobileMenu}>
            <Svg.XSVG />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <nav className="flex flex-col items-center">{elements}</nav>
      </div>
    </>
  );
};

//Darkmode button component
const DarkModeBtn = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleDarkMode}
        id="theme-toggle"
        type="button"
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm "
      >
        {!isDarkMode ? <Svg.MoonSVG /> : <Svg.SunSVG />}
      </button>
    </div>
  );
};

export default MyHeader;
