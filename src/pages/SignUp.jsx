import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { RingLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import { createUserAccount, githubAuth, googleAuth } from "../appwrite/api";
import { useUserContext } from "../AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useLocation();
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useUserContext();
  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await createUserAccount({ name, email, password });
      if (!user) {
        alert("Account cannot be created");
        navigate("/signup");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    await googleAuth(searchParams.pathname);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-sans">
      <Navbar />
      <main className="flex-grow">
        <motion.section
          className="bg-gradient-to-b from-gray-100 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <motion.div
                className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                  Create Your Account
                </h1>
                <p className="mt-2 text-lg md:text-xl text-gray-600">
                  Join now to unlock all features
                </p>
              </motion.div>
              <AnimatePresence>
                <motion.div
                  ref={formRef}
                  className="max-w-sm mx-auto bg-white shadow-xl rounded-lg p-8"
                  initial={{ y: 40, opacity: 0 }}
                  animate={formInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <form>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-semibold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        className="form-input w-full text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-semibold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        className="form-input w-full text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-semibold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        className="form-input w-full text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <motion.button
                        className="w-full py-2 rounded-md font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        onClick={handleSignUp}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                      >
                        {loading ? (
                          <RingLoader color="#fff" size={24} />
                        ) : (
                          "Sign Up"
                        )}
                      </motion.button>
                    </div>
                  </form>
                  <div className="flex items-center my-6">
                    <div
                      className="border-t border-gray-300 flex-grow mr-3"
                      aria-hidden="true"
                    ></div>
                    <div className="text-gray-500 italic">Or</div>
                    <div
                      className="border-t border-gray-300 flex-grow ml-3"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <form>
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full px-3">
                        <motion.button
                          className="relative flex items-center justify-center w-full py-2 rounded-md font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                          onClick={handleGoogleAuth}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg
                            className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mr-2"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                          </svg>
                          Continue with Google
                        </motion.button>
                      </div>
                    </div>
                  </form>
                  <div className="text-gray-600 text-center mt-6">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                    >
                      Sign in
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default SignUp;