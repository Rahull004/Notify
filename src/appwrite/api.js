import { ID, Permission, Role, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";


export const saveNote = async (note) => {
  try {
    const noteSaved = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      ID.unique(),
      note
    );
    return noteSaved;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNotes = async (id) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      [Query.equal("user", id)],
      100,
      0,
      "DESC"
    );
    return notes;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const pdfUpload = async ({ file, noteId }) => {
  try {
    const upload = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    if (!upload) {
      throw new Error("error while uploading file");
    }

    

    const fileData = await storage.getFileView(
      appwriteConfig.storageId,
      upload.$id
    );

    const fileUrl = fileData.href
    const preview = await storage.getFilePreview(
      appwriteConfig.storageId,
      upload.$id,
      200,
      200,
      "fill",
      100
    );

    if (!preview) {
      throw new Error("error while getting file preview");
    }

    const createPdf = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      ID.unique(),
      {
        fileUrl,
        note: noteId,
      }
    );

    if (!createPdf) {
      throw new Error("error while creating pdf");
    }

    return createPdf;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getNote = async (id) => {
  try {
    const note = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id
    );
    note.body = JSON.parse(note.body);
    return note.body;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getNoteFull = async (id) => {
  try {
    const note = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id
    );
    note.body = JSON.parse(note.body);
    return note;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateNote = async (id, data) => {
  try {
    const jsonData = JSON.stringify(data);

    const updatesData = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        body: jsonData,
      }
    );
    return updatesData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateNoteTitle = async (id, title) => {
  try {
    // Prepare the data object with only the title
    const jsonData = JSON.stringify({ title: title });

    const updatesData = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        title: title,
      }
    );
    return updatesData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getNoteTitleById = async (documentId) => {
  try {
    // Fetch the document by its ID
    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      documentId
    );

    // Extract the title from the document's data
    const title = document.title; // Assuming the title is stored under the 'title' key

    return title;
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error as appropriate
  }
};

export const getPdfByNoteId = async (id) => {
  try {

    const note = await getNoteFull(id);


    return note.pdfs;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deletePdfById = async (id) => {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      id
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getPdfById = async (id) => {
  try {
    const pdf = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.pdfId,
      id
    );
    return pdf;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const deleteNote = async (id) => {
  try {
    const note = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id
    );
    return note;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export const updateOldPassword = async (oldPassword, newPassword) => {
  try {
   const promise = account.updatePassword(newPassword, oldPassword);

    promise.catch((error) => {
      alert("error while changing password");
      throw new Error("error while changing password");
      return error;
    });

    promise.then((response) => {
      alert("password changed successfully");
      window.location.replace("/user/profile");
    });
  } catch (error) {
    alert("error while changing password");
    console.log(error);
    return error;
  }
}

export const createEmail = async()=> {
  try {
    const promise = account.createMagicURLSession(ID.unique(), 'htc38199@gmail.com',
  `https://scribble-k76k.vercel.app/home`);
    console.log(promise);
  } catch (error) {
    console.log(error);
    return error
  }
}



