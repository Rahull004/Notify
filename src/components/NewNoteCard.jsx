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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {type === "NEW" ? "✨ Create New Note" : "✏️ Edit Note"}
            </h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Awesome note title..."
                />
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-600">
                  Category
                </label>
                <div className="relative">
                  <div
                    className="w-full p-3 border-2 border-gray-200 rounded-xl cursor-pointer bg-white flex items-center justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span>{selectedOption}</span>
                    <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                  {isOpen && (
                    <div className="absolute w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                      {options.map((option) => (
                        <div
                          key={option}
                          className="p-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">
                Description <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all h-40 resize-none"
                placeholder="Write your amazing note content here..."
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={type === "NEW" ? handleNewNote : handleUpdateNote}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                {type === "NEW" ? "Create Note 🚀" : "Update Changes ✅"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};