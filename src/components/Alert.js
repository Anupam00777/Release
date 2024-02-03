import React, { createContext, useState, useContext } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [_Alert, toggle_Alert] = useState(false);
  let textColor, _message;

  const toggleAlert = (type, message, time) => {
    _message = message;
    switch (type) {
      case "error":
        textColor = "text-red-500";
        break;
      case "info":
        textColor = "text-blue-500";
        break;
      case "warning":
        textColor = "text-yellow-500";
        break;
      case "success":
        textColor = "text-green-500";
        break;
      default:
        textColor = "text-black dark:text-white";
        break;
    }
    toggle_Alert(!_Alert);
    setTimeout(() => {
      toggle_Alert(!_Alert);
    }, time);
  };
  return (
    <AlertContext.Provider value={toggleAlert}>
      <div
        className={` absolute z-50 top-2 transition duration-200 ${
          _Alert ? "" : "-translate-y-20"
        } w-full max-w[1024px] flex items-center p-4 mb-4 text-sm ${textColor} rounded-lg dark:bg-gray-700 bg-gray-50`}
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-8 h-8 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{_message}</span>
        </div>
      </div>
      {children}
    </AlertContext.Provider>
  );
};
