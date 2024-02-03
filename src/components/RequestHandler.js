export const sendRequest = async (
  path = "",
  method = "get",
  headers = {},
  body = null,
  callback = null
) => {
  // Asynchronously sending data to server
  try {
    const res = await fetch("http://localhost:3001/" + path, {
      method: method,
      credentials: "include",
      headers: headers,
      body: body,
    });
    if (callback) callback(res);
    else return true;
  } catch (error) {
    console.error("Error Sending Request:", error);
  }
};

export const checkLogin = async (callback) => {
  // Asynchronously sending data to server
  try {
    sendRequest("auto_login", "POST", {}, {}, async (res) => {
      let data = await res.json();
      if (callback) callback(await data);
      return data.loggedIn;
    });
  } catch (error) {
    console.error("Error In Checking:", error);
  }
};
