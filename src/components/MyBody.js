//The main body of every page. This is just a wrapper.
import React from "react";

function MyBody({ children }) {
  return (
    <main className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-950">
      {children}
    </main>
  );
}

export default MyBody;
