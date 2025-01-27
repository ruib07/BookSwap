import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { RecoverPasswordChange } from "../../../services/recoverPasswordService";

export default function RecoverPasswordUpdate() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location]);

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match!", {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    try {
      await RecoverPasswordChange({ token, newPassword, confirmNewPassword });
      showToast("Password changed successfully!", "success");
      navigate("/Authentication/Login");
    } catch (error) {
      showToast("Password has not been changed!", "error");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              New Password
            </label>
            <div className="mt-2 relative">
              <input
                type={visibleNewPassword ? "text" : "password"}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-900 sm:text-sm"
                placeholder="New password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setVisibleNewPassword(!visibleNewPassword)}
              >
                <FontAwesomeIcon
                  icon={visibleNewPassword ? faEye : faEyeSlash}
                />
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Confirm New Password
            </label>
            <div className="mt-2 relative">
              <input
                type={visibleConfirmPassword ? "text" : "password"}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-900 sm:text-sm"
                placeholder="Confirm new password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              >
                <FontAwesomeIcon
                  icon={visibleConfirmPassword ? faEye : faEyeSlash}
                />
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
