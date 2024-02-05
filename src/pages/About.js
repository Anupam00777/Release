/**
 * Code for the About page.
 * Imports various components and data.
 * Renders MyHeader, MyBody, and MyFooter components.
 * Provides navigation links and enables/disables certain features.
 */

import React from "react";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import data from "../components/data";
import MyBody from "../components/MyBody";
//Default About Page
export default function About() {
  return (
    <>
      <MyHeader isSearchBarEnabled={false} navLinks={data.HeaderNav} />
      <MyBody>Hello</MyBody>
      <MyFooter
        footerNavEnabled
        footerFormEnabled={true}
        navLinks={data.HeaderNav}
      />
    </>
  );
}
