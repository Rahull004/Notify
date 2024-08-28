import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

function Header({user}) {

  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && "bg-white backdrop-blur-sm shadow-lg"}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Notify">
              <img src={logo} className="w-20 h-20 rounded bg-transparent" />
            </Link>
          </div>

          {/* Site navigation */}
          {!user.$id && (
            <nav className="flex flex-grow">
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    to="/signin"
                    className="font-medium text-gray900-60 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="btn-sm text-gray200 hover:bg-gray900-87 bg-gray900 ml-3"
                  >
                    <span>Sign up</span>
                    <svg
                      className="w-3 h-3 fill-current text-gray-300 flex-shrink-0 ml-2 -mr-1"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          {user.$id && (
            <div className="flex flex-grow gap-4 justify-end flex-wrap items-center">
              <Link
                to="/allNotes"
                className="btn-sm text-gray200 hover:bg-gray900-87 bg-gray900 ml-3"
              >
                <span>View Notes</span>
                <svg
                  className="w-3 h-3 fill-current text-gray-300 flex-shrink-0 ml-2 -mr-1"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                    fillRule="nonzero"
                  />
                </svg>
              </Link>
              <Link className="w-20 h-10 m-2" to={"/profile"}>
                {user.avatar === "" ? (
                  <svg
                  className='w-10 h-10 rounded-full'
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 512 512"
                    id="profile"
                  >
                    <g data-name="<Group>">
                      <path
                        fill="#ed664c"
                        d="M389.25 403.71v24.83a218.018 218.018 0 0 1-266.5 0V403.71a133.25 133.25 0 0 1 266.5 0zM304.09 124.82a67.514 67.514 0 1 1-47.64-19.67A67.064 67.064 0 0 1 304.09 124.82z"
                      ></path>
                      <path
                        fill="#fdc75b"
                        d="M256,38c120.4,0,218,97.6,218,218a217.579,217.579,0,0,1-84.75,172.54V403.71a133.25,133.25,0,0,0-266.5,0v24.83A217.579,217.579,0,0,1,38,256C38,135.6,135.6,38,256,38Zm67.76,134.46a67.158,67.158,0,1,0-19.67,47.63A67.064,67.064,0,0,0,323.76,172.46Z"
                      ></path>
                      <path d="M256,28A228.09,228.09,0,0,0,52.1,358.141a230.034,230.034,0,0,0,64.528,78.309,228.02,228.02,0,0,0,278.735,0A230.007,230.007,0,0,0,459.9,358.141,228.045,228.045,0,0,0,256,28ZM132.75,423.557V403.71a123.25,123.25,0,0,1,246.5,0v19.847a208.024,208.024,0,0,1-246.5,0Zm266.5-16.749v-3.1c0-78.988-64.262-143.25-143.25-143.25A143.257,143.257,0,0,0,112.75,403.71v3.1A206.439,206.439,0,0,1,48,256C48,141.309,141.309,48,256,48s208,93.309,208,208A206.444,206.444,0,0,1,399.25,406.808Z"></path>
                      <path d="M256.45,95.15a77.158,77.158,0,1,0,54.713,22.6A76.787,76.787,0,0,0,256.45,95.15Zm40.566,117.872a57.513,57.513,0,1,1,16.745-40.562A56.931,56.931,0,0,1,297.016,213.022Z"></path>
                    </g>
                  </svg>
                ) : (
                  <img
                    src={user.url}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
