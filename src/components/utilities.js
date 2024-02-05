/**
 * This file contains utility functions for a React application.
 */

import React, { useState } from "react";
import * as Svg from "./SVGlogo";
import { Link } from "react-router-dom";
import { TECollapse } from "tw-elements-react";

/**
 * BUTTON component represents a button element with customizable properties.
 *
 * @param {string} type - The type of the button (default: "submit").
 * @param {string} title - The title of the button (default: "Button").
 * @param {string} extraClass - Additional CSS classes for the button.
 * @param {function} onClick - The onClick event handler for the button.
 * @returns {JSX.Element} - The rendered button component.
 */
export const BUTTON = ({
  type = "submit",
  title = "Button",
  extraClass = "",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center dark:focus:ring-red-800 ${extraClass}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

/**
 * DarkModeBtn component represents a button for toggling dark mode.
 *
 * @param {boolean} isDarkMode - Current dark mode state.
 * @param {function} toggleDarkMode - Function to toggle dark mode.
 * @returns {JSX.Element} - The rendered dark mode button component.
 */
export const DarkModeBtn = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center justify-center ">
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

/**
 * ToggleOption component represents an option with a toggle switch.
 *
 * @param {string} title - The title of the option.
 * @param {Object} toggleprops - Props for the toggle switch.
 * @returns {JSX.Element} - The rendered toggle option component.
 */
export const ToggleOption = ({ title = "Option", ...toggleprops }) => {
  return (
    <div className="w-full flex py-3 px-5 items-center justify-between">
      <div className="text-xl sm:text-2xl mx-2 font-hind">{title}</div>
      <ToggleButton {...toggleprops} />
    </div>
  );
};

/**
 * LinkOption component represents an option with a link.
 *
 * @param {string} title - The title of the link.
 * @param {Object} props - Props for the link.
 * @returns {JSX.Element} - The rendered link option component.
 */
export const LinkOption = ({ title = "Link", ...props }) => {
  return (
    <div className="w-full py-3 px-5 flex items-center justify-between">
      <div className="font-hind">
        <Link {...props}>{title}</Link>
      </div>
    </div>
  );
};

/**
 * DropdownOption component represents an option with a dropdown menu.
 *
 * @param {string} title - The title of the dropdown option.
 * @param {Array} elements - The elements to be shown in the dropdown menu.
 * @returns {JSX.Element} - The rendered dropdown option component.
 */
export const DropdownOption = ({ title = "Drop Down", elements }) => {
  const [activeElement, setActiveElement] = useState("");

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  return (
    <div className="w-full ">
      <h2 className="mb-0 py-3 px-5" id="headingOne">
        <button
          className={`${
            activeElement === "element1" && `text-black  dark:!text-white`
          } group relative flex w-full items-center rounded-t-[15px] [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none font-spaceGrotesk`}
          type="button"
          onClick={() => handleClick("element1")}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          {title}
          <span
            className={`${
              activeElement === "element1"
                ? `rotate-[-180deg] -mr-1`
                : `rotate-0 fill-[#212529]  dark:fill-white`
            } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </button>
      </h2>
      <TECollapse
        show={activeElement === "element1"}
        className="!mt-0 !rounded-b-none !duration-500"
      >
        <div className="">{elements}</div>
      </TECollapse>
    </div>
  );
};

/**
 * ToggleButton component represents a toggle switch button.
 *
 * @param {boolean} checked - The initial checked state of the switch (default: true).
 * @param {function} onClick - The onClick event handler for the switch.
 * @returns {JSX.Element} - The rendered toggle button component.
 */
export const ToggleButton = ({ checked = true, onClick }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
    </label>
  );
};
