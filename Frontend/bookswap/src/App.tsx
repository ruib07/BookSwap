import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import NewRegistration from "./components/Authentication/RegistrationComponent";
import Authentication from "./components/Authentication/LoginComponent";
import NotFound from "./components/404";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ToastContainer />

        <div className="flex-grow container mx-auto">
          <Routes>
            <Route
              path="/Authentication/Registration"
              element={<NewRegistration />}
            />
            <Route path="/Authentication/Login" element={<Authentication />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
