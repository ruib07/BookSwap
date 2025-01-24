import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import GoToTopPage from "./hooks/GoToTopPage";
import ScrollToTopButton from "./hooks/ScrollToTopButton";

import Home from "./components/HomeComponent";
import NotFound from "./components/404";
import NewRegistration from "./components/Authentication/RegistrationComponent";
import Authentication from "./components/Authentication/LoginComponent";
import BookCreation from "./components/Books/AddBookComponent";
import Books from "./components/Books/BooksComponent";
import BookDetails from "./components/Books/BookDetailsComponent";
import BookImageCreation from "./components/Books/AddBookImageComponent";
import Profile from "./components/UserProfile/ProfileComponent";
import UserBooks from "./components/UserProfile/UserBooksComponent";
import UserReviews from "./components/UserProfile/UserReviewsComponent";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-amber-50">
        <ToastContainer />
        <GoToTopPage />
        <ScrollToTopButton />

        <div className="flex-grow container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Authentication/Registration"
              element={<NewRegistration />}
            />
            <Route path="/Authentication/Login" element={<Authentication />} />
            <Route path="/Books" element={<Books />} />
            <Route path="/Book/:bookId" element={<BookDetails />} />
            <Route path="/AddBook" element={<BookCreation />} />
            <Route path="/AddBookImage" element={<BookImageCreation />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/MyBooks" element={<UserBooks />} />
            <Route path="/MyReviews" element={<UserReviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
