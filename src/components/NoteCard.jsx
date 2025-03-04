import React, { useState } from "react";
import { deleteDraft, deleteNote } from "../appwrite/api";
import { Link, useNavigate } from "react-router-dom";
import { NewNoteCard } from "./NewNoteCard";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const NoteCard = ({ note, user, type }) => {
  const navigate = useNavigate();
  const [showNewUpdateCard, setShowNewUpdateCard] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      if (type === "DRAFT") {
        await deleteDraft(id);
      } else {
        await deleteNote(id);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  const handleClosePopup = () => {
    setshowNewUpdateCard(false);
  };



  const handleEditClick = () => {
    setshowNewUpdateCard(true)
  };

  return (
    <div className="bg-white pt-4 pb-1 px-5 rounded-lg shadow-lg relative">
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        {/* Dialog container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mb-4" />
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
                Delete {type === "DRAFT" ? "Draft" : "Note"}?
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 mb-6">
                Are you sure you want to delete this {type === "DRAFT" ? "draft" : "note"}?
                This action cannot be undone.
              </Dialog.Description>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(note.$id)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Existing card content */}
      <div className="flex items-center justify-between">
        <h1
          className={`text-[12px] py-2 px-3 ${note.category === "Community"
              ? "bg-green-200 text-green-900"
              : "bg-orange-200 text-orange-900"
            } rounded-3xl`}
        >
          {note.category.toUpperCase()}
        </h1>
        {user.$id === note.user.$id && (
          <div className="flex gap-4">
            <button
              onClick={handleEditClick}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <img src="./Edit.png" alt="Edit" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <img src="./Delete.png" alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {type === "DRAFT" ? (
        <Link to={`/draft/${note.$id}`} className="block mt-3 pl-1">
          <h1 className="text-lg font-semibold mb-2">{note.title}</h1>
          <p className="text-gray-500 text-sm line-clamp-2">
            {note.description}
          </p>
          <div
            className={`mt-4 flex ${note.category === "Personal" ? "justify-end" : "justify-between"}`}
          >
            {note.category === "Community" && (
              <p className="text-sm text-green-900">{note.user.fullname}</p>
            )}
            <p className="text-sm text-gray-500/70">
              {new Date(note.$createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ) : (
        <Link to={`/note/${note.$id}`} className="block mt-3 pl-1">
          <h1 className="text-lg font-semibold mb-2">{note.title}</h1>
          <p className="text-gray-500 text-sm line-clamp-2">
            {note.description}
          </p>
          <div
            className={`mt-4 flex ${note.category === "Personal" ? "justify-end" : "justify-between"}`}
          >
            {note.category === "Community" && (
              <p className="text-sm text-green-900">{note.user.fullname}</p>
            )}
            <p className="text-sm text-gray-500/70">
              {new Date(note.$createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      )}
      {showNewUpdateCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 w-full h-full">
          <NewNoteCard
            noteType={type}
            onClose={handleClosePopup}
            showNewNoteCard={showNewUpdateCard}
            user={user}
            type={"UPDATE"}
            draft={note}
          />
        </div>
      )}
    </div>
  );
};
