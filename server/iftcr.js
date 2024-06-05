const { igApi, getCookie } = require("insta-fetcher");

const getInstaVideo = async (req, res) => {
  try {
    const cookie = await getCookie("releasemefromworld", "RAKPAN74@+");
    const session_id = await cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key.trim()] = value.trim();
      return acc;
    }, {}).sessionid;
    // using constructor
    console.log(await session_id);

    let ig = new igApi(await session_id);
    // you can get sesion id by using getSessionId function, it requires username & password
    ig.fetchUser("mg.creativestudio").then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.error("Error fetching Instagram post:", await error.response.data);
  }
};

module.exports = getInstaVideo;
