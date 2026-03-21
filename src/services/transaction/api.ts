import axios from "@/lib/api";
import type {
  CreateTransactionResponse,
  TransactionFormValues,
  //   TransactionFormValues,
  TransactionListResult,
  TransactionQueryParams,
  TransactionType,
  UpdateTransactionResponse
} from "@/types/transaction.type";

export const DEFAULT_LIMIT = 10;

export const listTransactions = async (params?: TransactionQueryParams): Promise<TransactionListResult> => {
  const response = await axios.get("/admin/transactions", { params });
  return response.data?.data;
};

export const getTransaction = async (id: number): Promise<TransactionType> => {
  const response = await axios.get(`/admin/transactions/${id}`);
  return response.data.data?.transaction;
};

export const createTransaction = async (data: TransactionFormValues): Promise<CreateTransactionResponse> => {
  const response = await axios.post("/admin/transactions", data);
  return response.data;
};

export const updateTransaction = async (
  id: number,
  data: Partial<TransactionFormValues>
): Promise<UpdateTransactionResponse> => {
  const response = await axios.patch(`/admin/transactions/${id}`, data);
  return response.data;
};
