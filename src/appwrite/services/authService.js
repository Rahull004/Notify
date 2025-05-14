import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "../config";
import { showError, showSuccess } from "../../utils/toast.jsx";

/**
 * Create a new user account
 * @param {Object} user - User details
 * @returns {Object} New user object
 */
export const createUserAccount = async (user) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );
    if (!newAccount) {
      showError("Error while creating new account");
      return;
    }

    const avatar = avatars.getInitials(user.name);

    const newUser = await saveUser({
      accountId: newAccount.$id,
      email: newAccount.email,
      url: avatar,
      fullname: newAccount.name,
    });
    if (!newUser) {
      showError("Error while saving user");
      return;
    }
    return newUser;
  } catch (error) {
    console.log(error);
    showError("Error while creating new account", error);
    return error;
  }
};

/**
 * Save user details to database
 * @param {Object} user - User details
 * @returns {Object} Saved user object
 */
export const saveUser = async (user) => {
  try {
    // Validate that all required fields are present
    if (!user.accountId || !user.email || !user.fullname) {
      console.error("Missing required fields in user object:", user);
      showError("Missing required user information");
      return null;
    }

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      ID.unique(),
      user,
    );
    return newUser;
  } catch (error) {
    console.log(error);
    showError("Error saving user information", error);
    return null;
  }
};

/**
 * Sign in an existing user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Session object
 */
export const signInAccount = async (email, password) => {
  try {
    const userLogin = await account.createEmailSession(email, password);
    return userLogin;
  } catch (error) {
    console.log(error);
    showError("Failed to sign in. Please check your credentials.", error);
    return;
  }
};

/**
 * Authenticate with Google OAuth
 * @param {string} path - Current path
 */
export const googleAuth = async (path) => {
  try {
    // Use localhost URLs for development, production URLs for production
    const baseUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:5173"
        : "https://notify-bay-phi.vercel.app";

    await account.createOAuth2Session(
      "google",
      `${baseUrl}/signupcllg`,
      `${baseUrl}/signin`,
    );
    // This code won't execute immediately as the user will be redirected
  } catch (error) {
    console.log(error);
    showError("Failed to authenticate with Google", error);
    return error;
  }
};

/**
 * Authenticate with GitHub OAuth
 * @param {string} path - Current path
 */
export const githubAuth = async (path) => {
  try {
    const res = await account.createOAuth2Session(
      "github",
      `http://localhost:5173/signupcllg`,
      `http://localhost:5173/signin`,
    );
  } catch (error) {
    console.log(error);
    showError("Failed to authenticate with GitHub", error);
    return error;
  }
};

/**
 * Save Google user to database after OAuth
 * @returns {Object} User object
 */
export const saveGoogleUser = async () => {
  try {
    // Get the current user from Appwrite
    const currentAccount = await account.get();

    // Check if we have a valid account with the required fields
    if (
      !currentAccount ||
      !currentAccount.$id ||
      !currentAccount.email ||
      !currentAccount.name
    ) {
      console.error("Invalid account data:", currentAccount);
      showError("Failed to get account information");
      return null;
    }

    // Check if user already exists in your database
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    // If user already exists, return the user
    if (existingUser.documents.length > 0) {
      return existingUser.documents[0];
    }

    // Create avatar and save new user
    const avatar = avatars.getInitials(currentAccount.name);

    const newUser = await saveUser({
      accountId: currentAccount.$id,
      email: currentAccount.email,
      url: avatar,
      fullname: currentAccount.name,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    showError("Failed to save Google user", error);
    return null;
  }
};

/**
 * Get current session
 * @returns {Object} Session object
 */
export const getSession = async () => {
  try {
    const session = account.getSession("current");

    session.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
        showError("Failed to get session", error);
      },
    );
    return;
  } catch (error) {
    console.log(error);
    showError("Error getting session", error);
    return error;
  }
};

/**
 * Log out user by deleting session
 * @returns {Object} Response object
 */
export const logOut = async () => {
  try {
    const response = await account.deleteSession("current");
    showSuccess("Successfully logged out");
    return response;
  } catch (error) {
    console.log(error);
    showError("Failed to log out", error);
    return error;
  }
};

/**
 * Get current authenticated user
 * @returns {Array} User details array
 */
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("unauthorized");
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      [Query.equal("accountId", currentAccount.$id)],
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
    showError("Failed to get current user", error);
    return error;
  }
};
