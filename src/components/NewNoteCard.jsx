import React from "react";
import { CustomDropdown } from "./CustomDropDown";

export const NewNoteCard = () => {
  return (
    <div>
      <div className="bg-white py-4 px-5 rounded-xl shadow-xl absolute w-3/4 translate-x-[15%] md:translate-x-1/2 md:w-1/2 translate-y-1/2">
        <div className="flex justify-between mt-2 items-center">
          <h1 className="text-xl font-bold">Add note</h1>
          <img src="../../public/Edit.png" className="h-4 w-4" />
        </div>
        <div className="flex gap-4 mt-6 flex-col md:flex-row">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="title"
              className="text-sm text-black/80 font-semibold"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded-lg p-2 mt-1 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-black/50 placeholder:text-sm placeholder:font-semibold"
              placeholder="Add Title"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="category"
              className="text-sm text-black/80 font-semibold"
            >
              Category
            </label>
            <CustomDropdown />
          </div>
        </div>
        <div className="flex items-center justify-between mt-10">
          <div className="flex">
            <p className="text-sm text-black/80 font-semibold">Description</p>
            <span className="text-sm text-black/80 ml-1">(Optional)</span>
          </div>
          <p className="text-sm text-black/80">0/200</p>
        </div>
        <textarea
          name="description"
          id="description"
          className="w-full mt-4 bg-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 h-32 resize-none"
          placeholder="Add Description"
        />
        <div className="flex gap-6 text-sm items-center justify-end mt-4">
          <button>Cancel</button>
          <button className="bg-blue-400 hover:bg-blue-600 rounded-3xl px-4 py-2 text-white">
            Add
          </button>
        </div>
      </div>

      <div></div>
    </div>
  );
};
