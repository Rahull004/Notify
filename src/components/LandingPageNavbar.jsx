import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

function Header({ user }) {
  const [top, setTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`fixed w-full z-30 transition duration-300 ease-in-out ${
        !top ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="block" aria-label="Home">
              <img
                src="/favicon.png"
                alt="Logo"
                className="w-12 h-12 max-md:w-9 max-md:h-9 rounded"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          {/* <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div> */}

          {/* Navigation */}
          <nav className={`block`}>
            <ul className="flex items-center justify-center space-x-2 sm:space-x-4  w-full">
              {renderNavItems(user)}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {/* {isOpen && (
        <div className="absolute right-0  bg-white rounded-md shadow-lg z-50">
          <div className="flex items-center justify-center p-2">
            <ul className="flex flex-col gap-2 justify-evenly items-center  w-full">
              {renderNavItems(user)}
            </ul>
          </div>
        </div>
      )} */}
    </header>
  );
}

function renderNavItems(user) {
  return !user?.$id ? (
    <>
      <li>
      <Link to="/signin" className="font-medium text-gray900-60 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">

          <span>Sign in</span>
          {/* <svg
            className="w-3 h-3 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg> */}
        </Link>
      </li>
      <li>
        <Link
          to="/signup"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray900 hover:bg-gray-800 transition duration-150 ease-in-out"
        >
          <span>Sign up</span>
          <svg
            className="w-3 h-3 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link
          to="/allNotes"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition duration-150 ease-in-out"
        >
          <span>View Notes</span>
          <svg
            className="w-3 h-3 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </li>
      <li>
        <Link to="/profile" className="block">
          {user.avatar ? (
            <img
              src={user.url}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-8 h-8 text-gray-600" />
          )}
        </Link>
      </li>
    </>
  );
}

export default Header;
