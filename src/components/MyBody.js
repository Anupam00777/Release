/**
 * MyBody.js
 *
 * Summary:
 * This component represents the main body of every page. It serves as a wrapper for the content of each page.
 *
 * @param {object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The content to be rendered within the body.
 *
 * @returns {JSX.Element} The main element containing the provided children.
 */

import React from "react";

/**
 * @param {ReactNode} children - The content to be rendered within the body.
 *
 * @returns {JSX.Element} The main element containing the provided children.
 */
function MyBody({ children }) {
  return (
    <main className="flex flex-1 flex-col bg-primary-light-900 dark:bg-primary-dark-900">
      {children}
    </main>
  );
}

export default MyBody;
