/* 

This file contains the implementation of a registration form component in a React application. It imports various components and assets, including a custom header and footer, a logo image, and utility functions.

The Register component is a functional component that renders a registration form. It uses state and context hooks to manage form type and display alerts. The initiate_login function handles form submission and sends a request to the server. Upon receiving a response, it displays an alert and redirects the user if the login/signup is successful.

The FormHeader component renders the header section of the form, including a logo and app name.

The Form component is a sub-component of Register and renders the main form section. It includes input fields for email and password, with additional fields for sign up. It also provides options for forgot password and toggling between login and signup forms.

The EmailField and PasswordField components render the respective input fields with labels.

The ForgotPassword component renders a checkbox for remembering the user and a link for password recovery.

The Button component renders a submit button with a dynamic title based on the form type.

Overall, this code implements a registration form with login and signup functionality in a React application.
*/

import React, { useContext, useRef, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import logo from "../components/logo.png";
import { Link } from "react-router-dom";
import { BUTTON } from "../components/utilities";
import { UserLogin, UserSignup } from "../components/UserDetails";

export default function Register({ type = 0 }) {
  const [formType, changeFormType] = useState(type);

  const toggleFormType = () => {
    changeFormType(formType ? 0 : 1);
  };
  const initiate_login = (form) => {
    const formData = new FormData(form.current);
    let reqBody = {};
    formData.forEach((value, key) => {
      reqBody[key] = value;
    });
    return formType ? UserSignup(reqBody) : UserLogin(reqBody);
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
          />
        </div>
      </section>
      <MyFooter footerFormEnabled={false} footerNavEnabled={false} />
    </div>
  );
}

const FormHeader = () => {
  return (
    <div className="pb-6 w-full flex items-center justify-center">
      <Link
        to="/"
        className="flex items-center text-4xl font-semibold text-red-500 justify-center"
      >
        <img src={logo} className=" h-16 mr-5" alt="" />
        <h1 className=" font-dancingScript">Release</h1>
      </Link>
    </div>
  );
};

//@type 0 for LogIn, 1 for SignIn
const Form = ({ type = 1, action, changeFormType }) => {
  const FORM = useRef();
  const submitAction = (e) => {
    e.preventDefault();
    action(FORM);
  };
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-base font-bold leading-tight tracking-tight  md:text-lg text-red-500">
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

        <p className="text-sm font-light text-red-500 ">
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
        className="  sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-white bg-red-500 focus:outline-none dark:text-red-500 dark:placeholder:text-red-500  placeholder:text-white text-white"
        placeholder="name@email.com"
        required={true}
      />
    </div>
  );
};
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
        className=" sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-white bg-red-500 focus:outline-none dark:text-red-500 dark:placeholder:text-red-500  placeholder:text-white text-white"
        required={true}
      />
    </div>
  );
};
const ForgotPassword = ({ show }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="remember"
            name="remember"
            aria-describedby="remember"
            type="checkbox"
            className="w-4 h-4 border border-red-300 rounded bg-red-500 focus:ring-3 focus:ring-red-300 dark:bg-red-700 dark:border-red-600 dark:focus:ring-red-600 dark:ring-offset-red-800"
            required=""
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="remember" className="text-red-500 ">
            Remember me
          </label>
        </div>
      </div>

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
const Button = ({ type }) => {
  return <BUTTON type="submit" title={type ? "Sign Up" : "Log In"} />;
};
