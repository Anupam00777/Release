/**
 * CookieHandler.js
 *
 * A class for handling cookies using the react-cookie library.
 * Provides methods for setting, getting, removing, checking existence, and clearing cookies.
 * Default cookie options are set, but can be overridden when necessary.
 *
 * Usage:
 * const cookieHandler = new CookieHandler();
 * cookieHandler.set(name, value, options);
 * cookieHandler.get(name);
 * cookieHandler.remove(name, options);
 * cookieHandler.exists(name);
 * cookieHandler.getAll();
 * cookieHandler.clearAll();
 */

import { Cookies } from "react-cookie";

// Default cookie options (these will be changed)
const defaultOptions = {
  maxAge: 3600 * 24 * 7, // Expire in 7 days
  path: "/", // Accessible across all paths
  sameSite: "lax", // Send cookies with cross-site requests
  secure: process.env.NODE_ENV === "production", // Send cookies only over HTTPS in production
};

// CookieHandler class
class CookieHandler {
  /**
   * Constructor for CookieHandler class.
   * Sets the default options and initializes the react-cookie library.
   *
   * @param {object} options - Custom options to override default options.
   */
  constructor(options = defaultOptions) {
    this.options = options;
    this._COOKIES = new Cookies();
  }

  /**
   * Set a cookie securely.
   *
   * @param {string} name - Name of the cookie.
   * @param {string} value - Value of the cookie.
   * @param {object} options - Custom options to override default options.
   * @returns {void}
   */
  set(name, value, options = {}) {
    return this._COOKIES.set(name, value, { ...this.options, ...options });
  }

  /**
   * Get the value of a cookie.
   *
   * @param {string} name - Name of the cookie.
   * @returns {string|undefined} - Value of the cookie, or undefined if not found.
   */
  get(name) {
    return this._COOKIES.get(name);
  }

  /**
   * Remove a cookie.
   *
   * @param {string} name - Name of the cookie.
   * @param {object} options - Custom options to override default options.
   * @returns {void}
   */
  remove(name, options = {}) {
    return this._COOKIES.remove(name, { ...this.options, ...options });
  }

  /**
   * Check if a cookie exists.
   *
   * @param {string} name - Name of the cookie.
   * @returns {boolean} - True if the cookie exists, false otherwise.
   */
  exists(name) {
    return this._COOKIES.get(name) !== undefined;
  }

  /**
   * Get all cookies as an object.
   *
   * @returns {object} - Object containing all cookies.
   */
  getAll() {
    return this._COOKIES.getAll();
  }

  /**
   * Clear all cookies.
   *
   * @returns {void}
   */
  clearAll() {
    return Object.keys(this.getAll()).forEach((name) => this.remove(name));
  }
}

// Export the CookieHandler class
export default CookieHandler;
