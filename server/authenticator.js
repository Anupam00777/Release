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
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Expires in 7 days
    email: email,
  };

  const token = jwt.sign(payload, secret, {
    algorithm: jwtAlgorithm,
  });
  return token;
};

/**
 * Decodes a JWT and returns its payload.
 * @param {string} token - The JWT to decode.
 * @returns {object} The decoded payload of the JWT.
 */
const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: [jwtAlgorithm],
    });
    return decoded;
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
    const u_data = decodeJWT(u_token);
    if (u_data && u_data.exp > Math.floor(Date.now() / 1000)) {
      if (await entryExist({ email: u_data.email })) return true;
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
  // Check for at least one uppercase letter.
  if (!/[A-Z]/.test(password)) {
    return 0;
  }

  // Check for at least one lowercase letter.
  if (!/[a-z]/.test(password)) {
    return 0;
  }

  // Check for at least one number.
  if (!/[0-9]/.test(password)) {
    return 0;
  }

  // Check for at least one special symbol.
  if (!/[!@#$%^&*]/.test(password)) {
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
