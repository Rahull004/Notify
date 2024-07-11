import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
  getCurrentUser,
  googleAuth,
  saveUser,
  signInAccount,
} from "../appwrite/api";
import { useUserContext } from "../AuthContext";
import { RingLoader } from "react-spinners";

function SignIn() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const searchParams = useLocation();
  const [loading, setloading] = useState(false);
  const { user, isLoading } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setemail(value);
    } else if (name === "password") {
      setpassword(value);
    }
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    await googleAuth(searchParams.pathname);
  };

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const user = await getCurrentUser();
  //     console.log("user", user[0]);
  //     if (user[0] === 0) {
  //       const avatar = user[2];
  //       const newUser = await saveUser({
  //         accountid: user[1].$id,
  //         email: user[1].email,
  //         imageurlurl: avatar,
  //         fullname: user[1].name,
  //       });
  //       console.log("new user", newUser);
  //       if (newUser) {
  //         navigate("/allnotes");
  //       } else {
  //         alert("something went wrong");
  //       }
  //     } else if (user[0] !== undefined) {
  //       navigate("/allnotes");
  //     }
  //   };
  //   checkSession();
  // }, []);

  if (user.email !== "" && !isLoading) {
    navigate("/allnotes");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInAccount(email, password);
      if (!user) {
        alert("something went wrong");
      }
      navigate("/allnotes");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />
      </div>
    );
  }

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
                  Welcome back ! <br />
                  <span className="">
                    Lets continue where you left off.
                  </span>{" "}
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray900 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        onChange={handleChange}
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray900 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <Link
                          to="/forgetpassword/email"
                          className="text-sm font-medium text-blue600 hover:underline"
                        >
                          Having trouble signing in?
                        </Link>
                      </div>
                      <input
                        name="password"
                        onChange={handleChange}
                        id="password"
                        type="password"
                        className="form-input w-full text-gray900"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
              
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue600 hover:bg-blue-600 w-full"
                        onClick={handleLogin}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button
                        className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                        onClick={handleGoogleAuth}
                      >
                        <svg
                          className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Continue with Google
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Don’t you have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign up
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

export default SignIn;
