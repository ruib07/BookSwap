import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import GoToTopPage from "./components/Button/GoToTopPage";
import ScrollToTopButton from "./components/Button/ScrollToTopButton";

import Home from "./pages/Home";
import NotFound from "./pages/404";

import NewRegistration from "./pages/Registration";
import Authentication from "./pages/Login";
import RecoverPasswordEmail from "./components/PasswordRecovery/RecoverPasswordEmail";
import RecoverPasswordUpdate from "./components/PasswordRecovery/ChangePassword";

import BookCreation from "./components/Books/AddBook";
import Books from "./components/Books/Books";
import BookDetails from "./components/Books/BookDetails";
import BookImageCreation from "./components/Books/AddBookImage";

import Profile from "./components/UserProfile/Profile";
import UserBooks from "./components/UserProfile/UserBooks";
import UserReviews from "./components/UserProfile/UserReviews";

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
            <Route
              path="/RecoverPassword/SendEmail"
              element={<RecoverPasswordEmail />}
            />
            <Route
              path="/RecoverPassword/ChangePassword"
              element={<RecoverPasswordUpdate />}
            />
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
