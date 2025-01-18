import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import NewRegistration from "./components/Authentication/RegistrationComponent";
import Authentication from "./components/Authentication/LoginComponent";
import NotFound from "./components/404";
import Home from "./components/HomeComponent";
import BookCreation from "./components/Books/AddBookComponent";
import Books from "./components/Books/BooksComponent";
import GoToTopPage from "./hooks/GoToTopPage";
import ScrollToTopButton from "./hooks/ScrollToTopButton";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
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
            <Route path="/AddBook" element={<BookCreation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
