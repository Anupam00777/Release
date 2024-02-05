/**
 * Thisis the settings page of the application.
 * The component displays a list of settings options based on the provided settings object.
 * It also includes a header with a back button and a dark mode toggle button.
 */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeBtn } from "../components/utilities";
import { ThemeContext } from "../components/ThemeMode";
import { BackSVG } from "../components/SVGlogo";

function Settings({ settingsObj }) {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <>
      <div className="settings min-h-screen dark:bg-black bg-white text-black dark:text-white">
        <div className="flex flex-col items-center  max-w-[750px] w-full mx-auto h-screen">
          <Head toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <div className="flex flex-1 w-full flex-col space-y-1 text-xl sm:text-2xl px-3">
            {settingsObj.map((e) => {
              return (
                <div
                  key={e.key}
                  className="option w-full h-max  dark:bg-gray-900 bg-gray-100 border-[1px] rounded-md border-gray-300 dark:border-gray-950"
                >
                  {e.element}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const Head = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="w-full border-gray-300 dark:border-gray-700 flex p-2 sm:p-4 text-lg sm:text-xl xl:text-2xl font-poppins justify-between sticky border-b my-2">
      <div className="flex  space-x-2 ">
        <Link to={"/"} className="flex items-center">
          <BackSVG />
        </Link>
        <h1>Settings</h1>
      </div>
      <div className="">
        <DarkModeBtn isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
};

export default Settings;
