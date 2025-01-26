import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetBookById, GetBookImageByBook } from "../../services/booksService";
import { IBook } from "../../types/book";
import Header from "../../layouts/Header";
import NotFound from "../../components/404";
import DeleteBookModal from "./DeleteBookModal";
import DeleteBookImageModal from "./DeleteBookImageModal";
import TradeBookModal from "../Transactions/BookTransactionModal";
import ReviewsComponent from "../Reviews/ReviewsComponent";

export default function BookDetails() {
  const { bookId } = useParams<{ bookId: string }>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [book, setBook] = useState<IBook | null>(null);
  const [bookImage, setBookImage] = useState<string | null>(null);
  const [bookImageId, setBookImageId] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("id");
  const isOwner = book?.owner_id === currentUserId;
  const defaultBookImage =
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk8abFHYLv0a4p7JHLils4vSMFOjdIv_nyfGOCZfELZBh4F4QMdR0k2EfJ5pemlMdIrDXlGAj3HFGqc8746iAzd9zwDz8IVbaRZitaWt1GQWYwLJLU9odfgM-Dj1r-froD4bjwseX88Tfs/s1600/unknown+book.jpg";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const fetchBookAndImage = async () => {
      try {
        const bookResponse = await GetBookById(bookId!);
        const fetchedBook = bookResponse.data;
        if (fetchedBook && fetchedBook.id !== book?.id) {
          setBook(fetchedBook);
        }

        try {
          const imageResponse = await GetBookImageByBook(bookId!);
          const newImageUrl = imageResponse.data.image_url;
          if (newImageUrl !== bookImage) {
            setBookImage(newImageUrl);
          }
          setBookImageId(imageResponse.data.id);
        } catch (imageError) {
          setBookImage(defaultBookImage);
        }
      } catch (error) {
        setError(`Error fetching book: ${error}`);
      }
    };

    fetchBookAndImage();
  }, [bookId, book, bookImage]);

  const handleDeleteConfirm = () => navigate("/Books");

  if (!book) return <NotFound />;

  const hasBookImage = bookImage && bookImage !== defaultBookImage;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-6 mt-[70px]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={bookImage!}
            alt={book.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">
              {book.title}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {book.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Status:</strong> {book.status}
            </p>
            <div className="flex justify-center mt-6">
              {!isOwner && (
                <button
                  className={`text-white py-2 px-4 rounded-md transition duration-200 ${
                    isAuthenticated
                      ? "bg-orange-900 hover:bg-orange-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => isAuthenticated && setShowTradeModal(true)}
                  disabled={!isAuthenticated}
                >
                  Trade Book
                </button>
              )}
              {isOwner && (
                <>
                  {!hasBookImage && (
                    <button
                      className="ms-3 bg-orange-900 text-white py-2 px-4 rounded-md hover:bg-orange-800"
                      onClick={() =>
                        navigate(`/AddBookImage?bookId=${book.id}`)
                      }
                    >
                      Add Book Image
                    </button>
                  )}
                  {hasBookImage && (
                    <button
                      className="ms-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
                      onClick={() => setShowDeleteImageModal(true)}
                    >
                      Delete Book Image
                    </button>
                  )}
                  <button
                    className="ms-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Book
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {showTradeModal && (
          <TradeBookModal
            bookId={book.id}
            receiverId={book.owner_id}
            onClose={() => setShowTradeModal(false)}
          />
        )}
        {showDeleteImageModal && (
          <DeleteBookImageModal
            bookImageId={bookImageId || ""}
            onClose={() => setShowDeleteImageModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
        {showDeleteModal && (
          <DeleteBookModal
            bookImageId={bookImageId || ""}
            bookId={book.id}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
        <ReviewsComponent />
      </div>
    </div>
  );
}
