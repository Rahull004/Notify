import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../config";
import { showError, showSuccess } from "../../utils/toast.jsx";

/**
 * Save a new note
 * @param {Object} noteData - Note data
 * @returns {Object} Saved note object
 */
export const saveNote = async (noteData) => {
  try {
    noteData.body = JSON.stringify(noteData.body);
    const savedNote = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      ID.unique(),
      {
        title: noteData.title,
        description: noteData.description,
        body: noteData.body,
        category: noteData.category,
        user: noteData.user,
      },
    );

    if (savedNote.$id) {
      const createPdf = async (pdf) => {
        const newPdf = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.pdfId,
          ID.unique(),
          pdf,
        );
        return newPdf;
      };
      const newPdfs = [];
      noteData.pdfs.forEach((pdf) => {
        newPdfs.push(
          createPdf({
            fileUrl: pdf.fileUrl,
            notes: savedNote.$id,
          }),
        );
      });

      const newSavedNote = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.noteId,
        savedNote.$id,
        {
          pdfs: newPdfs,
        },
      );

      return newSavedNote;
    }

    return null;
  } catch (error) {
    console.error("Failed to save note:", error);
    showError("Failed to save note", error);
    throw error;
  }
};

/**
 * Save a draft note
 * @param {Object} note - Draft note data
 * @returns {Object} Saved draft object
 */
export const saveDraft = async (note) => {
  try {
    const draftSaved = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.draftId,
      ID.unique(),
      note,
    );
    return draftSaved;
  } catch (error) {
    console.log(error);
    showError("Failed to save draft", error);
    return error;
  }
};

/**
 * Get community notes
 * @returns {Object} Community notes
 */
export const getCommunityNotes = async () => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      [Query.equal("category", "Community")],
      100,
      0,
      "DESC",
    );
    return notes;
  } catch (error) {
    console.log(error);
    showError("Failed to get community notes", error);
    return error;
  }
};

/**
 * Get draft notes for a user
 * @param {string} id - User ID
 * @returns {Object} Draft notes
 */
export const getDraftNotes = async (id) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.draftId,
      [Query.equal("user", id)],
      100,
      0,
      "DESC",
    );
    return notes;
  } catch (error) {
    console.log(error);
    showError("Failed to get draft notes", error);
    return error;
  }
};

/**
 * Get personal notes for a user
 * @param {string} id - User ID
 * @returns {Object} Personal notes
 */
export const getPersonalNotes = async (id) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      [Query.equal("user", id), Query.equal("category", "Personal")],
      100,
      0,
      "DESC",
    );
    return notes;
  } catch (error) {
    console.log(error);
    showError("Failed to get personal notes", error);
    return error;
  }
};

/**
 * Search notes by title and description
 * @param {string} query - Search query
 * @param {string} category - Note category
 * @returns {Array} Matching notes
 */
export const searchNotes = async (query, category) => {
  try {
    // Initialize search conditions for title and description separately
    let titleConditions = [Query.search("title", query)];

    let descriptionConditions = [Query.search("description", query)];

    if (category) {
      titleConditions.push(Query.equal("category", category));
      descriptionConditions.push(Query.equal("category", category));
    }

    // Execute the search for title
    const titleResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      titleConditions,
    );

    // Execute the search for description
    const descriptionResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      descriptionConditions,
    );

    // Combine results, avoiding duplicates
    const combinedResults = [
      ...titleResult.documents,
      ...descriptionResult.documents,
    ];

    // Remove duplicates (if any)
    const uniqueResults = combinedResults.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.$id === value.$id),
    );

    return uniqueResults;
  } catch (error) {
    console.error("Failed to search notes:", error);
    showError("Failed to search notes", error);
    throw error;
  }
};

/**
 * Get a note by ID
 * @param {string} id - Note ID
 * @returns {Object} Note object
 */
export const getNote = async (id) => {
  try {
    const note = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
    );
    note.body = JSON.parse(note.body);
    return note;
  } catch (error) {
    console.log(error);
    showError("Failed to get note", error);
    return error;
  }
};

/**
 * Get a draft by ID
 * @param {string} id - Draft ID
 * @returns {Object} Draft object
 */
export const getDraft = async (id) => {
  try {
    const draft = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.draftId,
      id,
    );
    draft.body = JSON.parse(draft.body);
    return draft;
  } catch (error) {
    console.log(error);
    showError("Failed to get draft", error);
    return error;
  }
};

/**
 * Update a draft content
 * @param {Object} draft - Draft content
 * @param {string} id - Draft ID
 * @returns {Object} Updated draft
 */
export const updateDraft = async (draft, id) => {
  try {
    const updatedDraft = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.draftId,
      id,
      {
        body: JSON.stringify(draft),
      },
    );
    return updatedDraft;
  } catch (error) {
    showError("Failed to update draft", error);
    return error;
  }
};

/**
 * Update note details
 * @param {string} id - Note ID
 * @param {Object} note - Note details
 * @returns {Object} Updated note
 */
export const updateNoteDetails = async (id, note) => {
  try {
    const updatedNote = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        description: note.description,
        title: note.title,
        category: note.category,
      },
    );
    return updatedNote;
  } catch (error) {
    showError("Failed to update note details", error);
    return error;
  }
};

/**
 * Update draft details
 * @param {string} id - Draft ID
 * @param {Object} draft - Draft details
 * @returns {Object} Updated draft
 */
export const updateDraftDetails = async (id, draft) => {
  try {
    const updatedDraft = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.draftId,
      id,
      {
        description: draft.description,
        title: draft.title,
        category: draft.category,
      },
    );
    return updatedDraft;
  } catch (error) {
    showError("Failed to update draft details", error);
    return error;
  }
};

/**
 * Get full note data
 * @param {string} id - Note ID
 * @returns {Object} Note object
 */
export const getNoteFull = async (id) => {
  try {
    const note = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
    );
    note.body = JSON.parse(note.body);
    return note;
  } catch (error) {
    console.log(error);
    showError("Failed to get full note", error);
    return error;
  }
};

/**
 * Update a note
 * @param {string} id - Note ID
 * @param {Object} data - Note data
 * @returns {Object} Updated note
 */
export const updateNote = async (id, data) => {
  try {
    const jsonData = JSON.stringify(data);

    const updatesData = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        body: jsonData,
      },
    );
    return updatesData;
  } catch (error) {
    console.log(error);
    showError("Failed to update note", error);
    return error;
  }
};

/**
 * Update a note's title
 * @param {string} id - Note ID
 * @param {string} title - New title
 * @returns {Object} Updated note
 */
export const updateNoteTitle = async (id, title) => {
  try {
    const updatesData = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        title: title,
      },
    );
    return updatesData;
  } catch (error) {
    console.log(error);
    showError("Failed to update note title", error);
    return error;
  }
};

/**
 * Get a note title by ID
 * @param {string} documentId - Note ID
 * @returns {string} Note title
 */
export const getNoteTitleById = async (documentId) => {
  try {
    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      documentId,
    );
    const title = document.title;
    return title;
  } catch (error) {
    console.log(error);
    showError("Failed to get note title by ID", error);
    return null;
  }
};

/**
 * Delete a note
 * @param {string} id - Note ID
 * @returns {Object} Response object
 */
export const deleteNote = async (id) => {
  try {
    const note = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
    );
    return note;
  } catch (error) {
    console.log(error);
    showError("Failed to delete note", error);
    return error;
  }
};

/**
 * Delete a draft
 * @param {string} id - Draft ID
 * @returns {Object} Response object
 */
export const deleteDraft = async (id) => {
  try {
    const draft = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.draftId,
      id,
    );
    return draft;
  } catch (error) {
    console.log(error);
    showError("Failed to delete draft", error);
    return error;
  }
};
