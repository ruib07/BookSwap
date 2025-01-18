import { useEffect, useState } from "react";
import { IBook } from "../types/book";
import { GetAllBooks, GetBookImageByBook } from "../services/booksService";
import Header from "../layouts/Header";

export default function Home() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [bookImages, setBookImages] = useState<Record<string, string>>({});
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await GetAllBooks();
        const fetchedBooks: IBook[] = response.data.slice(0, 10);
        setBooks(fetchedBooks);

        const images: Record<string, string> = {};
        await Promise.all(
          fetchedBooks.map(async (book) => {
            try {
              const imageResponse = await GetBookImageByBook(book.id);
              images[book.id] = imageResponse.data.image_url;
            } catch (imageError) {
              console.error(
                `Error fetching image for book ${book.id}:`,
                imageError
              );
            }
          })
        );

        setBookImages(images);
      } catch (error) {
        console.error("Error fetching books or images:", error);
      }
    };

    fetchBooks();
  }, []);

  const nextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevSlide = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length
    );
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="bg-white min-h-screen">
        <section className="bg-white text-white py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl text-orange-900 font-bold mb-4">
              Welcome to BookSwap
            </h2>
            <p className="text-lg text-orange-800 mb-8">
              Discover, share, and trade books with others. Your next great read
              is just a swap away!
            </p>
            <button className="bg-orange-900 text-white px-6 py-2 font-semibold rounded-md hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold text-orange-900 mb-8">
              Explore Our Collection
            </h3>
            <div className="relative max-w-4xl mx-auto">
              {books.length > 0 && (
                <div className="flex items-center">
                  <button
                    className="absolute left-0 z-10 bg-orange-900 text-white rounded-full p-3 hover:bg-orange-700 shadow-lg transform -translate-x-1/2"
                    onClick={prevSlide}
                  >
                    &lt;
                  </button>
                  <div className="w-full px-8">
                    <div className="p-6 shadow-lg rounded-lg bg-white border border-gray-200">
                      <img
                        src={
                          bookImages[books[carouselIndex].id] ||
                          "/placeholder.png"
                        }
                        alt={books[carouselIndex].title}
                        className="w-full h-64 object-cover rounded-md mb-4"
                      />
                      <h4 className="text-2xl font-bold text-orange-900 mb-2">
                        {books[carouselIndex].title}
                      </h4>
                      <h5 className="text-2xl font-bold text-orange-900 mb-2">
                        {books[carouselIndex].author}
                      </h5>
                      <p className="text-gray-600">
                        {books[carouselIndex].genre}
                      </p>
                      <p className="text-gray-600">
                        {books[carouselIndex].description}
                      </p>
                      <p className="text-gray-600">
                        {books[carouselIndex].status}
                      </p>
                    </div>
                  </div>
                  <button
                    className="absolute right-0 z-10 bg-orange-900 text-white rounded-full p-3 hover:bg-orange-700 shadow-lg transform translate-x-1/2"
                    onClick={nextSlide}
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
