// Handling request and responses from server
import data from "./data";

/**
 * Sends a request to the server asynchronously.
 * @param {string} path - The request path.
 * @param {string} method - The HTTP method.
 * @param {Object} headers - The request headers.
 * @param {Object|null} body - The request body.
 * @param {Function|null} callback - The callback function to handle the response.
 * @returns {boolean} - Returns true if no callback is provided.
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
      body: body,
    });
  } catch (error) {
    return { error: error };
  }
  if (callback) callback(res);
  else return true;
};

/**
 * Checks user login by sending a request to the server.
 * @param {Function} callback - The callback function to handle the response.
 * @returns {boolean} - Returns the login status.
 */
export const checkLogin = async (callback) => {
  const response = await sendRequest(
    data.serverPaths.autoLogin,
    "POST",
    {},
    {},
    async (res) => {
      let data = await res.json();
      if (callback) callback(await data);
      return data.loggedIn;
    }
  );

  if (response.error) return { error: response.error };
  else return;
};
