import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import { OptionsSVG, SearchSVG, XSVG } from "../SVGlogo";

const NavLinks = [
  { sno: 1, title: "Home", href: "/" },
  { sno: 2, title: "Trending", href: "/" },
  { sno: 3, title: "About", href: "/About" },
];

const MyHeader = (props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleSearchBar = () => {
    if (inputValue.trim() === "") setSearchBarOpen(!isSearchBarOpen);
    else initiateSearch(inputValue); //
  };
  const initiateSearch = () => {};
  return (
    <>
      {/* Header Section */}
      <header className=" sticky bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all">
        <div className="container mx-auto flex lg:justify-evenly justify-between items-center p-2 sm:p-3 md:p5">
          {/* Logo and Website Name */}
          <Banner title="Release" href={"/"} />
          {/* Navigation Links */}
          <NavBar />
          <div className="flex space-x-2">
            {/* Search Button */}
            <SearchBar
              toggleSearchBar={toggleSearchBar}
              isSearchBarOpen={isSearchBarOpen}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
            {/* Mobile Menu Button */}
            <SideBarIcon onClick={toggleMobileMenu} />
          </div>
        </div>
      </header>
      <HiddenSideBar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
    </>
  );
};

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
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white">
        {title}
      </h1>
    </Link>
  );
};

const NavBar = () => {
  const elements = NavLinks.map((e) => {
    return (
      <Link to={e.href} key={e.sno} className="text-white hover:text-gray-200">
        {e.title}
      </Link>
    );
  });
  return <nav className="hidden md:flex space-x-4">{elements}</nav>;
};

const SearchBar = (props) => {
  return (
    <div
      className={`bg-white text-blue-500 px-2 rounded-full focus:outline-none focus:shadow-outline-blue justify-center items-center flex`}
    >
      <div
        className={`flex justify-center items-center rounded-full transition-all duration-300 md:w-40 lg:w-80 ${
          props.isSearchBarOpen ? "w-32" : "w-0 px-0"
        }`}
      >
        <input
          type="text"
          className={`bg-white flex outline-0 rounded-full h-full w-full px-2`}
          placeholder="Search..."
          value={props.inputValue}
          onChange={(e) => {
            props.setInputValue(e.target.value);
          }}
        />
      </div>
      <button className="relative" onClick={props.toggleSearchBar}>
        <SearchSVG />
      </button>
    </div>
  );
};

const SideBarIcon = ({ onClick }) => {
  return (
    <>
      <button className="md:hidden focus:outline-none" onClick={onClick}>
        <OptionsSVG />
      </button>
    </>
  );
};
const HiddenSideBar = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const elements = NavLinks.map((e) => {
    return (
      <Link
        to={e.href}
        key={e.sno}
        className="text-gray-600 hover:text-gray-800 py-2"
      >
        {e.title}
      </Link>
    );
  });
  return (
    <div
      className={`fixed top-0 right-0 bg-white z-50 transition-all duration-500 w-1/2 ${
        isMobileMenuOpen ? "" : " !translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button className="focus:outline-none" onClick={toggleMobileMenu}>
          <XSVG />
        </button>
      </div>

      {/* Mobile Menu Links */}
      <nav className="flex flex-col items-center">{elements}</nav>
    </div>
  );
};
export default MyHeader;
