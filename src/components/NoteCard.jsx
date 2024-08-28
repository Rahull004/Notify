import React,{useState} from "react";
import { deleteDraft, deleteNote } from "../appwrite/api";
import { Link, useNavigate } from "react-router-dom";
import { NewNoteCard } from "./NewNoteCard";

export const NoteCard = ({ note ,user,type}) => {
  const navigate = useNavigate();
  const [showNewUpdateCard, setshowNewUpdateCard] = useState(false)
  
  

  const handleDelete = async (id) => {
    try {
      if(type==="DRAFT") {
        const deletedDraft = await deleteDraft(id);
      } else {
        const deletedNote = await deleteNote(id);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    setshowNewUpdateCard(false);
  };

  

  const handleEditClick = () => {
    setshowNewUpdateCard(true)
  };

  return (
    <div className="bg-white pt-4 pb-1 px-5 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h1
          className={`text-[12px] py-2 px-3 ${
            note.category === "Community"
              ? "bg-green200 text-green900"
              : "bg-orange200 text-orange900"
          } rounded-3xl`}
        >
          {note.category.toUpperCase()}
        </h1>
        {user.$id === note.user.$id && (
          <div className="flex gap-8">
            <button onClick={handleEditClick}>
              <img src="../../public/Edit.png" alt="" className="w-4 h-4" />
            </button>
            <button onClick={() => handleDelete(note.$id)}>
              <img src="../../public/Delete.png" alt="" className="w-5 h-5" />
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
