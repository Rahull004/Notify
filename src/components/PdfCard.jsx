import React, { useState } from "react";
import { useNavigate } from "react-router";
import { pdfUpload } from "../appwrite/api";
import { Link } from "react-router-dom";

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen">
      <div className="bg-white py-4 px-5 rounded-xl shadow-xl w-3/4 md:w-1/2 h-3/4 overflow-hidden">
        <div className="mb-4 mt-2">
          <label className="bg-blue400 px-3 rounded-full py-2 md:py-3 w-20 text-white cursor-pointer">
            Upload
            <input
              id="pdf-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
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
      </div>
    </div>
  );
};

export default PdfCard;
