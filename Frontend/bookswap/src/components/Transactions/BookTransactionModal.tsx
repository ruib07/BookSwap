import { useEffect, useState } from "react";
import { GetBooksByOwner, UpdateBook } from "../../services/booksService";
import { AddTransaction } from "../../services/transactionsService";
import { toast } from "react-toastify";
import { IBook } from "../../types/book";
import { ITradeBookModalProps } from "../../types/transaction";

export default function TradeBookModal({
  bookId,
  receiverId,
  onClose,
}: ITradeBookModalProps) {
  const [userBooks, setUserBooks] = useState<IBook[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const currentUserId = localStorage.getItem("id") || "";

  const showSuccess = () => {
    toast.success("Trade successful!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showWarning = () => {
    toast.warning("Please select a book to trade.", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showError = () => {
    toast.error("Failed to complete the trade!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await GetBooksByOwner(currentUserId);
        setUserBooks(response.data);
      } catch (error) {
        showError();
      }
    };

    fetchUserBooks();
  }, [currentUserId]);

  const handleTrade = async () => {
    if (!selectedBookId) {
      showWarning();
      return;
    }

    try {
      await UpdateBook(bookId, { status: "Traded", owner_id: currentUserId });
      await UpdateBook(selectedBookId, {
        status: "Traded",
        owner_id: receiverId,
      });

      await AddTransaction({
        book_id: bookId,
        sender_id: currentUserId,
        receiver_id: receiverId,
        status: "Completed",
      });

      showSuccess();
      onClose();
    } catch (error) {
      showError();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          Which book do you want to trade?
        </h2>
        <select
          className="border p-2 w-full mb-4"
          value={selectedBookId || ""}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          <option value="" disabled>
            Select a book
          </option>
          {userBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-orange-900 text-white px-4 py-2 rounded-md"
            onClick={handleTrade}
          >
            Trade
          </button>
        </div>
      </div>
    </div>
  );
}
