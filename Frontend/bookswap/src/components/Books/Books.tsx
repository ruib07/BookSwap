import { useEffect, useState } from "react";
import { IBook } from "../../types/book";
import { useNavigate } from "react-router-dom";
import { GetAllBooks, GetBookImageByBook } from "../../services/booksService";
import Header from "../../layouts/Header";

export default function Books() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [bookImages, setBookImages] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasToken, setHasToken] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksAndImages = async () => {
      try {
        const response = await GetAllBooks();
        const fetchedBooks: IBook[] = response?.data;
        setBooks(fetchedBooks);

        const images: Record<string, string> = {};
        await Promise.all(
          fetchedBooks.map(async (book) => {
            try {
              const imageResponse = await GetBookImageByBook(book.id!);
              images[book.id!] = imageResponse.data.image_url;
            } catch (imageError) {}
          })
        );

        setBookImages(images);
      } catch (error) {
        setError("Failed to load books");
      }
    };

    fetchBooksAndImages();

    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (bookId: string) => {
    navigate(`/Book/${encodeURIComponent(bookId)}`);
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="flex flex-col items-center p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Books</h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="flex items-center w-full max-w-md mb-6 space-x-2">
          <input
            type="text"
            placeholder="Search book..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-900 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <a
            href={hasToken ? "/AddBook" : "#"}
            className={`flex items-center justify-center px-4 py-2 rounded-md transition ${
              hasToken
                ? "bg-orange-800 text-white hover:bg-orange-900"
                : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Book
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-8xl">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              onClick={() => handleBookClick(book.id!)}
              className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <img
                className="w-full h-48 object-cover"
                src={
                  bookImages[book.id!] ||
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk8abFHYLv0a4p7JHLils4vSMFOjdIv_nyfGOCZfELZBh4F4QMdR0k2EfJ5pemlMdIrDXlGAj3HFGqc8746iAzd9zwDz8IVbaRZitaWt1GQWYwLJLU9odfgM-Dj1r-froD4bjwseX88Tfs/s1600/unknown+book.jpg"
                }
                alt={book.title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{book.title}</div>
                <div className="flex">
                  <div className="font-semibold text-base mb-2">
                    {book.author}
                  </div>
                  <p className="ms-1 me-1">|</p>
                  <div className="font-semibold text-base mb-2">
                    {book.genre}
                  </div>
                </div>
                <p className="text-gray-700 text-base">{book.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
