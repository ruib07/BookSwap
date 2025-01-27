import { useEffect, useState } from "react";
import { GetMyUser, UpdateUser } from "../../services/usersService";
import { IUser } from "../../types/user";
import UserProfileHeader from "../../layouts/UserProfileHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [visible, setVisible] = useState<boolean>(true);
  const [formData, setFormData] = useState<Partial<IUser>>({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await GetMyUser();
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          password: "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      password: "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await UpdateUser(formData);
      setUser({ ...user!, ...formData });
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <UserProfileHeader />
      <div className="min-h-screen flex items-start justify-center mt-[140px]">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">
            Profile
          </h2>

          {user ? (
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <img
                  src={"https://pngimg.com/d/anonymous_mask_PNG28.png"}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border-4 border-orange-900"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full mt-1 p-2 border ${
                        isEditing ? "border-orange-900" : "border-gray-300"
                      } rounded-md`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full mt-1 p-2 border ${
                        isEditing ? "border-orange-900" : "border-gray-300"
                      } rounded-md`}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={visible ? "password" : "text"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full mt-1 p-2 pr-10 border ${
                        isEditing ? "border-orange-900" : "border-gray-300"
                      } rounded-md`}
                    />
                    <span
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />
                    </span>
                  </div>
                </div>

                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="w-full bg-orange-900 text-white py-2 rounded-md hover:bg-orange-700 transition"
                  >
                    Edit Information
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-orange-900 text-white py-2 rounded-md hover:bg-orange-700 transition"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading profile...</p>
          )}
        </div>
      </div>
    </>
  );
}
