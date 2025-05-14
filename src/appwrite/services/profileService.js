import { ID, Query } from "appwrite";
import { account, appwriteConfig, databases } from "../config";
import { showError, showSuccess } from "../../utils/toast.jsx";

/**
 * Update user profile details
 * @param {string} id - User ID
 * @param {Object} data - Profile data to update
 * @returns {Object} Updated user object
 */
export const updateUser = async (id, data) => {
  try {
    console.log(data);
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      id,
      {
        rollno: data.rollNo,
        phone: data.phoneNo,
        hostelname: data.hostelName,
        roomno: data.roomNo,
      },
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
    showError("Failed to update user profile", error);
    return error;
  }
};

/**
 * Get user by ID
 * @param {string} id - User ID
 * @returns {Object} User object
 */
export const getUserById = async (id) => {
  try {
    // ...existing code...
  } catch (error) {
    console.log(error);
    showError("Failed to get user", error);
    return error;
  }
};

/**
 * Change user password
 * @param {string} password - New password
 * @param {string} oldPassword - Old password
 * @returns {Object} Response object
 */
export const changePassword = async (password, oldPassword) => {
  try {
    const changedUser = await account.updatePassword(password, oldPassword);
    return changedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * Update old password to new password
 * @param {string} oldPassword - Old password
 * @param {string} newPassword - New password
 */
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
};

/**
 * Change username of a user
 * @param {string} id - User ID
 * @param {string} username - New username
 * @returns {Object} Updated user object
 */
export const changeUserName = async (id, username) => {
  try {
    const changedUserName = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userId,
      id,
      {
        fullname: username,
      },
    );

    return changedUserName;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * Update user name
 * @param {Object} currentUser - Current user object
 * @param {string} name - New name
 * @returns {boolean} Success status
 */
export const updateUserName = async (currentUser, name) => {
  try {
    // ...existing code...

    // Add success toast for these actions
    showSuccess("User name updated successfully");
    return true;
  } catch (error) {
    console.log(error);
    showError("Failed to update user name", error);
    return error;
  }
};

/**
 * Update user password
 * @param {string} oldPassword - Old password
 * @param {string} newPassword - New password
 * @returns {boolean} Success status
 */
export const updateUserPassword = async (oldPassword, newPassword) => {
  try {
    // ...existing code...

    // Add success toast for these actions
    showSuccess("Password updated successfully");
    return true;
  } catch (error) {
    console.log(error);
    showError("Failed to update password", error);
    return error;
  }
};
