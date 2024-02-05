/**
 * Summary:
 * This file, data.js, is used to store variables and objects that are accessed by multiple components like paths and utilities. It provides convenience by centralizing the data.
 */

import { HomeSVG, NotificationSVG, ProfileSVG, SettingsSVG } from "./SVGlogo";
import { UserLogOut } from "./UserDetails";
import { DropdownOption, LinkOption, ToggleOption } from "./utilities";

// The data object will be exported to allow page specific access to all the data. Probably had a better way, but it's convenient
const data = {
  // What to show in Headers
  HeaderNav: [
    { sno: 1, title: "Home", href: "/", onClick: "" },
    { sno: 2, title: "Trending", href: "/", onClick: "" },
    { sno: 3, title: "About", href: "/About", onClick: "" },
  ],

  // Bottom menu names and components
  BottomMenuIcons: {
    className: "hover:fill-red-700 fill-red-500",
    entities: [
      { sno: 1, title: "Home", href: "/", entity: <HomeSVG /> },
      { sno: 2, title: "Notification", href: "/", entity: <NotificationSVG /> },
      { sno: 3, title: "Profile", href: "/", entity: <ProfileSVG /> },
      { sno: 4, title: "Settings", href: "/Settings", entity: <SettingsSVG /> },
    ],
  },

  // Main server address
  serverPaths: {
    server: "http://localhost:3001/",
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

// Mapping the path of server and its routes.
data.serverPaths.autoLogin = data.serverPaths.server + "auto_login";
data.serverPaths.userLogin = data.serverPaths.server + "user_login";
data.serverPaths.userSignup = data.serverPaths.server + "user_signup";

export default data;
