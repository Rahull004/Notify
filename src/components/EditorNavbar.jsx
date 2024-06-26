import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EditorNavbar() {
  return (
    <header
      className={`w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out bg-white backdrop-blur-sm shadow-lg`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Notify">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient
                    cx="21.152%"
                    cy="86.063%"
                    fx="21.152%"
                    fy="86.063%"
                    r="79.941%"
                    id="header-logo"
                  >
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect
                  width="32"
                  height="32"
                  rx="16"
                  fill="url(#header-logo)"
                  fillRule="nonzero"
                />
              </svg>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap ">
            <div className="flex justify-center items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="#DA012D"
              >
                <path d="M14.59,2.59C14.21,2.21,13.7,2,13.17,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V7.83 c0-0.53-0.21-1.04-0.59-1.41L14.59,2.59z M13,7V3.5L18.5,9H15C14.45,9,14,8.55,14,8C14,7.45,13.55,7,13,7z M9,13 c0-0.55-0.45-1-1-1H6v2h2v2H6v2h2c0.55,0,1-0.45,1-1v-1c0-0.55,0.45-1,1-1s1,0.45,1,1v1c0,1.1-0.9,2-2,2H5c-0.55,0-1-0.45-1-1v-2 c0-0.55,0.45-1,1-1h2c0.55,0,1-0.45,1-1v-1c0-0.55-0.45-1-1-1S6,11.45,6,12H5c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h3 c1.1,0,2-0.9,2-2v-1C11,14.9,10.1,14,9,14z M20,18h-2v1c0,0.55-0.45,1-1,1s-1-0.45-1-1v-1h-2c-0.55,0-1-0.45-1-1s0.45-1,1-1h2v-1 c0-0.55,0.45-1,1-1s1,0.45,1,1v1h2c0.55,0,1,0.45,1,1S20.55,18,20,18z" />
              </svg>

              <p>PDF's</p>
            </div>

            <div className="w-10 h-10">
              <svg
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
            </div>
            <button className="bg-blue400 px-3 rounded-full py-2 md:py-3 w-20 text-white">
              + Add
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default EditorNavbar;
