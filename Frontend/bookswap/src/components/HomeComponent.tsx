import { useEffect, useState } from "react";
import { IBook } from "../types/book";
import { GetAllBooks, GetBookImageByBook } from "../services/booksService";
import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [bookImages, setBookImages] = useState<Record<string, string>>({});
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

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
            } catch (imageError) {}
          })
        );

        setBookImages(images);
      } catch (error) {}
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [books.length]);

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
      <div className="min-h-screen">
        <section
          className="relative text-white py-20"
          style={{
            backgroundImage:
              "url('https://miro.medium.com/v2/resize:fit:1200/1*6Jp3vJWe7VFlFHZ9WhSJng.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-5xl font-bold mb-4">Welcome to BookSwap</h2>
            <p className="text-lg mb-8">
              Discover, share, and trade books with others. Your next great read
              is just a swap away!
            </p>
            <button
              className="bg-orange-900 text-white px-8 py-3 font-semibold rounded-md hover:bg-orange-700 transition"
              onClick={() => navigate("/Books")}
            >
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
                      <h5 className="text-lg font-bold text-orange-800 mb-1">
                        {books[carouselIndex].author}
                      </h5>
                      <p className="text-gray-900 mb-2">
                        {books[carouselIndex].genre}
                      </p>
                      <p className="text-gray-600 truncate">
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

        <section className="py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold text-orange-900 mb-12">
              Why Choose BookSwap?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer">
              <div className="p-6 bg-white shadow-md rounded-lg">
                <img
                  src="https://cdn-icons-png.freepik.com/512/6146/6146685.png"
                  alt="Easy Swapping"
                  className="w-16 mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-orange-900 mb-2">
                  Easy Swapping
                </h4>
                <p className="text-gray-600">
                  Swap your books effortlessly with fellow readers.
                </p>
              </div>

              <div className="p-6 bg-white shadow-md rounded-lg">
                <img
                  src="https://static.thenounproject.com/png/1588876-200.png"
                  alt="Wide Selection"
                  className="w-16 mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-orange-900 mb-2">
                  Wide Selection
                </h4>
                <p className="text-gray-600">
                  Choose from thousands of books across various genres.
                </p>
              </div>

              <div className="p-6 bg-white shadow-md rounded-lg">
                <img
                  src="https://icons.veryicon.com/png/o/business/classic-icon/community-12.png"
                  alt="Community Engagement"
                  className="w-16 mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-orange-900 mb-2">
                  Community Engagement
                </h4>
                <p className="text-gray-600">
                  Connect with book lovers and build your personal library.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
