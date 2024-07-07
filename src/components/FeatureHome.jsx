import React, { useState, useRef, useEffect } from "react";
// import Transition from '../utils/Transition';

import ai from "/ai.jpg";
import notes1 from "/notes1.jpg";
import comm from "/comm.png";

function FeatureHome() {
  const [tab, setTab] = useState(1);

  const tabs = useRef(null);

  const heightFix = () => {
    if (tabs.current.children[tab]) {
      tabs.current.style.height =
        tabs.current.children[tab - 1].offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
  }, [tab]);

  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explore Notify</h1>
            <p className="text-xl text-gray900-60">
              Take a tour of Notify and unlock a new way to organize your study
              materials. Notify is designed to make capturing and retrieving
              your study notes easier than ever.
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Why Notify?</h3>
                <p className="text-xl text-gray900-60">
                  Optimize your study workflow with Notify's ability to upload
                  notes, PDFs, and links, all accessible in one organized
                  platform.
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <div
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200/90 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Notes Management
                    </div>
                    <div className="text-gray900-60">
                      Streamline your note-taking process effortlessly with our
                      intuitive tools, ensuring all your thoughts are captured
                      and organized efficiently.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200/90 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Upload PDFs and AI chatbox
                    </div>
                    <div className="text-gray900-60">
                      Upload your PDFs and Links seamlessly and utilize our
                      AI-powered chatbox for instant and correct answers to all
                      your queries.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200/90 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Personal and Community Notes
                    </div>
                    <div className="text-gray900-60">
                      Capture personal insights and collaborate on community
                      notes seamlessly within one intuitive platform to upgrade
                      yourself.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z"
                        fill="#191919"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs items */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
              data-aos="zoom-y-out"
              ref={tabs}
            >
              <div className="relative flex flex-col text-center lg:text-right">
                {/* Item 1 */}
                <div
                  className={`relative inline-flex flex-col ${
                    tab != 1 && "hidden"
                  }`}
                >
                  <img
                    className="md:max-w-none mx-auto rounded"
                    src={notes1}
                    width="600"
                    style={{ margin: '160px 0px 0px 50px' }}
                    alt="Notes bg"
                  />
                </div>

                {/* Item 2 */}

                <div
                  className={`relative inline-flex flex-col ${
                    tab != 2 && "hidden"
                  } `}
                >
                  <img
                    className="md:max-w-none mx-auto rounded"
                    src={ai}
                    width="600"
                    style={{ margin: '220px 0px 0px 50px' }}
                    alt="AI bg"
                  />
                </div>

                {/* Item 3 */}

                <div
                  className={`relative inline-flex flex-col ${
                    tab != 3 && "hidden"
                  } `}
                >
                  <img
                    className="md:max-w-none mx-auto rounded"
                    src={comm}
                    width="600"
                    style={{ margin: '300px 0px 0px 50px', height: '375px'}}
                    alt="Community bg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureHome;
