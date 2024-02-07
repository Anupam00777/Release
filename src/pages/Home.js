import React from "react";
import BottomMenu from "../components/BottomMenu";
import MyBody from "../components/MyBody";
import MyHeader from "../components/MyHeader";
import data from "../components/data";

/**
 * Home component represents the homepage of the application.
 * @returns {JSX.Element} Homepage component.
 */
function Home() {
  return (
    <>
      {/* Render the header with search functionality */}
      <MyHeader isSearchBarEnabled={true} navLinks={data.HeaderNav} />
      {/* Render the body with the text "Hello" */}
      <MyBody>Hello</MyBody>
      {/* Render the bottom menu with icons */}
      <BottomMenu
        children={data.BottomMenuIcons.entities}
        childClasses={data.BottomMenuIcons.className}
      />
    </>
  );
}

export default Home;
