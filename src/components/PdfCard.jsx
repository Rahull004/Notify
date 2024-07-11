import React, { useState } from "react";
import { useNavigate } from "react-router";
import { pdfUpload } from "../appwrite/api";
import { Link } from "react-router-dom";
import Upload from "/cloud.png";

export const PdfCard = ({ note }) => {
  console.log(note);
  const [pdfs, setPdfs] = useState(note.pdfs || []);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  console.log("pdfs are", pdfs);

  const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  const noteId = note.$id;

  const handleFileChange = async (e) => {
    
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setFile(file);
        
        
        const upload = await pdfUpload({ file, noteId });
        if (upload) {
          setPdfs([...pdfs, upload]);
        }
        console.log("upload", upload);
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
        // Assuming handleFileChange can process multiple files
        // If not, you'll need to adjust this to handle your specific logic
        handleFileChange({ target: { files } });
      }
    };

    const handleClick = () => {
      document.getElementById('pdf-upload').click();
    };

    

  return (
    <div className="flex">
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen">
      <div className="bg-white py-4 px-5 rounded-xl shadow-xl w-3/4 md:w-3/4 h-5/6 overflow-hidden px-16 pt-10">
        <div className="mb-4 mt-2 pb-6 text-xl font-semibold">
          <label>
            Upload Files
            <input
              id="pdf-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="text-center w-7/12 border-dashed border-2 border-orange-300	0 p-10 bg-amber-100	rounded-xl h-5/6 flex flex-col items-center justify-center"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        onDrop={handleDrop}>
          <img src={Upload} alt="upload" className="w-20 h-20 mx-auto " />
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
            <div className="h-fit items-center text-sm justify-end">Only PDF files of max size of 5MB</div>
          
      </div>
            
      <div className="w-3/4 overflow-auto">
          {pdfs.map((pdf, index) => (
            <Link 
            to={`/pdfviewer/${pdf.$id}`}
              key={pdf.$id}
              onClick={() => handlePdfClick(pdf.$id)}
              className="cursor-pointer max-w-20 mx-2 rounded-lg px-1 bg-red-600"
            >
              <p className="text-lg text-white">PDF {index + 1}</p>
            </Link>
          ))}
        </div>
        <div className="relative"> 
        <button className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button> 
      </div>
      </div>
    </div>
    
    </div>
  );
};

export default PdfCard;
