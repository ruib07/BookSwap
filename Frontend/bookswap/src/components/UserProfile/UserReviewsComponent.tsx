import { useEffect, useState } from "react";
import { GetReviewsByReviewer } from "../../services/reviewsService";
import UserProfileHeader from "../../layouts/UserProfileHeader";
import { useNavigate } from "react-router-dom";
import { IReview } from "../../types/review";

export default function UserReviews() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await GetReviewsByReviewer(userId);
        setReviews(response.data);
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  const handleBookClick = (bookId: string) => {
    navigate(`/Book/${encodeURIComponent(bookId)}`);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-center text-gray-600">No reviews available.</p>;
  }

  return (
    <>
      <UserProfileHeader />
      <div className="container mx-auto p-6 mt-[100px]">
        <h2 className="text-2xl font-bold text-orange-900 mb-4 text-center">
          Your Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              onClick={() => handleBookClick(review.book_id)}
              className="shadow-md rounded-lg p-4 max-w-sm overflow-hidden shadow-lg cursor-pointer bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <h6 className="mb-2">
                Rating: <strong>{review.rating}</strong>
              </h6>
              <p className="text-gray-700 mb-2">"{review.comment}"</p>
              <p className="text-gray-500 text-sm">
                Reviewed on: {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
