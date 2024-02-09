const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const {
  generateJWT,
  authenticateUser,
  checkPasswordStrength,
} = require("./authenticator");
const { entryExist, addEntry, modifyEntry } = require("./db/userData");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS Configuration (Enable only if needed)
// const corsOptions = {
//   origin: "https://rel-ease.vercel.app",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));

// Test Route
const test = async (req, res) => {
  return res.status(200).json({ Message: "Server is now working" });
};

// Route for auto-login
const autoLogin = async (req, res) => {
  try {
    const userToken = req.cookies.hashtoken;

    // Authenticate user using JWT token
    if (userToken && (await authenticateUser({ u_token: userToken }))) {
      // Set loggedIn cookie and return success response
      res.cookie("loggedIn", true, { maxAge: 604800000, secure: true });
      return res.status(200).json({ loggedIn: true });
    } else {
      // Set loggedIn cookie to false and return error response
      res.cookie("loggedIn", false, { maxAge: 604800000, secure: true });
      return res.status(401).json({
        loggedIn: false,
        type: "error",
        message: "Cannot auto login. Please login or signup.",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ type: "error", message: "Internal Server Error" });
  }
};

// Route for user signup
const userSignup = async (req, res) => {
  try {
    const { email, password, repassword } = req.body;
    const rememberUser = req.body.remember;

    // Validation checks
    if (!email || !password || !repassword) {
      return res.status(400).json({
        type: "error",
        message: "Please provide all required fields.",
      });
    }
    if (await entryExist({ email: email })) {
      return res
        .status(400)
        .json({ type: "info", message: "Email already exists. Please login." });
    }
    if (password !== repassword) {
      return res
        .status(400)
        .json({ type: "error", message: "Both passwords should match." });
    }
    if (!checkPasswordStrength(password)) {
      return res.status(400).json({
        type: "warning",
        message:
          "Password is weak. Password should be 8 or more characters, must contain a CAPITAL letter, a small letter, a Number, and a $pecial Symbol at least.",
      });
    }

    // Generate JWT token
    const token = generateJWT(email);

    // Add entry to the database
    await addEntry({ email: email, password: password, hashtoken: token });

    // Set cookies
    res.cookie("hashtoken", token, {
      maxAge: 604800000,
      secure: true,
      httpOnly: true,
    });
    res.cookie("loggedIn", true, { maxAge: 604800000, secure: true });

    // Return success response
    return res
      .status(200)
      .json({ type: "success", message: "Signup Successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ type: "error", message: "Internal Server Error" });
  }
};

// Route for user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authentication
    if (
      await authenticateUser({ cred: { u_email: email, u_pass: password } })
    ) {
      const token = generateJWT(email);

      // Update hashtoken in the database
      await modifyEntry({ email: email }, { email: email, hashtoken: token });

      // Set cookies
      res.cookie("hashtoken", token, {
        maxAge: 3600000,
        secure: true,
        httpOnly: true,
      });
      res.cookie("loggedIn", true, { maxAge: 604800000, secure: true });

      // Return success response
      return res
        .status(200)
        .json({ type: "success", message: "Login Successful" });
    } else {
      return res
        .status(401)
        .json({ type: "error", message: "Invalid Login Details" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ type: "error", message: "Internal Server Error" });
  }
};

// Routes
app.get("/test", test);
app.get("/test2", test);
app.post("/auto_login", autoLogin);
app.post("/user_login", userLogin);
app.post("/user_signup", userSignup);

module.exports = app;
