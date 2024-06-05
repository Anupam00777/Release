import React, { useEffect, useState } from "react";
import BottomMenu from "../components/BottomMenu";
import MyBody from "../components/MyBody";
import MyHeader from "../components/MyHeader";
import data from "../components/data";
import { sendRequest } from "../components/RequestHandler";
import { func } from "prop-types";
// import InstagramEmbed from "react-instagram-embed";

/**
 * Home component represents the homepage of the application.
 * @returns {JSX.Element} Homepage component.
 */
function Home() {
  const [content, updateContent] = useState();

  useEffect(() => {
    const fetchInstagramPost = async () => {
      const res = await sendRequest(process.env.REACT_APP_FETCH_POST, "POST");
      console.log(await res);
    };
    fetchInstagramPost();
  }, []);
  return (
    <>
      {/* Render the header with search functionality */}
      <MyHeader isSearchBarEnabled={true} navLinks={data.HeaderNav} />
      {/* Render the body with the text "Hello" */}
      <MyBody>{content}</MyBody>
      {/* Render the bottom menu with icons */}
      {/* <InstagramEmbed
        url="https://www.instagram.com/p/C4IxmmePkNn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      /> */}
      <BottomMenu
        children={data.BottomMenuIcons.entities}
        childClasses={data.BottomMenuIcons.className}
      />
    </>
  );
}

export default Home;
