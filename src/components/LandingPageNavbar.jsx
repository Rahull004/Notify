import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";
import { Menu, User } from "lucide-react";

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
                src={logo}
                alt="Logo"
                className="w-12 h-12 md:w-16 md:h-16 rounded"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className={`${isOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-4">
              {!user.$id ? (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="block py-2 md:py-1 px-2 text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition duration-150 ease-in-out"
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
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
