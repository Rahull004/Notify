import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useUserContext } from "../AuthContext";
import { account } from "../appwrite/config";
import { RingLoader } from "react-spinners";
import ProfileNavbar from "../components/ProfileNavbar";
import { changePassword, changeUserName, updateUser } from "../appwrite/api";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, isLoading } = useUserContext();
  console.log(user);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showChangeUsernameForm, setShowChangeUsernameForm] = useState(false);
  const [showChangeCollegeDetailsForm, setShowChangeCollegeDetailsForm] = useState(false);
  const [newRollNo, setNewRollNo] = useState("");
  const [newPhoneNo, setNewPhoneNo] = useState("");
  const [newHostel, setNewHostel] = useState("");
  const [newRoomNo, setNewRoomNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "newUsername") {
      setNewUsername(value);
    } else if (name === "oldPassword") {
      setoldPassword(value);
    } else if (name === "newRollNo") {
      setNewRollNo(value);
    } else if (name === "newPhoneNo") {
      setNewPhoneNo(value);
    } else if (name === "newHostel") {
      setNewHostel(value);
    } else if (name === "newRoomNo") {
      setNewRoomNo(value);
    }
  };

  const collegeDetailsForm = (e) => {
    e.preventDefault();
    setShowChangeCollegeDetailsForm(!showChangeCollegeDetailsForm);
  };

  const passwordForm = (e) => {
    e.preventDefault();
    setShowChangePasswordForm((prev) => !prev);
  };

  const usernameForm = (e) => {
    e.preventDefault();
    setShowChangeUsernameForm((prev) => !prev);
  };

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await changeUserName(user.$id, newUsername);
      if (result) {
        window.location.reload();
        return result;
      }
    } catch (error) {
      console.log(error);
      alert("Error while changing username");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password should be of atleast 8 characters");
      return;
    }
    try {
      setLoading(true);
      const result = await changePassword(newPassword, oldPassword);
      if (result) {
        window.location.reload();
        return result;
      }
    } catch (error) {
      console.log(error);
      alert("Error while changing password");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCollegeDetails = (e) => {
    e.preventDefault();
    const newDetails = {
      rollNo: newRollNo || user?.rollno,
      phoneNo: newPhoneNo || user?.phone,
      hostelName: newHostel || user?.hostelname,
      roomNo: newRoomNo || user?.roomno,
    };
    try {
      const result = updateUser(user?.$id, newDetails);

      if (result) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { ease: "easeInOut" }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-sans">
      <ProfileNavbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <motion.div
                className="max-w-3xl mx-auto text-center pb-12 md:pb-20 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  {user.url ? (
                    <motion.img
                      src={user.url}
                      alt="Profile"
                      className="rounded-full w-40 h-40 shadow-xl border-4 border-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
                  ) : (
                    <motion.img
                      src="./hero-image.png"
                      alt="Profile"
                      className="rounded-full w-40 h-40 shadow-xl border-4 border-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
                  )}
                </motion.label>

                <motion.div
                  className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg w-full max-w-md mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl font-bold text-gray-800">
                    {user.fullname}
                  </h1>
                  <h2 className="text-lg text-gray-600">{user.email}</h2>

                  <div className="w-full mt-6">
                    <p className="text-lg font-semibold text-gray-700 mb-4">
                      College Details:
                    </p>
                    <motion.div
                      className="bg-gray-50 p-6 rounded-lg shadow-inner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="space-y-3">
                        <DetailItem label="Roll No" value={user?.rollno} />
                        <DetailItem label="Phone No" value={user?.phone} />
                        <DetailItem label="Hostel Name" value={user?.hostelname} />
                        <DetailItem label="Room No" value={user?.roomno} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="max-w-sm mx-auto space-y-4">
                {/* Username Change */}
                <motion.div variants={buttonVariants}>
                  <button
                    className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    onClick={usernameForm}
                  >
                    <MdOutlineDriveFileRenameOutline className="w-6 h-6 mr-2" />
                    Change Username
                  </button>
                </motion.div>

                <AnimatePresence>
                  {showChangeUsernameForm && (
                    <motion.div
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-white p-4 rounded-lg shadow-inner"
                    >
                      <input
                        type="text"
                        name="newUsername"
                        placeholder="New Username"
                        value={newUsername}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <motion.button
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={handleChangeUsername}
                        variants={buttonVariants}
                        disabled={loading}
                      >
                        {loading ? (
                          <RingLoader color="#fff" size={24} />
                        ) : (
                          "Update Username"
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Password Change */}
                {!isGoogle && (
                  <>
                    <motion.div variants={buttonVariants}>
                      <button
                        className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        onClick={passwordForm}
                      >
                        <RiLockPasswordLine className="w-6 h-6 mr-2" />
                        Change Password
                      </button>
                    </motion.div>

                    <AnimatePresence>
                      {showChangePasswordForm && (
                        <motion.div
                          variants={formVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="bg-white p-4 rounded-lg shadow-inner space-y-4"
                        >
                          <input
                            type="password"
                            name="oldPassword"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                          <motion.button
                            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            onClick={handleChangePassword}
                            variants={buttonVariants}
                            disabled={loading}
                          >
                            {loading ? (
                              <RingLoader color="#fff" size={24} />
                            ) : (
                              "Update Password"
                            )}
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* College Details Change */}
                <motion.div variants={buttonVariants}>
                  <button
                    className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    onClick={collegeDetailsForm}
                  >
                    <MdOutlineDriveFileRenameOutline className="w-6 h-6 mr-2" />
                    Update College Details
                  </button>
                </motion.div>

                <AnimatePresence>
                  {showChangeCollegeDetailsForm && (
                    <motion.div
                      variants={formVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-white p-4 rounded-lg shadow-inner space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          name="newRollNo"
                          placeholder="New Roll No"
                          value={newRollNo}
                          onChange={handleChange}
                        />
                        <InputField
                          name="newPhoneNo"
                          placeholder="New Phone No"
                          value={newPhoneNo}
                          onChange={handleChange}
                        />
                        <InputField
                          name="newHostel"
                          placeholder="New Hostel"
                          value={newHostel}
                          onChange={handleChange}
                        />
                        <InputField
                          name="newRoomNo"
                          placeholder="New Room No"
                          value={newRoomNo}
                          onChange={handleChange}
                        />
                      </div>
                      <motion.button
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={handleChangeCollegeDetails}
                        variants={buttonVariants}
                      >
                        Update Details
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="font-medium text-gray-700">{label}:</span>
    <span className="text-gray-600">{value || "-"}</span>
  </div>
);

const InputField = ({ name, placeholder, value, onChange }) => (
  <input
    type="text"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
);

export default ProfilePage;