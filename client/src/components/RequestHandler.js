// Handling request and responses from server

import { toggleAlert } from "./Alert";

/**
 * Sends a request to the server asynchronously.
 * @param {string} path - The request path.
 * @param {string} method - The HTTP method.
 * @param {Object} headers - The request headers.
 * @param {Object|null} body - The request body.
 * @param {Function|null} callback - The callback function to handle the response.
 * @returns {object} - Returns true if no callback is provided.
 */
export const sendRequest = async (
  path = "",
  method = "get",
  headers = {},
  body = null,
  callback = null
) => {
  let res;
  try {
    res = await fetch(path, {
      method: method,
      credentials: "include",
      headers: headers,
      body: JSON.stringify(body),
    });
  } catch (error) {
    return { error: error };
  }
  if (callback) return callback(await res);
  else return res;
};
/**
 * Sends user data to the server.
 * @param {Object} userData - The user data to be sent.
 * @param {string} path - The request path.
 * @param {Function} callback - The callback function to handle the response.
 * @returns {object} - Returns the response object.
 */
export const SendUserData = async (userData, path, callback) => {
  try {
    return sendRequest(
      path,
      "POST",
      {
        "Content-Type": "application/json",
      },
      userData,
      async (res) => {
        if (callback) return callback(await res);
        else return res;
      }
    );
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
/**
 * Handles server errors by displaying an error alert.
 * @param {Error} error - The error object.
 */
export const handleServerError = (error) => {
  toggleAlert("error", "Error trying to connect to server.", 3000);
  console.error(error);
};

/**
 * Checks user login by sending a request to the server.
 * @param {Function} callback - The callback function to handle the response.
 * @returns {object} - Returns the status object.
 */
export const checkLogin = async (callback) => {
  try {
    return await sendRequest(
      process.env.REACT_APP_AUTO_LOGIN,
      "POST",
      {},
      {},
      async (res) => {
        let data = await res.json();
        if (callback) return callback(await data);
        else return await data.loggedIn;
      }
    );
  } catch (error) {
    if (error) return { error: error };
  }
};
/**
 * UserLogin function to handle user login.
 * Sends user login data to the server and processes the response.
 * @param {Object} user - User login credentials.
 */
export const UserLogin = async (user) => {
  try {
    const res = await SendUserData(user, process.env.REACT_APP_USER_LOGIN);
    const json = await res.json();

    if (json) {
      toggleAlert(json.type, json.message, json.time || 2000);
      if (json.type === "success") {
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      }
    } else {
      return false;
    }
  } catch (error) {
    handleServerError(error);
  }
};

/**
 * UserSignup function to handle user signup.
 * Sends user signup data to the server and processes the response.
 * @param {Object} user - User signup data.
 */
export const UserSignup = async (user) => {
  try {
    const res = await SendUserData(user, process.env.REACT_APP_USER_SIGNUP);
    const json = await res.json();

    if (json) {
      toggleAlert(json.type, json.message, json.time || 2000);
      if (json.type === "success") {
        setTimeout(() => {
          window.location = "/";
        }, 2000);
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    handleServerError(error);
  }
};

/**
 * Retrieves user data from the server.
 */
export const GetUserData = () => {};
