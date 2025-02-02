import { INewTransaction } from "../types/transaction";
import apiRequest from "./helpers/apiService";

export const AddTransaction = async (newTransaction: INewTransaction) => {
  return await apiRequest("POST", "transactions", newTransaction);
};
