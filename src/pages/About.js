import React from "react";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import data from "../components/data";
import MyBody from "../components/MyBody";

/**
 * About page component.
 * @returns {JSX.Element} About page.
 */
export default function About() {
  return (
    <>
      {/* Render MyHeader component with navigation links */}
      <MyHeader
        isSearchBarEnabled={false}
        navLinks={data.HeaderNav}
        isNavBarEnabled={true}
      />
      {/* Render MyBody component */}
      <MyBody>Hello</MyBody>
      {/* Render MyFooter component with navigation links */}
      <MyFooter
        footerNavEnabled
        footerFormEnabled={true}
        navLinks={data.HeaderNav}
      />
    </>
  );
}
