import { GetAuthHeaders } from "./helpers/getAuthHeaders";
import { INewReview } from "../types/review";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetReviewsByBook = async (bookId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/reviews/byBook/${bookId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get reviews by book!");
  }
};

export const GetReviewsByReviewer = async (reviewerId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/reviews/${reviewerId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get reviews by reviewer!");
  }
};

export const AddReview = async (newReview: INewReview) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/reviews`,
      newReview,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add review!");
  }
};
