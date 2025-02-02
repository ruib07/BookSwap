import { INewReview } from "../types/review";
import apiRequest from "./helpers/apiService";

export const GetReviewsByBook = async (bookId: string) => {
  return await apiRequest("GET", `reviews/byBook/${bookId}`);
};

export const GetReviewsByReviewer = async (reviewerId: string) => {
  return await apiRequest("GET", `reviews/${reviewerId}`);
};

export const AddReview = async (newReview: INewReview) => {
  return await apiRequest("POST", "reviews", newReview);
};
