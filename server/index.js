const { auto_login, user_signup, user_login, test } = require("./app");

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
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
};
