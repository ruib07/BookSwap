import { GetAuthHeaders } from "./helpers/getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const GetMyUser = async () => {
  const userId = localStorage.getItem("id");

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/users/${userId}`,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get your user!");
  }
};
