import { ID } from "appwrite";
import { account, appwriteConfig } from "../config";
import { showError, showSuccess } from "../../utils/toast.jsx";

/**
 * Send a password recovery email
 * @param {string} email - User email
 * @returns {Object} Response object
 */
export const passwordEmail = async (email) => {
  try {
    const response = await account.createRecovery(
      email,
      "https://notify-bay-phi.vercel.app/forgetpassword",
    );
    showSuccess("Password recovery email sent");
    return response;
  } catch (error) {
    console.log(error);
    showError("Failed to send password recovery email", error);
    return error;
  }
};

/**
 * Reset a user's password
 * @param {string} userId - User ID
 * @param {string} secret - Recovery secret
 * @param {string} password - New password
 * @returns {Object} Response object
 */
export const resetPassword = async (userId, secret, password) => {
  try {
    const response = await account.updateRecovery(
      userId,
      secret,
      password,
      password,
    );
    showSuccess("Password reset successfully");
    return response;
  } catch (error) {
    console.log(error);
    showError("Failed to reset password", error);
    return error;
  }
};

/**
 * Create a magic URL session for email login
 * @returns {Promise} Response promise
 */
export const createEmail = async () => {
  try {
    const promise = account.createMagicURLSession(
      ID.unique(),
      "htc38199@gmail.com",
      `https://scribble-k76k.vercel.app/home`,
    );
    console.log(promise);
  } catch (error) {
    console.log(error);
    return error;
  }
};
