import { Cookies } from "react-cookie";

// Default cookie options (these will be changed)
const defaultOptions = {
  maxAge: 3600 * 24 * 7, // Expire in 7 days
  path: "/", // Accessible across all paths
  sameSite: "lax", // Send _COOKIES with cross-site requests
  secure: process.env.NODE_ENV === "production", // Send _COOKIES only over HTTPS in production
};

// CookieHandler class
class CookieHandler {
  //Setting the Default options, in case of no activity, the user cookies will be deleted after 7 days
  constructor(options = defaultOptions) {
    this.options = options;
    this._COOKIES = new Cookies();
  }

  // Store a cookie securely
  set(name, value, options = {}) {
    return this._COOKIES.set(name, value, { ...this.options, ...options });
  }

  // Get a cookie value
  get(name) {
    return this._COOKIES.get(name);
  }

  // Remove a cookie
  remove(name, options = {}) {
    return this._COOKIES.remove(name, { ...this.options, ...options });
  }

  // Check if a cookie exists
  exists(name) {
    return this._COOKIES.get(name) !== undefined;
  }

  // Get all _COOKIES as an object
  getAll() {
    return this._COOKIES.getAll();
  }

  // Clear all _COOKIES
  clearAll() {
    return Object.keys(this.getAll()).forEach((name) => this.remove(name));
  }
}

// Export the CookieHandler class
export default CookieHandler;
