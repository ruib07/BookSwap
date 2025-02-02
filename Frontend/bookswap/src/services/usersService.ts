import { IUser } from "../types/user";
import apiRequest from "./helpers/apiService";

export const GetUserById = async (userId: string) => {
  return await apiRequest("GET", `users/${userId}`);
};

export const UpdateUser = async (newUserData: Partial<IUser>) => {
  const userId = localStorage.getItem("id");

  if (!userId) {
    throw new Error("User ID not found in local storage!");
  }

  return await apiRequest("PUT", `users/${userId}`, newUserData);
};
