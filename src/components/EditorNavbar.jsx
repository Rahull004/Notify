import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../AuthContext";
import logo from "/logo.png";
import { saveNote } from "../appwrite/api";
import { PdfCard } from "./PdfCard";
import { FileText, User } from "lucide-react";

function EditorNavbar({ note }) {
  const { user } = useUserContext();
  console.log(note, user, "dhnfvdifvgjh");

  const navigate = useNavigate();
  const [showPdfCard, setShowPdfCard] = useState(false);

  const handlePost = async () => {
    try {
      const savedNote = await saveNote({
        title: note.title,
        description: note.description,
        pdfs: note.pdfs,
        category: note.category,
        user: note.user.$id,
        body: note.body,
      });
      if (savedNote) {
        navigate("/allnotes");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handlePDFs = () => {
    setShowPdfCard(true);
  };

  const handleContact = () => {
    const subject = encodeURIComponent("Inquiry about your notes");
    const body = encodeURIComponent(
      `Hello,\n\nI have some questions about your notes:`,
    );
    const mailtoLink = `mailto:${user.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <header className="w-full z-30 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" aria-label="Home">
              <img
                src={logo}
                className="w-12 h-12 md:w-16 md:h-16 rounded"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleContact}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200"
            >
              Contact
            </button>
            <button
              onClick={handlePDFs}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="PDF Options"
            >
              <FileText className="w-6 h-6 text-gray-600" />
            </button>

            <Link
              to="/profile"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="User Profile"
            >
              {user.avatar ? (
                <img
                  src={user.url}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </Link>

            {note?.user?.$id === user?.$id && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200"
                onClick={handlePost}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </div>

      {showPdfCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
            <PdfCard note={note} setShowPdfCard={setShowPdfCard} />
          </div>
        </div>
      )}
    </header>
  );
}

export default EditorNavbar;
