import { ID } from "appwrite";
import { appwriteConfig, databases, storage } from "../config";
import { getNoteFull } from "./noteService";
import { showError, showSuccess } from "../../utils/toast.jsx";

/**
 * Upload a PDF file
 * @param {Object} params - Upload parameters
 * @param {File} params.file - PDF file
 * @param {string} params.noteId - Note ID
 * @returns {Object} Created PDF object
 */
export const pdfUpload = async ({ file, noteId }) => {
  try {
    const upload = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
    );
    if (!upload) {
      showError("Error while uploading file");
      throw new Error("error while uploading file");
    }

    const fileData = await storage.getFileView(
      appwriteConfig.storageId,
      upload.$id,
    );

    const fileUrl = fileData.href;
    const preview = await storage.getFilePreview(
      appwriteConfig.storageId,
      upload.$id,
      200,
      200,
      "fill",
      100,
    );

    const createPdf = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      ID.unique(),
      {
        fileUrl: fileUrl,
        drafts: noteId,
      },
    );
    return createPdf;
  } catch (error) {
    console.log(error);
    showError("Failed to upload PDF file", error);
    return error;
  }
};

/**
 * Get PDFs by note ID
 * @param {string} id - Note ID
 * @returns {Array} PDF objects
 */
export const getPdfByNoteId = async (id) => {
  try {
    const note = await getNoteFull(id);
    return note.pdfs;
  } catch (error) {
    console.log(error);
    showError("Failed to get PDFs by note ID", error);
    return error;
  }
};

/**
 * Delete a PDF by ID
 * @param {string} id - PDF ID
 * @returns {Object} Response object
 */
export const deletePdfById = async (id) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      id,
    );
    return response;
  } catch (error) {
    console.log(error);
    showError("Failed to delete PDF", error);
    return error;
  }
};

/**
 * Get a PDF by ID
 * @param {string} id - PDF ID
 * @returns {Object} PDF object
 */
export const getPdfById = async (id) => {
  try {
    const pdf = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      id,
    );
    return pdf;
  } catch (error) {
    console.log(error);
    showError("Failed to get PDF by ID", error);
    return error;
  }
};
