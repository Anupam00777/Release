/**
 * This is a React component for the footer section of the website.
 * It includes a navigation bar, a form for user feedback, and branding information.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";

//Links to be used for navigation
const NavLinks = [
  { sno: 1, title: "Home", href: "/" },
  { sno: 2, title: "Trending", href: "/" },
  { sno: 3, title: "About", href: "/About" },
];

//Main footer component
const MyFooter = () => {
  return (
    <footer className="bg-black text-red-500 fixed bottom-0 w-full">
      <div className="mx-auto footer grid grid-flow-row sm:grid-flow-col my-0 sm:justify-evenly pt-3 px-12 sm:p-4 md:p-5 max-w-[1024px]">
        <NavBar />
        <div className="sm:border-l-[1px] sm:w-0 sm:m-0 border-gray-600 sm:h-full min-h-[1px] border-t-[1px] w-full my-4 sm:row-auto row-start-2"></div>
        <FooterForm />
      </div>
      <Branding />
    </footer>
  );
};

const NavBar = () => {
  // Generate navigation links
  const elements = NavLinks.map((e) => (
    <Link to={e.href} key={e.sno}>
      {e.title}
    </Link>
  ));
  return (
    <div className="flex pb-4 flex-row sm:flex-col justify-evenly items-center sm:row-auto row-start-3">
      {elements}
    </div>
  );
};

//Form to send a message
const FooterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // You can add your logic to send the message or perform any other action
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-sm items-center w-full sm:w-96 border border-gray-600 px-4 sm:row-auto row-start-1"
    >
      <h4 className="mb-4 mt-3 text-xl underline text-w">Get in Touch</h4>
      <div className="mb-4 w-full">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-white border-0 p-2 focus:outline-none text-red-500 placeholder:text-red-500 w-full"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-white border-0 p-2 focus:outline-none text-red-500 placeholder:text-red-500 w-full"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="bg-white border-0 w-full p-2 focus:outline-none text-red-500 placeholder:text-red-500"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 mb-3 py-2 hover:bg-red-700 focus:outline-none"
      >
        Send Message
      </button>
    </form>
  );
};

//Bottom most part of webpage
const Branding = () => {
  return (
    <div className="text-sm p-4 flex w-full border-t-gray-600 border-t-[1px] items-center justify-center">
      © 2024 Release | Developed by&nbsp;
      <a
        href="https://www.instagram.com/anupam_pandey_offline"
        rel="noreferrer"
        target="_blank"
      >
        Anupam Pandey
      </a>
    </div>
  );
};

export default MyFooter;
