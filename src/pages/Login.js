import React from "react";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
import logo from "../components/logo.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="h-screen flex flex-col">
      <MyHeader isSearchBarEnabled={false} navLinks={[]} />
      <section className="bg-gray-50 dark:bg-gray-900 flex-1 px-4 flex flex-col justify-center items-center">
        <FormHeader />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 font-hind max-w-[400px]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-base font-bold leading-tight tracking-tight  md:text-lg text-red-500">
              Sign in to your account
            </h1>
            <Form />
          </div>
        </div>
      </section>
      <MyFooter
        navLinks={[
          {
            sno: 1,
            title: "Github",
            href: "https://github.com/Anupam00777/Release/",
          },
          { sno: 2, title: "About", href: "/About" },
          { sno: 3, title: "Help", href: "/" },
        ]}
        footerFormEnabled={false}
        footerNavEnabled={false}
      />
    </div>
  );
}

const FormHeader = () => {
  return (
    <div className="pb-6 w-full">
      <Link
        to="/"
        className="flex items-center text-4xl font-semibold text-red-500 justify-center"
      >
        <img src={logo} className=" h-16 mx-5" alt="" />
        <h1 className=" font-dancingScript">Release</h1>
      </Link>
    </div>
  );
};

const Form = () => {
  return (
    <form className="space-y-4 md:space-y-6" action="#">
      <EmailField />
      <PasswordField />
      <ForgotPassword />
      <SignInButton />

      <p className="text-sm font-light text-red-500 ">
        Don't have an account yet?{" "}
        <Link to="/" className="font-medium text-primary-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

const EmailField = () => {
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
        name="email"
        id="email"
        className="  sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-white bg-red-500 focus:outline-none dark:text-red-500 dark:placeholder:text-red-500  placeholder:text-white text-white"
        placeholder="name@email.com"
        required=""
      />
    </div>
  );
};
const PasswordField = () => {
  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-red-500"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        className=" sm:text-sm rounded-lg   block w-full p-2.5 dark:bg-white bg-red-500 focus:outline-none dark:text-red-500 dark:placeholder:text-red-500  placeholder:text-white text-white"
        required=""
      />
    </div>
  );
};
const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="remember"
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
      <Link
        to="/"
        className="text-sm font-medium text-primary-600 hover:underline text-red-500"
      >
        Forgot password?
      </Link>
    </div>
  );
};
const SignInButton = () => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-red-500 text-center dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-red-800"
    >
      Sign in
    </button>
  );
};
