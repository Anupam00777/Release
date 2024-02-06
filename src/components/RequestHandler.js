// Handling request and responses from server
import serverPaths from "./manifest.json";
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
      body: JSON.stringify(body),
    });
  } catch (error) {
    return { error: error };
  }
  if (callback) return callback(await res);
  else return res;
};

/**
 * Checks user login by sending a request to the server.
 * @param {Function} callback - The callback function to handle the response.
 * @returns {object} - Returns the status object.
 */
export const checkLogin = async (callback) => {
  try {
    return await sendRequest(
      serverPaths.autoLogin,
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
        return callback(await res);
      }
    );
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const GetUserData = () => {};
