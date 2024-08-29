import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function SignUp() {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setname(value);
    } else if (name === "email") {
      setemail(value);
    } else if (name === "password") {
      setpassword(value);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Navbar />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Thank You for chosing Notify! <br />
                  Please provide some more your basic details..
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="string"
                      >
                        Roll No. <span className="text-red-600">*</span>
                      </label>
                      <input
                        onchange={handleChange}
                        id="rollNo"
                        type="string"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your roll no."
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="number"
                      >
                        Phone No. <span className="text-red-600">*</span>
                      </label>
                      <input
                        onchange={handleChange}
                        id="phoneNo"
                        type="tel"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your phone no."
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Hostel Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        onchange={handleChange}
                        id="name"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Bh1, Bh2, etc"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="number"
                      >
                        Room No. <span className="text-red-600">*</span>
                      </label>
                      <input
                        onchange={handleChange}
                        id="roomNo"
                        type="tel"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your room no."
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue600 hover:bg-blue-600 w-full">
                        Complete Onboarding
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-gray900-87 text-center mt-6">
                  Already using Notify?{" "}
                  <Link
                    to="/signin"
                    className="text-blue600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
