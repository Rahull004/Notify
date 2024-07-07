import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { pdfUpload } from "../appwrite/api";

export const PdfCard = ({ note }) => {
  const [pdfs, setPdfs] = useState(note.pdfs || []);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  console.log("pdfs are", pdfs);

  const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setFile(file);
        const noteId = note.$id; // Assuming `note` has an `$id` property
        const upload = await pdfUpload({ file, noteId });
        if (upload) {
          window.location.reload()
          setPdfs([...pdfs, upload]);
        }
        console.log("upload", upload);
      } else {
        alert("Please select a PDF file of size less than or equal to 5MB.");
      }
    }
  };

  return (
    <div className="bg-white py-4 px-5 rounded-xl shadow-xl absolute w-3/4 translate-x-[15%] md:translate-x-1/2 md:w-1/2 translate-y-1/2 h-screen overflow-hidden">
      <div className="mb-4">
        <label htmlFor="pdf-upload" className="cursor-pointer">
          ADD +
        </label>
        <input id="pdf-upload" type="file" hidden onChange={handleFileChange} />
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8 ">
        {pdfs.map((pdf, index) => (
          <div
            key={pdf.$id}
            onClick={() => handlePdfClick(pdf.$id)}
            className="cursor-pointer max-w-14 mx-2 bg-red-700"
          >
            <p className="text-lg text-white">PDF {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
