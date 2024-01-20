import { useState } from "react";
import logo from "./logo.svg";
import { CustomSVG } from "./SVGlogo";

const MyHeader = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleSearchBar = () => {
    setSearchBarOpen(!isSearchBarOpen);
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all">
        <div className="container mx-auto flex lg:justify-evenly justify-between items-center p-2 sm:p-3 md:p5">
          {/* Logo and Website Name */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img
              src={logo}
              alt="Logo"
              className="md:h-12 md:w-12 sm:h-10 sm:w-10 h-8 w-8 rounded-full border-2 border-white"
            />
            <h1 className="md:text-2xl sm:text-xl text-base font-extrabold text-white">
              Release
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-white hover:text-gray-200">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Services
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Contact
            </a>
          </nav>
          <div className="flex space-x-2">
            {/* Search Button */}
            <div
              className={`bg-white text-blue-500 px-2 rounded-full focus:outline-none focus:shadow-outline-blue justify-center items-center transition-all duration-300 flex`}
            >
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  className={`bg-white transition-all duration-300 md:w-40 lg:w-80 flex focus:outline-none rounded-full py-2 ${
                    isSearchBarOpen ? "w-32" : "w-0"
                  }`}
                  placeholder="Search..."
                />
              </div>
              <button className="relative" onClick={toggleSearchBar}>
                <CustomSVG />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => {
                toggleMobileMenu();
              }}
            >
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu (Hidden by default) */}
      <div
        className={`translate-x-full bg-white fixed inset-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen ? "" : "!translate-x-0"
        }`}
      >
        <div className="flex justify-end p-4">
          <button className="focus:outline-none" onClick={toggleMobileMenu}>
            <svg
              className="h-8 w-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links */}
        <nav className="flex flex-col items-center">
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">
            Contact
          </a>
        </nav>
      </div>
    </>
  );
};

export default MyHeader;
