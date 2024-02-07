import React from "react";
import { HeadRibbon } from "../components/utilities";

/**
 * Settings page of the application.
 * Displays a list of settings options based on the provided settings object.
 * Includes a header with a back button and a dark mode toggle button.
 * @param {Object[]} settingsObj - Array of settings options.
 * @returns {JSX.Element} Settings page component.
 */
function Settings({ settingsObj }) {
  return (
    <>
      <div className="settings min-h-screen dark:bg-primary-dark bg-primary-light text-black dark:text-white">
        <div className="flex flex-col items-center max-w-[750px] w-full mx-auto h-screen">
          {/* Header with title */}
          <HeadRibbon title={"Settings"} />
          {/* List of settings options */}
          <div className="flex flex-1 w-full flex-col space-y-1 text-xl sm:text-2xl px-3">
            {settingsObj.map((e) => {
              return (
                <div
                  key={e.key}
                  className="option w-full h-max dark:bg-primary-dark-900 bg-primary-light-900 border-[1px] rounded-md border-primary-light-500 dark:border-primary-light-100"
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
