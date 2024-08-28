import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../appwrite/api';
import logo from "/logo2.png"

function ProfileNavbar() {

  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  const navigate = useNavigate()

  const handleLogOut = async()=> {
    try {
      const res = await logOut()
      console.log(res);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && "bg-white backdrop-blur-sm shadow-lg"}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" aria-label="Home">
              <img
                src={logo}
                className="w-12 h-12 md:w-16 md:h-16 rounded"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn-sm text-gray200 hover:bg-gray900-87 bg-gray900 ml-3 "
                >
                  {" "}
                  {/*only redirection to homepage happening not actual sign out yet..backend functionality reqd*/}
                  <span className="p-0.5">Log Out</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default ProfileNavbar;
