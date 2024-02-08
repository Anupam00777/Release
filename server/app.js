const express = require("express");
require("dotenv").config({ path: "../.env" });
const {
  generateJWT,
  authenticateUser,
  checkPasswordStrength,
} = require("./authenticator");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { entryExist, addEntry, modifyEntry } = require("./db/userData");

// Create an instance of Express app
const app = express();

// Middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies

// CORS configuration
const corsOptions = {
  origin: process.env.REACT_APP_APP, // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions)); // Enable CORS for specified origin

// Route for testing
app.get("/test", (req, res) => {
  res.sendFile("Hey");
});

// Route for user auto login
app.post("/auto_login", async (req, res) => {
  const u_token = req.cookies.hashtoken;
  if (u_token && (await authenticateUser({ u_token: u_token }))) {
    res.cookie("loggedIn", true, { maxAge: 60 * 60 * 1000 * 24 * 7 });
    res.json({ loggedIn: true });
  } else {
    res.cookie("loggedIn", false, { maxAge: 60 * 60 * 1000 * 24 * 7 });
    res.json({
      loggedIn: false,
      type: "error",
      message: "Cannot auto login. Please login or signup.",
      time: 2000,
    });
  }
});

// Route for user signup
app.post("/user_signup", async (req, res) => {
  const u_email = String(req.body.email);
  const u_pass = String(req.body.password);
  const u_repass = String(req.body.repassword);
  const remember_user = req.body.remember;
  if (u_email && u_pass && u_repass) {
    if (await entryExist({ email: u_email })) {
      res.json({
        type: "info",
        message: "Email already exists. Please login.",
        time: 4000,
      });
    }
    if (u_pass !== u_repass) {
      res.json({ type: "error", message: "Both passwords should match." });
      return;
    } else if (!checkPasswordStrength(String(u_pass))) {
      res.json({
        type: "warning",
        message: `Password is weak: Password should be 8 or more characters, must contain a CAPITAL letter, a small letter, a Number and a $pecial Symbol at least.`,
        time: 7000,
      });
      return;
    }
    const token = generateJWT(u_email);
    await addEntry({
      email: u_email,
      password: u_pass,
      hashtoken: token,
    });
    res.cookie("hashtoken", token, { maxAge: 60 * 60 * 1000 * 24 * 7 });
    res.cookie("loggedIn", true, { maxAge: 60 * 60 * 1000 * 24 * 7 });
    res.json({ type: "success", message: "Signup Successful" });
  } else {
    res.json({ type: "error", message: "Please try again" });
    res.sendStatus(403);
  }
});

// Route for user login
app.post("/user_login", async (req, res) => {
  const u_email = req.body.email;
  const u_pass = req.body.password;
  const remember_user = req.body.remember;
  if (await authenticateUser({ cred: { u_email: u_email, u_pass: u_pass } })) {
    const token = generateJWT(u_email);
    modifyEntry({ email: u_email }, { hashtoken: token });
    res.cookie("hashtoken", token, { maxAge: 60 * 60 * 1000 });
    res.cookie("loggedIn", true, { maxAge: 60 * 60 * 1000 * 24 * 7 });
    res.json({ type: "success", message: "Login Successful" });
  } else {
    res.json({ type: "error", message: "Invalid Login Details" });
  }
});

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, "public")));

// // Serve index.html for all other routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Start the app
module.exports = app;
