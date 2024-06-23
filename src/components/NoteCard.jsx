import React from "react";
import { deleteNote } from "../appwrite/api";
import { Link } from "react-router-dom";

export const NoteCard = (note) => {
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(note.note.category);

  const handleEditClick = () => {
    navigate(`/note/${id}`);
  };

  let isoString = "2024-06-18T00:05:05.665+00:00";
  let date = new Date(isoString);
  console.log(date);

  return (
    <div>
      <div className="bg-white pt-4 pb-1 px-5 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h1
            className={`text-[12px]  py-2 px-3 ${note.note.category === "Community" ? "bg-green200 text-green900" : "bg-orange200 text-orange900"} rounded-3xl`}
          >
            {note.note.category.toUpperCase()}
          </h1>
          <div className="flex gap-8">
            <Link to={`/note/${note.note.$id}`} onClick={() => handleEditClick}>
              <img src="../../public/Edit.png" alt="" className="w-4 h-4" />
            </Link>
            <button onClick={() => handleDelete(note.note.$id)}>
              <img src="../../public/Delete.png" alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-3 pl-1">
          <h1 className="text-lg font-semibold mb-2">{note.note.title}</h1>
          <p className="text-gray-500 text-sm truncate">
            {note.note.description}
          </p>
          <div
            className={`mt-4 flex ${note.note.category === "Personal" ? "justify-end" : "justify-between"}`}
          >
            {note.note.category === "Community" && (
              <p className="text-sm text-green900 text-end py-2">
                {note.note.user.fullname}
              </p>
            )}
            <p className="text-sm text-gray-500/70 text-end py-2">
              {note.note.$createdAt.substring(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
