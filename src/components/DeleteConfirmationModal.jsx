import { deletePdfById } from "@/appwrite/api";
import { AlertTriangle } from "lucide-react";

export const DeleteConfirmationModal = ({
    pdfToDelete,
    setPdfToDelete,
    onConfirmDelete
}) => {

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-red-500 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Delete PDF?
                        </h3>
                        <p className="text-gray-600">
                            This action cannot be undone. The PDF will be permanently removed.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setPdfToDelete(null)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmDelete}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
