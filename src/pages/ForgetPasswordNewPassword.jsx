import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { logOut, resetPassword } from '../appwrite/api';

export const ForgetPasswordNewPassword = () => {
    const searchParams = useLocation();
    const urlParams = new URLSearchParams(searchParams.search);
    const navigate = useNavigate();
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");


    const [password, setPassword] = useState("");
    const handlePasswordReset = async (e) => {
      try {
        e.preventDefault();
            console.log(userId, secret, password);
        const res = await resetPassword(userId, secret, password);
        console.log(res);

        const logout = await logOut();
        if (logout) {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "email") {
        setemail(value);
      } else if (name === "password") {
        setPassword(value);
      }
    };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray900 text-sm font-medium mb-1"
                      >
                        Password
                      </label>
                      <input
                        name="password"
                        onChange={handleChange}
                        id="password"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password address"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3"></div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue600 hover:bg-blue-600 w-full"
                        onClick={handlePasswordReset}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
