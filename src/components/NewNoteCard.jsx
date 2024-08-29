import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getCurrentUser,
  getDraft,
  saveDraft,
  saveNote,
  saveUser,
  updateDraft,
  updateDraftDetails,
  updateNoteDetails,
} from "../appwrite/api";

export const NewNoteCard = ({ onClose, user, type, draft, noteType }) => {
  console.log(type);
  const [title, setTitle] = useState(draft?.title);
  const [description, setDescription] = useState(draft?.description);
  const [selectedOption, setSelectedOption] = useState(
    draft?.category || "Personal",
  );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const options = ["Personal", "Community"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleNewNote = async () => {
    try {
      const note = await saveDraft({
        user: user.$id,
        title: title,
        category: selectedOption,
        description: description,
      });
      navigate(`/draft/${note.$id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async () => {
    try {
      if (noteType === "DRAFT") {      
        const updatedDraft = await updateDraftDetails(draft.$id, {
          title: title,
          category: selectedOption,
          description: description,
        });
      } else {
        const updatedNote = await updateNoteDetails(draft.$id, {
          title: title,
          category: selectedOption,
          description: description,
        });
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white py-4 px-5 rounded-xl shadow-xl absolute w-3/4 translate-x-[15%] md:translate-x-1/2 md:w-1/2 translate-y-1/2">
      <div className="flex justify-between mt-2 items-center">
        <h1 className="text-xl text-gray900-87 font-bold">Add note</h1>
        <img src="./Edit.png" className="h-4 w-4" alt="Edit icon" />
      </div>
      <div className="flex gap-4 mt-6 flex-col md:flex-row">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="title"
            className="text-sm text-gray900-60 font-semibold"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg p-2 mt-1 bg-gray200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray900-60 placeholder-gray900-60 placeholder:text-sm"
            placeholder="Add Title"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="category"
            className="text-sm text-gray-900/80 font-semibold"
          >
            Category
          </label>
          <div className="relative">
            <div
              className="bg-gray200 p-[10px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue400 cursor-pointer mt-1 text-gray900-87 font-semibold text-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedOption}
            </div>
            {isOpen && (
              <div className="absolute mt-1 w-full bg-gray200 border border-gray-300 rounded-lg shadow-lg z-10">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-2 cursor-pointer hover:bg-black-12 text-gray-900/80 border border-gray-200 font-semibold text-sm`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-10">
        <div className="flex">
          <p className="text-sm text-gray900-60 font-semibold">Description</p>
          <span className="text-sm text-gray900-60 ml-1">(Optional)</span>
        </div>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
        id="description"
        className="w-full mt-4 bg-gray200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue500 text-gray900-60 placeholder-gray900-60 h-32 resize-none"
        placeholder="Add Description"
      />
      <div className="flex gap-6 text-sm items-center justify-end mt-4">
        <button onClick={onClose}>Cancel</button>
        {type === "NEW" ? (
          <button
            onClick={handleNewNote}
            className="bg-blue400 hover:bg-blue500 rounded-3xl px-4 py-2 text-white"
          >
            Add
          </button>
        ) : (
          <button
            onClick={handleUpdateNote}
            className="bg-blue400 hover:bg-blue500 rounded-3xl px-4 py-2 text-white"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};
