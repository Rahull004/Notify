import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserContext } from "@/AuthContext";
import { updateUser, saveGoogleUser } from "@/appwrite/api";
import Navbar from "../components/Navbar";
import { RingLoader } from "react-spinners";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const inputVariants = {
  focus: { scale: 1.02 },
  hover: { scale: 1.02 },
};

function SignUp() {
  const { user, isLoading } = useUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNo: user?.rollno || "",
    phoneNo: user?.phone || "",
    hostelName: user?.hostelname || "",
    roomNo: user?.roomno || "",
  });
  const [loading, setLoading] = useState(false);
  // Save Google user data when component mounts
  useEffect(() => {
    const checkAndSaveOAuthUser = async () => {
      if (!isLoading && user) {
        try {
          // Try to save the Google user data to database
          const result = await saveGoogleUser();
          if (result) {
            console.log("Google user data saved successfully:", result);
          }
        } catch (error) {
          console.error("Error saving OAuth user:", error);
        }
      }
    };

    checkAndSaveOAuthUser();
  }, [user, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = await updateUser(user.$id, formData);
      if (newUser) navigate("/signin");
    } catch (error) {
      console.error(error);
      alert("Error updating details");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-sans">
      <Navbar />
      <main className="flex-grow">
        <motion.section
          className="bg-gradient-to-b from-gray-100 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <motion.div
                className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Complete Your Profile
                </h1>
                <p className="text-lg text-gray-600">
                  Help us personalize your Notify experience
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="max-w-sm mx-auto space-y-6"
                variants={formVariants}
              >
                {Object.entries(formData).map(([key, value]) => (
                  <motion.div
                    key={key}
                    variants={inputVariants}
                    whileHover="hover"
                    whileFocus="focus"
                  >
                    <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <RingLoader color="#fff" size={24} />
                  ) : (
                    "Complete Setup"
                  )}
                </motion.button>
              </motion.form>

              <motion.div
                className="text-center mt-8 text-gray-600"
                variants={formVariants}
              >
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default SignUp;
