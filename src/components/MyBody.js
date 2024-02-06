//The main body of every page. This is just a wrapper.
import React from "react";

function MyBody({ children }) {
  return (
    <main className="flex flex-1 flex-col bg-primary-light-900 dark:bg-primary-dark-900">
      {children}
    </main>
  );
}

export default MyBody;
