import { ID, Permission, Role, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export const searchNotes = async (query) => {
  try {
    // Create search conditions for both title and description
    const searchConditions = [
      Query.search('title', query),
      Query.search('description', query)
    ];

    // Execute the search
    const result = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.noteId, searchConditions);

    // Return the documents
    return result.documents;
  } catch (error) {
    console.error("Failed to search notes:", error);
    throw error; // Rethrow or handle as needed
  }
};

export const createUserAccount = async (user) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    console.log(newAccount.$id);

    if (!newAccount) {
      alert("error while creating new account");
      return
    }

    const avatar = avatars.getInitials(user.name);

    const newUser = await saveUser({
      accountid: newAccount.$id,
      email: newAccount.email,
      url: avatar,
      fullname: newAccount.name,
    });

    if(!newUser){
      alert("error while saving user");
      return
    }
    return newUser;
  } catch (error) {
    console.log(error);
    alert("error while creating new account");
    return error;
  }
};

export const saveUser = async (user) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signInAccount = async (email, password) => {
  try {
    const userLogin = await account.createEmailSession(email, password);
    return userLogin;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const googleAuth = async (path) => {
  try {
    const res = await account.createOAuth2Session(
      "google",
      `http://localhost:5173/signin`,
      `http://localhost:5173/signin`,
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const githubAuth = async (path) => {
  try {
    const res = await account.createOAuth2Session(
      "github",
      `http://localhost:5173/signin`,
      `http://localhost:5173/signin`,
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getSession = async () => {
  try {
    const session = account.getSession("current");

    session.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const changePassword = async(password,oldPassword)=> {
  try {
    const changedUser = await account.updatePassword(password, oldPassword);
    return changedUser
  } catch (error) {
    console.log(error);
    return error
  }
}

export const passwordEmail = async (email) => {
  try {
    const response = await account.createRecovery(
      email,
      "http://localhost:5173/forgetpassword",
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resetPassword = async (userId, secret, password) => {
  try {
    const response = await account.updateRecovery(
      userId,
      secret,
      password,
      password
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("unauthorized");
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      [Query.equal("accountid", currentAccount.$id)]
    );

    const avatar = avatars.getInitials(currentAccount.name);
    return [
      currentUser.documents.length,
      currentAccount,
      avatar,
      currentUser.documents[0],
    ];
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logOut = async () => {
  try {
    const response = await account.deleteSession("current");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const saveNote = async (note) => {
  try {
    note.body = JSON.stringify(note.body)
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
    return error;
  }
};

export const getCommunityNotes = async (id) => {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      [Query.equal("user", id), Query.equal("category", "Community")],
      100,
      0,
      "DESC",
    );
    return notes;
  } catch (error) {
    console.log(error);
    return error;
  }
};


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
    return error;
  }
};



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

export const changeUserName = async(id,username)=> {
  try {
    const changedUserName = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      id,
      {
        fullname:username,
      }
    )

    return changedUserName;
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getNote = async (id) => {
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
    return error;
  }
};

export const updateDraft = async(draft,id)=> {
  try {
    const updatedDraft = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.draftId,
      id,
      {
        body:JSON.stringify(draft),
      }
    );
    return updatedDraft;
  } catch (error) {
    return error
  }
}
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
export const updateNote = async ( note,id) => {
  try {
    const updatedNote = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.noteId,
      id,
      {
        body: JSON.stringify(note),
      },
    );
    return updatedNote;
  } catch (error) {
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
    return error;
  }
};


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



