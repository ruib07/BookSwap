import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IBookImage } from "../../types/book";
import { AddBookImage } from "../../services/booksService";
import Header from "../../layouts/Header";

export default function BookImageCreation() {
  const [image_url, setImageUrl] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const book_id = searchParams.get("bookId");

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book_id) {
      return;
    }

    const newBookImage: IBookImage = {
      book_id,
      image_url,
    };

    try {
      await AddBookImage(newBookImage);
      showToast("Registration completed successfully!", "success");

      setImageUrl("");
      navigate(`/Book/${book_id}`);
    } catch (error) {
      showToast("Registration failed!", "error");
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create Book Image
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Image Url
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="Image Url"
                  name="Image Url"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  placeholder="Image Url"
                  required
                  value={image_url}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
