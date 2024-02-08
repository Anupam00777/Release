const { auto_login, user_signup, user_login, test } = require("./app");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  const { pathname } = new URL(req.url, process.env.PUBLIC_URL);

  if (pathname === "/auto_login") {
    return await auto_login(req, res);
  } else if (pathname === "/user_signup") {
    return await user_signup(req, res);
  } else if (pathname === "/user_login") {
    return await user_login(req, res);
  } else if (pathname === "/test") {
    return await test(req, res);
  } else {
    // Serve React app build from /public directory
    const publicDir = path.join(__dirname, "public");
    const indexPath = path.join(publicDir, "index.html");

    // Check if index.html exists
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    }
  }
};
