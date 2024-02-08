const { generateJWT, authenticateUser } = require("./authenticator");
const { entryExist, addEntry, modifyEntry } = require("./db/userData");

module.exports.test = async (req, res) => {
  return res.status(200).json({ Message: "Server is working" });
};

// Route for auto-login
module.exports.auto_login = async (req, res) => {
  try {
    const u_token = req.cookies.hashtoken;

    // Authenticate user using JWT token
    if (u_token && (await authenticateUser({ u_token }))) {
      // Set loggedIn cookie and return success response
      res.setHeader(
        "Set-Cookie",
        `loggedIn=true; Max-Age=${60 * 60 * 24 * 7}; Secure`
      );
      return res.status(200).json({ loggedIn: true });
    } else {
      // Set loggedIn cookie to false and return error response
      res.setHeader(
        "Set-Cookie",
        `loggedIn=false; Max-Age=${60 * 60 * 24 * 7}; Secure`
      );
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
module.exports.user_signup = async (req, res) => {
  try {
    const u_email = String(req.body.email);
    const u_pass = String(req.body.password);
    const u_repass = String(req.body.repassword);
    const remember_user = req.body.remember;

    // Validation checks
    if (!u_email || !u_pass || !u_repass) {
      return res.status(400).json({
        type: "error",
        message: "Please provide all required fields.",
      });
    }
    if (await entryExist({ email: u_email })) {
      return res
        .status(400)
        .json({ type: "info", message: "Email already exists. Please login." });
    }
    if (u_pass !== u_repass) {
      return res
        .status(400)
        .json({ type: "error", message: "Both passwords should match." });
    }
    if (!checkPasswordStrength(String(u_pass))) {
      return res.status(400).json({
        type: "warning",
        message:
          "Password is weak. Password should be 8 or more characters, must contain a CAPITAL letter, a small letter, a Number, and a $pecial Symbol at least.",
      });
    }

    // Generate JWT token
    const token = generateJWT(u_email);

    // Add entry to the database
    await addEntry({ email: u_email, password: u_pass, hashtoken: token });

    // Set cookies
    res.setHeader("Set-Cookie", [
      `hashtoken=${token}; Max-Age=${60 * 60 * 24 * 7}; Secure; HttpOnly`,
      `loggedIn=true; Max-Age=${60 * 60 * 24 * 7}; Secure`,
    ]);

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
module.exports.user_login = async (req, res) => {
  try {
    const u_email = req.body.email;
    const u_pass = req.body.password;

    // Authentication
    if (await authenticateUser({ cred: { u_email, u_pass } })) {
      const token = generateJWT(u_email);

      // Update hashtoken in the database
      await modifyEntry({ email: u_email }, { hashtoken: token });

      // Set cookies
      res.setHeader("Set-Cookie", [
        `hashtoken=${token}; Max-Age=${60 * 60}; Secure; HttpOnly`,
        `loggedIn=true; Max-Age=${60 * 60 * 24 * 7}; Secure`,
      ]);

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
