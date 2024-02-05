// This is a React component that provides an alert context for displaying messages.
// It uses a state hook to manage the visibility of the alert and another state hook to manage the content of the alert.
// The toggleAlert function takes in parameters for the type, message, and time of the alert and sets the state accordingly.
// The AlertProvider component renders a div that displays the alert message and an SVG icon.
// It also renders any child components passed to it.
// The AlertContext is provided to child components so they can call the toggleAlert function to display alerts.

import React, { createContext, useState, useContext, useEffect } from "react";
import { InfoSVG } from "./SVGlogo";
import data from "./data";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [_Alert, toggle_Alert] = useState(false);
  const [Alert, ToggleAlert] = useState({
    type: "",
    message: "",
    time: 0,
    textColor: "",
  });

  const toggleAlert = (type, message, time) => {
    const textColor = data.alertTypeColors[type];

    ToggleAlert({
      type,
      message,
      time,
      textColor,
    });

    toggle_Alert(true);
    setTimeout(() => {
      toggle_Alert(false);
    }, time);
  };

  return (
    <AlertContext.Provider value={toggleAlert}>
      <div
        className={`absolute z-50 top-2 mx-auto right-0 left-0 transition duration-200  ${
          _Alert ? "" : "-translate-y-20"
        } w-full max-w-[1024px] flex items-center p-4 mb-4 text-sm ${
          Alert.textColor
        } rounded-lg dark:bg-gray-700 bg-gray-50`}
        role="alert"
      >
        <InfoSVG />
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{Alert.message}</span>
        </div>
      </div>
      {children}
    </AlertContext.Provider>
  );
};
