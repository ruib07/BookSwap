import { useEffect, useState } from "react";
import {
  GetBookImageByBook,
  GetBooksByOwner,
} from "../../services/booksService";
import UserProfileHeader from "../../layouts/UserProfileHeader";
import { IBook } from "../../types/book";
import { useNavigate } from "react-router-dom";

export default function UserBooks() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [bookImages, setBookImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksAndImages = async () => {
      const ownerId = localStorage.getItem("id");
      if (!ownerId) {
        setError("User ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const booksResponse = await GetBooksByOwner(ownerId);
        setBooks(booksResponse.data);

        const images: Record<string, string> = {};
        await Promise.all(
          booksResponse.data.map(async (book: any) => {
            try {
              const imageResponse = await GetBookImageByBook(book.id!);
              images[book.id!] = imageResponse.data.image_url;
            } catch (imageError) {
              images[book.id!] = "https://via.placeholder.com/150";
            }
          })
        );

        setBookImages(images);
      } catch (error) {
        setError("Failed to fetch books or images.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndImages();
  }, []);

  const handleBookClick = (bookId: string) => {
    navigate(`/Book/${encodeURIComponent(bookId)}`);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading your books...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <UserProfileHeader />
      <div className="mt-[100px] p-8">
        <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">
          My Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                className="bg-amber-50 shadow-md rounded-lg p-4 cursor-pointer"
              >
                <img
                  src={bookImages[book.id]}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {book.title}
                </h3>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm text-gray-500 mt-2">{book.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              You have no books.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
