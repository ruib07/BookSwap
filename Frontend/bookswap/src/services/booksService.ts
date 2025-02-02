import { INewBook, IBookImage, IBook } from "../types/book";
import apiRequest from "./helpers/apiService";

// Books
export const GetAllBooks = async () => {
  return await apiRequest("GET", "books");
};

export const GetBookById = async (bookId: string) => {
  return await apiRequest("GET", `books/${bookId}`);
};

export const GetBooksByOwner = async (ownerId: string) => {
  return await apiRequest("GET", `books/byOwner/${ownerId}`);
};

export const AddBook = async (newBook: INewBook) => {
  return await apiRequest("POST", "books", newBook);
};

export const UpdateBook = async (
  bookId: string,
  newBookData: Partial<IBook>
) => {
  return await apiRequest("PUT", `books/${bookId}`, newBookData);
};

export const DeleteBook = async (bookId: string) => {
  return await apiRequest("DELETE", `books/${bookId}`);
};

// Book Images
export const GetBookImageByBook = async (bookId: string) => {
  return await apiRequest("GET", `bookImages/${bookId}`);
};

export const AddBookImage = async (newBookImage: IBookImage) => {
  return await apiRequest("POST", "bookImages", newBookImage);
};

export const DeleteBookImage = async (bookImageId: string) => {
  return await apiRequest("DELETE", `bookImages/${bookImageId}`);
};
