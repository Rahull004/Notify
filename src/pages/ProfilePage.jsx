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
  const [profileImage, setProfileImage] = useState(null);
  const [newImageUrl, setnewImageUrl] = useState("");
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

  const passwordForm = (e) => {
    e.preventDefault();
    setShowChangePasswordForm((prev) => !prev);
  };

  const usernameForm = (e) => {
    e.preventDefault();
    setShowChangeUsernameForm((prev) => !prev);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setnewImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitImage = async () => {
    try {
      setLoading(true);
      await saveProfilePicture(profileImage);
      alert("Profile picture updated successfully");
      setProfileImage(null);
      setnewImageUrl("");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Error while updating profile picture");
    } finally {
      setLoading(false);
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
                      className="rounded-full w-[30vh] h-[30vh]"
                    />
                  ) : (
                    <img
                      src="./hero-image.png"
                      alt="Profile"
                      className="rounded-full w-[30vh] h-[30vh]"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <br />
                <h1 className="h1">{user.fullname}</h1>
                <h2 className="h2">{user.email}</h2>
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
                      <div className="w-full mt-3">
                        <buttonFlog
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          onClick={handleChangePassword}
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
