import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ProfileNavbar from "../components/ProfileNavbar";
import {
  changePassword,
  changeUserName,
  getCurrentUser,
  saveUser,
} from "../appwrite/api";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useUserContext } from "../AuthContext";
import { account } from "../appwrite/config";
import { RingLoader } from "react-spinners";

function ProfilePage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showChangeUsernameForm, setShowChangeUsernameForm] = useState(false);
  const [showChangeCollegeDetailsForm, setShowChangeCollegeDetailsForm] =
    useState(false);
  const [newRollNo, setNewRollNo] = useState("");
  const [newPhoneNo, setNewPhoneNo] = useState("");
  const [newHostel, setNewHostel] = useState("");
  const [newRoomNo, setNewRoomNo] = useState("");
  const searchParams = useLocation();
  const [loading, setloading] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);

  const { user, isLoading } = useUserContext();

  useEffect(() => {
    const getAccDetails = async () => {
      try {
        const accountDetails = await account.getSession("current");
        if (accountDetails.provider === "google") {
          setIsGoogle(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAccDetails();
  }, []);

  if (user.email === "" && !isLoading) {
    navigate("/signin");
  }

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
      setloading(true);
      const result = await changeUserName(user.$id, newUsername);
      if (result) {
        window.location.reload();
        return result;
      }
    } catch (error) {
      console.log(error);
      alert("Error while changing username");
      setloading(false);
    } finally {
      setloading(false);
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
      setloading(true);
      const result = await changePassword(newPassword, oldPassword);
      if (result) {
        window.location.reload();
        return result;
      }
    } catch (error) {
      console.log(error);
      alert("Error while changing password");
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <RingLoader color="#0362e9" loading size={120} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <ProfileNavbar />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}

              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 flex justify-center items-center flex-col">
                <label className="cursor-pointer">
                  {user.url ? (
                    <img
                      src={user.url}
                      alt="Profile"
                      className="rounded-full w-[20vh] h-[20vh]"
                    />
                  ) : (
                    <img
                      src="./hero-image.png"
                      alt="Profile"
                      className="rounded-full w-[30vh] h-[30vh]"
                    />
                  )}
                </label>
                <br />
                <div className="flex flex-col justify-center items-center gap-4 p-6 bg-white shadow-lg rounded-lg w-[24rem]">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {user.fullname}
                  </h1>
                  <h2 className="text-xl text-gray-600">{user.email}</h2>
                  <div className="flex flex-col mt-6 w-full">
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      College Details:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                      <p className="text-md text-gray-800 mb-2">
                        <span className="font-semibold">Roll No:</span>{" "}
                        {user.roolno}
                      </p>
                      <p className="text-md text-gray-800 mb-2">
                        <span className="font-semibold">Phone No:</span>{" "}
                        {user.phoneNo}
                      </p>
                      <p className="text-md text-gray-800 mb-2">
                        <span className="font-semibold">Hostel Name:</span>{" "}
                        {user.hostel}
                      </p>
                      <p className="text-md text-gray-800">
                        <span className="font-semibold">Room No:</span>{" "}
                        {user.roomNo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                      <button
                        className="btn px-0 text-white bg-gray900 hover:bg-gray-800 w-full relative flex items-center"
                        onClick={usernameForm}
                      >
                        <MdOutlineDriveFileRenameOutline className="h-[30px] w-[30px]" />
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Change Username
                        </span>
                      </button>
                    </div>
                  </div>
                  {showChangeUsernameForm && (
                    <div className="flex flex-col w-full">
                      <div className="w-full">
                        <input
                          type="text"
                          name="newUsername"
                          placeholder="New Username"
                          value={newUsername}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                      <div className="w-full mt-3 hover:cursor-pointer">
                        <buttonFlog
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          onClick={handleChangeUsername}
                        >
                          Submit
                        </buttonFlog>
                      </div>
                    </div>
                  )}
                  {!isGoogle && (
                    <div className="flex flex-wrap -mx-3 mb-3">
                      <div className="w-full px-3">
                        <button
                          className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                          onClick={passwordForm}
                        >
                          <RiLockPasswordLine className="h-[25px] w-[25px]" />
                          <span className="flex-auto pl-16 pr-8 -ml-16">
                            Change Passsword
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {showChangePasswordForm && (
                    <div className="flex flex-wrap -mx-3 mb-3">
                      <div className="w-full px-3 mt-3">
                        <input
                          type="password"
                          name="oldPassword"
                          placeholder="Old Password"
                          value={oldPassword}
                          onChange={handleChange}
                          className="form-input w-full"
                        />
                      </div>
                      <div className="w-full px-3 mt-3">
                        <input
                          type="password"
                          name="newPassword"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={handleChange}
                          className="form-input w-full"
                        />
                      </div>
                      <div className="w-full px-3 mt-3">
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={handleChange}
                          className="form-input w-full"
                        />
                      </div>
                      <div className="w-full px-3 mt-3">
                        <button
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          onClick={handleChangePassword}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap -mx-3 mt-3 mb-3">
                    <div className="w-full px-3">
                      <button
                        className="btn px-0 text-white bg-gray900 hover:bg-gray-800 w-full relative flex items-center"
                        onClick={collegeDetailsForm}
                      >
                        <MdOutlineDriveFileRenameOutline className="h-[30px] w-[30px]" />
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Change College Details
                        </span>
                      </button>
                    </div>
                  </div>
                  {showChangeCollegeDetailsForm && (
                    <div className="flex flex-col w-full">
                      <div className="w-full mb-3">
                        <input
                          type="text"
                          name="newRollNo"
                          placeholder="New Roll No"
                          value={newRollNo}
                          // onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="w-full mb-3">
                        <input
                          type="text"
                          name="newPhoneNo"
                          placeholder="New Phone No"
                          value={newPhoneNo}
                          // onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="w-full mb-3">
                        <input
                          type="text"
                          name="newHostel"
                          placeholder="New Hostel"
                          value={newHostel}
                          // onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="w-full mb-3">
                        <input
                          type="text"
                          name="newRoomNo"
                          placeholder="New Room No"
                          value={newRoomNo}
                          // onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="w-full mt-3 hover:cursor-pointer">
                        <button
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          // onClick={handleChangeCollegeDetails}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
