const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const { sendEmail } = require("./db/mailHandler");
const {
  generateJWT,
  authenticateUser,
  checkPasswordStrength,
  verifyEmail,
  verifyEmailExist,
} = require("./authenticator");
const {
  entryExist,
  addEntry,
  modifyEntry,
  getEntry,
} = require("./db/userData");
const cors = require("cors");
const path = require("path");
const getInstaVideo = require("./iftcr");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS Configuration (Enable only if needed)
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

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
        time: 8000,
      });
    }

    if (!(await verifyEmailExist({ email: email }))) {
      return res.status(400).json({
        type: "warning",
        message: "Email does not exist. Please check again",
        time: 5000,
      });
    }

    // Generate JWT token
    const token = generateJWT(email);

    // Add entry to the database
    await addEntry({ email: email, password: password, hashtoken: token });
    sendEmail({
      email: email,
      subject: "Welcome to RELEASE",
      text: "This is a welcome message from RELEASE APP",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to [Your App Name]!</title>
    <style>
        /* Customize styling based on your brand guidelines */
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f2f2f2;
        }

        .container {
            background-color: #fff;
            border-radius: 5px;
            padding: 30px;
            text-align: center;
        }

        .logo {
            width: 200px;
            height: auto;
            margin-bottom: 20px;
        }

        .heading {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .message {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .button {
            background-color: #007bff;
            border: none;
            color: #fff;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }

        .footer {
            font-size: 12px;
            text-align: left;
            margin-top: 20px;
        }
    </style>
</head>
<body>
<div class="container">
    <img src="https://rel-ease.vercel.app/static/media/logo.274e3ade5df24582d523.png" alt="RELEASE" class="logo">
    <h1 class="heading">Welcome to RELEASE, ${email}!</h1>
    <p class="message">We're thrilled to have you on board. Your journey to release from social starts now!</p>
 

    <p class="footer">Questions? Visit our Help Center: rel-ease.vercel.app</p>
</div>
</body>
</html>`,
    });
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
app.post("/auto_login", autoLogin);
app.post("/user_login", userLogin);
app.post("/user_signup", userSignup);
app.post("/fetchInstaPost", getInstaVideo);

module.exports = app;
