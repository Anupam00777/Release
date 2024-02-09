const jwt = require("jsonwebtoken");
const { entryExist, validatePassword } = require("./db/userData");

// Secret key for JWT signing
const secret = process.env.JWT_SIGN_KEY;
const jwtAlgorithm = process.env.JWT_SIGN_ALGORITHM;

/**
 * Generates a JSON Web Token (JWT) for a given email.
 * @param {string} email - The email associated with the JWT.
 * @returns {string} The generated JWT.
 */
const generateJWT = (email) => {
  const payload = {
    iss: "Release",
    exp: Math.floor(Date.now() / 1000) + 604800, // Expires in 7 days (60 * 60 * 24 * 7)
    email: email,
  };

  return jwt.sign(payload, secret, {
    algorithm: jwtAlgorithm,
  });
};

/**
 * Decodes a JWT and returns its payload.
 * @param {string} token - The JWT to decode.
 * @returns {object} The decoded payload of the JWT.
 */
const decodeJWT = (token) => {
  try {
    return jwt.verify(token, secret, {
      algorithms: [jwtAlgorithm],
    });
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};

/**
 * Authenticates a user based on provided credentials or a token.
 * @param {object} options - Options for authentication.
 * @param {string} options.u_token - JWT token for authentication.
 * @param {object} options.cred - User credentials: email and password.
 * @param {string} options.cred.u_email - User's email.
 * @param {string} options.cred.u_pass - User's password.
 * @returns {boolean} True if authentication succeeds, false otherwise.
 */
const authenticateUser = async ({
  u_token = null,
  cred = { u_email: null, u_pass: null },
}) => {
  if (u_token) {
    const decodedToken = decodeJWT(u_token);
    if (decodedToken && decodedToken.exp > Math.floor(Date.now() / 1000)) {
      return await entryExist({ email: decodedToken.email });
    }
  } else if (cred && cred.u_email && cred.u_pass) {
    if (await entryExist({ email: cred.u_email })) {
      return await validatePassword({ email: cred.u_email }, cred.u_pass);
    }
  }
  return false;
};

/**
 * Checks the strength of a password.
 * @param {string} password - The password to check.
 * @returns {number} Strength level: 0 for weak, 1 for strong.
 */
const checkPasswordStrength = (password) => {
  // Check the length of the password.
  if (password.length < 8) {
    return 0;
  }

  // Check for at least one uppercase letter, one lowercase letter, one number, and one special symbol.
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    return 0;
  }

  // If all checks pass, return "Strong".
  return 1;
};

module.exports = {
  generateJWT,
  decodeJWT,
  authenticateUser,
  checkPasswordStrength,
};
