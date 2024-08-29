import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { deletePdfById, pdfUpload } from "../appwrite/api";
import { Link } from "react-router-dom";
import Upload from "/cloud.png";
import { Progress } from "@/components/ui/progress";
import { useUserContext } from "@/AuthContext";

export const PdfCard = ({ note, setShowPdfCard }) => {
  const { user } = useUserContext();
  const [pdfs, setPdfs] = useState(note.pdfs || []);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const [progress, setProgress] = useState(0); // State for progress

  const type = window.location.pathname.split("/")[1];
  

  const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  const noteId = note.$id;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setFile(file);
        setLoading(true); // Start loading
        setProgress(0); // Reset progress
        console.log("File name:", file.name);

        // Simulated progress increment
        const incrementProgress = () => {
          setProgress((prev) => {
            const nextValue = prev + Math.floor(Math.random() * 10) + 5;
            return nextValue >= 95 ? 95 : nextValue; // Cap progress at 95% before upload completes
          });
        };

        const interval = setInterval(incrementProgress, 300);

        try {
          const upload = await pdfUpload({ file, noteId: note?.$id });
          console.log("Upload response:", upload);
          

          if (upload) {
            const fileName =
              file.name || upload.fileUrl.split("/").pop().split("?")[0];
            const updatedPdfs = [
              ...pdfs,
              {
                ...upload,
                fileName, // Add extracted file name
              },
            ];
            setPdfs(updatedPdfs);
            console.log(fileName);
          }
          console.log("Upload result:", upload);
        } catch (error) {
          console.error("Upload error:", error);
        } finally {
          clearInterval(interval); // Clear the interval after upload is complete
          setProgress(100); // Ensure progress bar reaches 100%
          setTimeout(() => {
            setLoading(false); // End loading after a short delay to allow user to see 100% completion
          }, 500);
        }
      } else {
        alert("Please select a PDF file of size less than or equal to 5MB.");
      }
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileChange({ target: { files } });
    }
  };

  const handleClick = () => {
    document.getElementById("pdf-upload").click();
  };

  const handleDelete = async(id) => {
    await deletePdfById(id)
    const updatedPdfs = pdfs.filter((pdf) => pdf.$id !== id);
    setPdfs(updatedPdfs);
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50 h-screen">
      <div className="relative bg-white rounded-xl shadow-xl w-3/4 md:w-3/4 h-5/6 overflow-hidden flex p-14">
        {note?.user?.$id === user?.$id && type === "draft" && (
          <div
            className="text-center border-dashed border-2 border-blue-700 bg-blue-50 rounded-xl w-3/5 flex flex-col items-center justify-center"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            onDrop={handleDrop}
          >
            {loading ? (
              <div className="w-3/5 flex flex-col items-center justify-center">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-md font-semibold mt-4">
                  {progress}% Uploaded
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img src={Upload} alt="upload" className="w-24 h-24" />
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
            )}
          </div>
        )}

        <div className="w-2/3 h-full overflow-auto px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pdfs.map((pdf) => (
              <div
                key={pdf.$id}
                className="relative cursor-pointer flex flex-col items-center mb-4 mt-2"
              >
                <img
                  className="w-10 h-14 mt-2"
                  src="https://img.icons8.com/external-vectorslab-flat-vectorslab/36/external-pdf-file-format-files-and-folders-vectorslab-flat-vectorslab.png"
                  alt="pdf-file"
                  onClick={() => handlePdfClick(pdf.$id)}
                />
                <p className="text-center text-sm mt-2 truncate max-w-full">
                  {pdf.fileName}
                </p>
                {note?.user?.$id === user?.$id && type === "draft" && (
                  <button
                    onClick={() => handleDelete(pdf.$id)}
                    className="absolute top-0 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setShowPdfCard(false)}
            className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
