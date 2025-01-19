import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetBookById, GetBookImageByBook } from "../../services/booksService";
import { IBook } from "../../types/book";
import Header from "../../layouts/Header";
import NotFound from "../../components/404";

export default function BookDetails() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<IBook | null>(null);
  const [bookImage, setBookImage] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("id");

  useEffect(() => {
    const fetchBookAndImage = async () => {
      try {
        const bookResponse = await GetBookById(bookId!);
        const fetchedBook = bookResponse?.data;
        setBook(fetchedBook);

        try {
          const imageResponse = await GetBookImageByBook(bookId!);
          setBookImage(imageResponse.data.image_url);
        } catch (imageError) {
          console.error(`Error fetching image for book ${bookId}:`, imageError);
          setBookImage(
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk8abFHYLv0a4p7JHLils4vSMFOjdIv_nyfGOCZfELZBh4F4QMdR0k2EfJ5pemlMdIrDXlGAj3HFGqc8746iAzd9zwDz8IVbaRZitaWt1GQWYwLJLU9odfgM-Dj1r-froD4bjwseX88Tfs/s1600/unknown+book.jpg"
          );
        }
      } catch (error) {
        setError(`Error fetching book: ${error}`);
      }
    };

    fetchBookAndImage();
  }, [bookId]);

  if (!book) {
    return <NotFound />;
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <br />
      <br />
      <div className="container mx-auto p-6">
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
            <p className="text-gray-700 mb-4">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {book.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Status:</strong> {book.status}
            </p>
            <hr className="my-10" />
            <div className="flex justify-center mt-6">
              <button
                className="bg-orange-900 text-white py-2 px-4 rounded-md hover:bg-orange-800 transition duration-200"
                onClick={() => navigate(`/Transactions`)}
              >
                Trade Book
              </button>
              {book.owner_id === currentUserId && (
                <button
                  className="ms-3 bg-orange-900 text-white py-2 px-4 rounded-md hover:bg-orange-800 transition duration-200"
                  onClick={() => navigate(`/AddBookImage?bookId=${book.id}`)}
                >
                  Add Book Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
