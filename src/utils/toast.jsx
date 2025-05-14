// src/utils/toast.jsx
import toast from 'react-hot-toast';

/**
 * Toast utility functions for providing user feedback
 */

/**
 * Show a success toast message
 * @param {string} message - The success message to display
 * @param {Object} options - Additional toast options
 */
export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-center',
    ...options,
  });
};

/**
 * Show an error toast message
 * @param {string} message - The error message to display
 * @param {Object|Error} error - Optional error object for logging
 * @param {Object} options - Additional toast options
 */
export const showError = (message, error = null, options = {}) => {
  // Log the error to console if provided
  if (error) {
    console.error(message, error);
  }
  
  toast.error(message, {
    duration: 4000,
    position: 'top-center',
    ...options,
  });
};

/**
 * Show an info toast message
 * @param {string} message - The information message to display
 * @param {Object} options - Additional toast options
 */
export const showInfo = (message, options = {}) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 3000,
      position: 'top-center',
      ...options,
    }
  );
};

/**
 * Show a loading toast message that can be updated when an async operation completes
 * @param {string} loadingMessage - The loading message to display
 * @returns {Function} A function that can be called with (success, message) to update the toast
 */
export const showLoading = (loadingMessage) => {
  const toastId = toast.loading(loadingMessage, {
    position: 'top-center',
  });

  // Return a function that can be used to update or dismiss this toast
  return (success = true, message = '') => {
    if (success) {
      toast.success(message, {
        id: toastId,
      });
    } else {
      toast.error(message, {
        id: toastId,
      });
    }
  };
};

// Default export with all toast methods
export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  loading: showLoading,
};