//A bottom menu component, made up of icons to navigate through the app
import React from "react";
import { Link } from "react-router-dom";

function BottomMenu({ children, childClasses }) {
  return (
    <div className="flex fixed bottom-0 dark:bg-black bg-white text-red-500 items-center w-full px-5">
      <div
        className={`menu flex h-full p-3 mx-auto justify-between sm:justify-evenly  items-center w-full max-w-[1024px]`}
      >
        {/*The elements are alredy set in data.js. We will map and set the Links accordingly. Then render each component. */}
        {children.map((e) => {
          return e.sno ? (
            <Link
              key={e.sno}
              to={e.href}
              title={e.title}
              className={childClasses}
            >
              {e.entity}
            </Link>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
}

export default BottomMenu;
