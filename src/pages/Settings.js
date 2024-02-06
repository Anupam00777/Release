/**
 * Thisis the settings page of the application.
 * The component displays a list of settings options based on the provided settings object.
 * It also includes a header with a back button and a dark mode toggle button.
 */

import React, { useContext } from "react";
import { HeadRibbon } from "../components/utilities";
import { ThemeContext } from "../components/ThemeMode";

function Settings({ settingsObj }) {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <>
      <div className="settings min-h-screen dark:bg-primary-dark bg-primary-light text-black dark:text-white">
        <div className="flex flex-col items-center  max-w-[750px] w-full mx-auto h-screen">
          <HeadRibbon title={"Settings"} />
          <div className="flex flex-1 w-full flex-col space-y-1 text-xl sm:text-2xl px-3">
            {settingsObj.map((e) => {
              return (
                <div
                  key={e.key}
                  className="option w-full h-max  dark:bg-primary-dark-900 bg-primary-light-900 border-[1px] rounded-md border-primary-light-500 dark:border-primary-light-100"
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

export default Settings;
