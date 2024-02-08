import React from "react";
import { Link } from "react-router-dom";

/**
 * BottomMenu component represents a bottom navigation menu of icons to navigate through the app.
 * It receives children and childClasses as props.
 *
 * @param {Array} children - Array of objects representing menu items.
 * @param {string} childClasses - CSS classes for menu items.
 * @returns {JSX.Element} Bottom navigation menu component.
 */
function BottomMenu({ children, childClasses }) {
  return (
    // Render the bottom menu component
    <div className="flex fixed bottom-0 dark:bg-primary-dark bg-primary-light text-secondary-light items-center w-full px-5">
      <div
        className={`menu flex h-full p-3 mx-auto justify-between sm:justify-evenly items-center w-full max-w-[1024px]`}
      >
        {/* Map through children array and render each menu item */}
        {children.map((e) => {
          return e.sno ? (
            <Link
              key={e.sno}
              to={e.href}
              title={e.title}
              className={childClasses}
              onClick={e.onClick}
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
