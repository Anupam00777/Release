/**
 * This file contains the implementation of a registration form component in a React application.
 * It imports various components and assets, including a custom header and footer, a logo image, and utility functions.
 * The Register component is a functional component that renders a registration form.
 * It uses state and context hooks to manage form type and display alerts.
 * The initiate_login function handles form submission and sends a request to the server.
 * Upon receiving a response, it displays an alert and redirects the user if the login/signup is successful.
 * The FormHeader component renders the header section of the form, including a logo and app name.
 * The Form component is a sub-component of Register and renders the main form section.
 * It includes input fields for email and password, with additional fields for sign up.
 * It also provides options for forgot password and toggling between login and signup forms.
 * The EmailField and PasswordField components render the respective input fields with labels.
 * The ForgotPassword component renders a checkbox for remembering the user and a link for password recovery.
 * The Button component renders a submit button with a dynamic title based on the form type.
 */

import React, { useRef, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import logo from "../components/logo.png";
import { Link } from "react-router-dom";
import { BUTTON } from "../components/utilities";
import { UserLogin, UserSignup } from "../components/RequestHandler";
import LoadingIcon from "../components/LoadingIcon";

/**
 * Register component renders a registration form.
 * @param {number} type - Type of form: 0 for login, 1 for signup, 2 for forgot password.
 * @returns {JSX.Element} Registration form component.
 */
export default function Register({ type = 0 }) {
  const [formType, changeFormType] = useState(type);
  const [Loading, showLoading] = useState(false);

  /**
   * Toggles between login and signup form types.
   */
  const toggleFormType = () => {
    changeFormType(formType ? 0 : 1);
  };

  /**
   * Initiates login or signup based on the form type.
   * @param {object} form - Reference to the form element.
   */
  const initiate_login = async (form) => {
    showLoading(true);
    const formData = new FormData(form.current);
    let reqBody = {};
    formData.forEach((value, key) => {
      reqBody[key] = value;
    });
    formType ? await UserSignup(reqBody) : await UserLogin(reqBody);
    showLoading(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <MyHeader isSearchBarEnabled={false} navLinks={[]} />
      <section className="bg-gray-50 dark:bg-gray-900 flex-1 px-4 flex flex-col justify-center items-center">
        <FormHeader />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 font-hind max-w-[400px]">
          <Form
            type={formType}
            action={initiate_login}
            changeFormType={toggleFormType}
            Loading={Loading}
          />
        </div>
      </section>
      <MyFooter footerFormEnabled={false} footerNavEnabled={false} />
    </div>
  );
}

/**
 * FormHeader component renders the header section of the form, including a logo and app name.
 * @returns {JSX.Element} Header section of the form.
 */
const FormHeader = () => {
  return (
    <div className="pb-6 w-full flex items-center justify-center">
      <Link
        to="/"
        className="flex items-center text-4xl font-semibold text-red-500 justify-center"
      >
        <img src={logo} className="h-16 mr-5" alt="" />
        <h1 className="font-dancingScript">Release</h1>
      </Link>
    </div>
  );
};

/**
 * Form component renders the main form section.
 * @param {Object} type - Type of form: 0 for login, 1 for signup.
 * @param {Function} action - Function to handle form submission.
 * @param {Function} changeFormType - Function to toggle form type.
 * @returns {JSX.Element} Main form section.
 */
const Form = ({ type = 1, action, changeFormType, Loading = false }) => {
  const FORM = useRef();
  /**
   * Handles form submission.
   * @param {Object} e - Event object.
   */
  const submitAction = (e) => {
    e.preventDefault();
    action(FORM);
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
      <LoadingIcon classNames={Loading ? "" : "hidden"} />
      <h1 className="text-base font-bold leading-tight tracking-tight md:text-lg text-red-500">
        {type ? "Sign Up for an" : "Log In to your"} account
      </h1>
      <form
        ref={FORM}
        className="space-y-4 md:space-y-6"
        onSubmit={submitAction}
      >
        <EmailField />
        <PasswordField />
        {type ? (
          <PasswordField name="repassword" label="Re-enter Password" />
        ) : (
          ""
        )}
        <ForgotPassword show={type} />
        <Button type={type} />
        <p className="text-sm font-light text-red-500">
          {type ? "Already Registered? " : "Don't have an account yet? "}
          <Link
            to={"/"}
            onClick={changeFormType}
            className="font-medium text-primary-600 hover:underline"
          >
            {type ? "Log In? " : "Sign Up? "}
          </Link>
        </p>
      </form>
    </div>
  );
};

/**
 * EmailField component renders an email input field.
 * @param {string} name - Name attribute for the input field.
 * @returns {JSX.Element} Email input field.
 */
const EmailField = ({ name = "email" }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-red-500"
      >
        Your email
      </label>
      <input
        type="email"
        name={name}
        id="email"
        className="sm:text-sm rounded-lg block w-full p-2.5 dark:bg-white bg-red-500 focus:outline-none dark:text-red-500 dark:placeholder:text-red-500 placeholder:text-white text-white"
        placeholder="name@email.com"
        required={true}
      />
    </div>
  );
};

/**
 * PasswordField component renders a password input field.
 * @param {string} name - Name attribute for the input field.
 * @param {string} label - Label for the input field.
 * @returns {JSX.Element} Password input field.
 */
const PasswordField = ({ name = "password", label = "Password" }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-red-500"
      >
        {label}
      </label>
      <input
        type="password"
        name={name}
        id={name}
        placeholder="••••••••"
        className="sm:text-sm rounded-lg block w-full p-2.5 dark:bg-white bg-red-500 focus:outline-none dark:text-red-500 dark:placeholder:text-red-500 placeholder:text-white text-white"
        required={true}
      />
    </div>
  );
};

/**
 * ForgotPassword component renders a checkbox for remembering the user and a link for password recovery.
 * @param {boolean} show - Determines whether to show the forgot password link.
 * @returns {JSX.Element} Forgot password component.
 */
const ForgotPassword = ({ show }) => {
  return (
    <div className="flex items-center justify-start">
      {show ? (
        ""
      ) : (
        <Link
          to="/"
          className="text-sm font-medium text-primary-600 hover:underline text-red-500"
        >
          Forgot password?
        </Link>
      )}
    </div>
  );
};

/**
 * Button component renders a submit button with a dynamic title based on the form type.
 * @param {number} type - Type of form: 0 for login, 1 for signup.
 * @returns {JSX.Element} Submit button component.
 */
const Button = ({ type }) => {
  return <BUTTON type="submit" title={type ? "Sign Up" : "Log In"} />;
};
