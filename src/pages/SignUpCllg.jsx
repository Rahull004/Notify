import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useUserContext } from "@/AuthContext";
import { updateUser } from "@/appwrite/api";

function SignUp() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [hostelName, setHostelName] = useState(user?.hostelname || "");
  const [roomNo, setRoomNo] = useState(user?.roomno || "");
  console.log(user);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rollNo") {
      setRollNo(value);
    } else if (name === "hostelName") {
      setHostelName(value);
    } else if (name === "phoneNo") {
      setPhoneNo(value);
    } else if (name === "roomNo") {
      setRoomNo(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        alert("Account cannot be created");
      } else {
        const newUser = await updateUser(user.$id, {
          rollNo,
          phoneNo,
          hostelName,
          roomNo,
        });
        if (!newUser) {
          alert("Account cannot be created");
        } else {
          console.log(newUser);
          navigate("/signupcllg");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Error while creating new account");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Thank You for choosing Notify! <br />
                  Please provide some more of your basic details..
                </h1>
              </div>
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="rollNo"
                      >
                        Roll No. <span className="text-red-600">*</span>
                      </label>
                      <input
                        onChange={handleChange}
                        id="rollNo"
                        name="rollNo"
                        type="text"
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
                        htmlFor="phoneNo"
                      >
                        Phone No. <span className="text-red-600">*</span>
                      </label>
                      <input
                        onChange={handleChange}
                        id="phoneNo"
                        name="phoneNo"
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
                        htmlFor="hostelName"
                      >
                        Hostel Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        onChange={handleChange}
                        id="hostelName"
                        name="hostelName"
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
                        htmlFor="roomNo"
                      >
                        Room No. <span className="text-red-600">*</span>
                      </label>
                      <input
                        onChange={handleChange}
                        id="roomNo"
                        name="roomNo"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your room no."
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        type="submit"
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        Complete Onboarding
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Already using Notify?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
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
