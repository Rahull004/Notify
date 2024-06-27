import React, { useState } from 'react'
import { passwordEmail } from '../appwrite/api';

export const ForgetPasswordEmail = () => {
  const [email, setemail] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setemail(value);
    } else if (name === "password") {
      setpassword(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await passwordEmail(email);
    alert("Email sent to your email address");
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
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue600 hover:bg-blue-600 w-full"
                        onClick={handleClick}
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
