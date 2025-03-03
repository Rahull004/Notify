import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { deletePdfById, pdfUpload } from "../appwrite/api";
import { Progress } from "@/components/ui/progress";
import { useUserContext } from "@/AuthContext";
import { FileText, Trash2, UploadCloud, X } from "lucide-react";

export const PdfCard = ({ note, setShowPdfCard }) => {
  const { user } = useUserContext();
  const [pdfs, setPdfs] = useState(note.pdfs || []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const type = window.location.pathname.split("/")[1];

  const handlePdfClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileUpload(Array.from(files));
    }
  };

  const handleFileUpload = async (files) => {
    const validFiles = files.filter(file =>
      file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      alert('Please only upload PDF files under 5MB');
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const incrementProgress = () => {
        setProgress(prev => Math.min(prev + Math.random() * 10 + 5, 95));
      };
      const progressInterval = setInterval(incrementProgress, 300);

      const uploadPromises = validFiles.map(file =>
        pdfUpload({ file, noteId: note?.$id })
      );

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(result => result?.$id);

      if (successfulUploads.length > 0) {
        const newPdfs = successfulUploads.map(upload => ({
          ...upload,
          fileName: upload.fileName || upload.fileUrl.split('/').pop().split('?')[0]
        }));
        setPdfs(prev => [...prev, ...newPdfs]);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleFileChange = (e) => {
    handleFileUpload(Array.from(e.target.files));
  };

  const handleClick = () => {
    document.getElementById("pdf-upload").click();
  };

  const handleDelete = async (id) => {
    await deletePdfById(id);
    setPdfs(prev => prev.filter(pdf => pdf.$id !== id));
  };

  return (
    <div className="relative bg-white rounded-xl shadow-xl w-full max-h-[90vh] flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">PDF Attachments</h2>
        <button
          onClick={() => setShowPdfCard(false)}
          className="p-2 rounded-full hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto flex flex-col md:flex-row gap-6 p-6">
        {note?.user?.$id === user?.$id && type === "draft" && (
          <div
            className={`drop-zone md:w-1/2 h-64 md:h-auto mb-6 md:mb-0 border-2 ${isDragging
                ? 'border-blue-500 bg-blue-50 shadow-inner'
                : 'border-dashed border-gray-300'
              } rounded-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {loading ? (
              <div className="w-full max-w-xs space-y-4">
                <div className="space-y-2">
                  <Progress
                    value={progress}
                    className="h-2 bg-gray-200"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                  <p className="text-sm text-center text-gray-600">
                    Uploading... {progress}%
                  </p>
                </div>
                <p className="text-xs text-center text-gray-500">
                  Please keep this window open
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                  <UploadCloud className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">
                    Drag & drop PDFs here
                  </p>
                  <p className="text-sm text-gray-500">
                    or click to browse files
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Max file size: 5MB • PDF only
                </p>
                <input
                  id="pdf-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept="application/pdf"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdfs.map((pdf) => (
              <div
                key={pdf.$id}
                className="group relative p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors bg-white hover:shadow-sm"
              >
                <div
                  onClick={() => handlePdfClick(pdf.$id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {pdf.fileName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(pdf.fileSize / 1024)} KB
                      </p>
                    </div>
                  </div>
                </div>

                {note?.user?.$id === user?.$id && type === "draft" && (
                  <button
                    onClick={() => handleDelete(pdf.$id)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;