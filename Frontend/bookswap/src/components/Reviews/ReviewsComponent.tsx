import { useEffect, useState } from "react";
import { GetReviewsByBook, AddReview } from "../../services/reviewsService";
import { GetUserById } from "../../services/userService";
import { IReview, INewReview } from "../../types/review";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReviewsComponent() {
  const { bookId } = useParams<{ bookId: string }>();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [newRating, setNewRating] = useState("");
  const [newComment, setNewComment] = useState("");
  const [, setError] = useState<string | null>(null);

  const showSuccess = () => {
    toast.success("Review completed successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showWarning = () => {
    toast.warning("Something went wrong!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const showError = () => {
    toast.error("Review was not completed!", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const reviewsResponse = await GetReviewsByBook(bookId!);
        setReviews(reviewsResponse.data || []);
      } catch (error) {
        setError("Failed to load reviews");
        showError();
      }
    };

    fetchComments();
  }, [bookId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const newNames: { [key: string]: string } = {};

      for (const review of reviews) {
        if (!userNames[review.reviewer_id]) {
          try {
            const userResponse = await GetUserById(review.reviewer_id);
            newNames[review.reviewer_id] =
              userResponse.data.username || "Unknown";
          } catch {
            newNames[review.reviewer_id] = "Unknown";
          }
        }
      }

      setUserNames((prevNames) => ({ ...prevNames, ...newNames }));
    };

    if (reviews.length > 0) {
      fetchUserNames();
    }
  }, [reviews, userNames]);

  const handleAddReview = async () => {
    const reviewerId = localStorage.getItem("id");

    if (!reviewerId) {
      showError();
      return;
    }

    if (!newRating || !newComment) {
      showWarning();
      return;
    }

    if (Number(newRating) < 0 || Number(newRating) > 5) {
      showWarning();
      return;
    }

    try {
      const reviewData: INewReview = {
        book_id: bookId!,
        reviewer_id: reviewerId,
        rating: Number(newRating),
        comment: newComment,
      };

      await AddReview(reviewData);
      showSuccess();

      const updatedReviews = await GetReviewsByBook(bookId!);
      setReviews(updatedReviews.data || []);

      setNewRating("");
      setNewComment("");
    } catch (error) {
      showError();
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>

      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="border-b py-2">
            <p className="text-gray-800">
              <strong>{userNames[review.reviewer_id] || "Loading..."}</strong>
            </p>
            <p className="text-yellow-500">Rating: {review.rating} / 5</p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Add a Review</h3>
        <input
          type="number"
          id="Rating"
          name="Rating"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-900 sm:text-sm"
          placeholder="Rating (0 - 5)"
          min="0"
          max="5"
          required
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
        />
        <textarea
          className="w-full rounded-md mt-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-900 sm:text-sm"
          rows={4}
          placeholder="Add a review..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddReview}
          className="bg-orange-900 text-white py-2 px-4 rounded-md mt-2 hover:bg-orange-800 transition duration-200"
        >
          Add Review
        </button>
      </div>
    </div>
  );
}
