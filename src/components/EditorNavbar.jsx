import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../AuthContext";
import logo from "/logo.png";
import { saveNote } from "../appwrite/api";
import { PdfCard } from "./PdfCard";
import { FileText, Mail, UploadCloud, User } from "lucide-react";

function EditorNavbar({ note, type }) {
  const { user } = useUserContext();

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
    const mailtoLink = `mailto:${note?.user?.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <header className="w-full z-30 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              className="w-10 h-10 rounded-lg transition-transform hover:scale-105"
              alt="Logo"
            />
            <span className="text-xl font-bold text-gray-800 hidden md:block">
              Notify
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {note?.user?.$id !== user?.$id && type !== "draft" && (
              <button
                onClick={handleContact}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Author</span>
              </button>
            )}

            <button
              onClick={handlePDFs}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors group relative"
              aria-label="PDF Options"
            >
              <FileText className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 text-xs px-1.5 rounded-full">
                {note?.pdfs?.length || 0}
              </span>
            </button>

            <Link
              to="/profile"
              className="p-1.5 rounded-full hover:bg-gray-50 transition-colors group"
              aria-label="User Profile"
            >
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:border-blue-200 transition-colors"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                )}
              </div>
            </Link>

            {note?.user?.$id === user?.$id && type !== "note" && (
              <button
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
                onClick={handlePost}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Publish Note</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showPdfCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden">
            <PdfCard note={note} setShowPdfCard={setShowPdfCard} />
          </div>
        </div>
      )}
    </header>
  );
}

export default EditorNavbar;
