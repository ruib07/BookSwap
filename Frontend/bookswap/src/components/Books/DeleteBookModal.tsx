import { toast } from "react-toastify";
import { DeleteBook, DeleteBookImage } from "../../services/booksService";
import { DeleteProjectModalProps } from "../../types/book";

export default function DeleteABook({
  bookImageId,
  bookId,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  const showSuccess = () => {
    toast.success("Book removed successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showError = () => {
    toast.error("Book was not removed!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const handleDelete = () => {
    try {
      DeleteBookImage(bookImageId);
      DeleteBook(bookId);
      onConfirm();
      showSuccess();
      onClose();
    } catch (error) {
      showError();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Are you sure that you want to delete this book?
        </h2>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
