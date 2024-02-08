/**
 * Summary:
 * This file, data.js, is used to store variables and objects that are accessed by multiple components like paths and utilities. It provides convenience by centralizing the data.
 */

import { HomeSVG, NotificationSVG, ProfileSVG, SettingsSVG } from "./SVGlogo";
import { UserLogOut } from "./UserDetails";
import { DropdownOption, LinkOption, ToggleOption } from "./utilities";

// The data object will be exported to allow page specific access to all the data.
const data = {
  server: {
    SERVER: process.env.REACT_APP_SERVER,
    autoLogin: process.env.REACT_APP_AUTO_LOGIN,
    userLogin: process.env.REACT_APP_USER_LOGIN,
    userSignup: process.env.REACT_APP_USER_SIGNUP,
  },
  // What to show in Headers
  HeaderNav: [
    { sno: 1, title: "Home", href: "/", onClick: "" },
    { sno: 2, title: "Trending", href: "/", onClick: "" },
    { sno: 3, title: "About", href: "/About", onClick: "" },
  ],

  // Bottom menu names and components
  BottomMenuIcons: {
    className: "hover:fill-secondary-light-900 fill-secondary-light",
    entities: [
      { sno: 1, title: "Home", onClick: "", href: "/", entity: <HomeSVG /> },
      {
        sno: 2,
        title: "Notification",
        onClick: "",
        href: "/",
        entity: <NotificationSVG />,
      },
      {
        sno: 3,
        title: "Profile",
        onClick: "",
        href: "/Profile",
        entity: <ProfileSVG />,
      },
      {
        sno: 4,
        title: "Settings",
        onClick: "",
        href: "/Settings",
        entity: <SettingsSVG />,
      },
    ],
  },

  // Object to be passed to SettingsOBJ in the Settings page. Contains all the options in the settings page, and what they do
  settingsOptions: [
    {
      key: 1,
      title: "Target Platforms",
      element: (
        <DropdownOption
          title="Target Platforms"
          elements={
            <>
              <ToggleOption title="Instagram" />
              <ToggleOption title="Facebook" />
              <ToggleOption title="Twitter" />
              <ToggleOption title="Reddit" />
            </>
          }
        />
      ),
    },
    {
      key: 2,
      title: "Logout",
      element: <LinkOption title="LogOut" onClick={UserLogOut} />,
    },
  ],

  // Types of alerts sent by the server. This defines the color for those to be shown as a notification
  alertTypeColors: {
    info: "text-blue-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    success: "text-green-500",
  },
};

export default data;
