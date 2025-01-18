import { INewBook, IBookImage } from "../types/book";
import { GetAuthHeaders } from "./helpers/getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

// Books
export const GetAllBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${API_VERSION}/books`, {
      headers: token,
    });

    return response;
  } catch (error) {
    throw new Error("Failed to get all books!");
  }
};

export const GetBookById = async (bookId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/books/${bookId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get book by his Id!");
  }
};

export const AddBook = async (newBook: INewBook) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/books`,
      newBook,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add book!");
  }
};

//Book Images
export const GetBookImageByBook = async (bookId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/bookImages/${bookId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get book images!");
  }
};

export const AddBookImage = async (newBookImage: IBookImage) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/bookImages`,
      newBookImage,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add book image!");
  }
};
