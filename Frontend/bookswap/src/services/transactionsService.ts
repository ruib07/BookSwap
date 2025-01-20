import { INewTransaction } from "../types/transaction";
import { GetAuthHeaders } from "./helpers/getAuthHeaders";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const token = GetAuthHeaders();

export const AddTransaction = async (newTransaction: INewTransaction) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/transactions`,
      newTransaction,
      {
        headers: token,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to add transaction!");
  }
};
