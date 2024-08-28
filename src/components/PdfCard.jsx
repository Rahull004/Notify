import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { pdfUpload } from "../appwrite/api";
import { Link } from "react-router-dom";
import Upload from "/cloud.png";

export const PdfCard = ({ note, setShowPdfCard }) => {
  const [pdfs, setPdfs] = useState(note.pdfs || []);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log("Initial PDFs:", pdfs);
  }, []);

  const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  const noteId = note.$id;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setFile(file);
        console.log("File name:", file.name);

        const upload = await pdfUpload({ file, noteId });
        if (upload) {
          const updatedPdfs = [
            ...pdfs,
            {
              ...upload,
              fileName: file.name, // Add file name to uploaded PDF info
            },
          ];
          setPdfs(updatedPdfs);
          console.log("Updated PDFs array:", updatedPdfs);
        }
        console.log("Upload result:", upload);
      } else {
        alert("Please select a PDF file of size less than or equal to 5MB.");
      }
    }
  };

  // Step 1: Define state for dragging
  const [isDragging, setIsDragging] = useState(false);

  // Step 2: Handle Drag Events
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow for a drop
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true); // Update state to indicate dragging
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false); // Update state to indicate no longer dragging
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false); // Reset dragging state
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange({ target: { files } });
    }
  };

  const handleClick = () => {
    document.getElementById("pdf-upload").click();
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50 h-screen">
      <div className="bg-white rounded-xl shadow-xl w-3/4 md:w-3/4 h-5/6 overflow-hidden flex p-14">
        {/* Upload Area */}
        <div
          className="text-center border-dashed border-2 border-orange-300 bg-amber-100 rounded-xl w-3/5 flex flex-col items-center justify-center"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          onDrop={handleDrop}
        >
          <img src={Upload} alt="upload" className="w-15 h-15 mx-auto" />
          <br />
          <label className="text-lg font-semibold">
            Drag & Drop your files here
            <br />
            or
            <br />
            Browse to upload files
            <input
              id="pdf-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <br />
          <br />
          <div className="h-fit items-center text-sm justify-end">
            Only PDF files of max size of 5MB
          </div>
        </div>

        {/* PDF Grid */}
        <div className="w-2/3 h-full overflow-auto px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pdfs.map((pdf) => (
              <Link
                to={`/pdfviewer/${pdf.$id}`}
                key={pdf.$id}
                onClick={() => handlePdfClick(pdf.$id)}
                className="cursor-pointer rounded-lg p-3 bg-red-600 flex items-center justify-center"
              >
                <p className="text-lg text-white truncate">{pdf.fileName}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded">
        <button onClick={() => setShowPdfCard(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PdfCard;
