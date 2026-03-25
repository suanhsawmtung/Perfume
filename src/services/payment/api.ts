import axios from "@/lib/api";
import type {
  CreatePaymentResponse,
  PaymentFormValues,
  PaymentListResult,
  PaymentQueryParams,
  PaymentType,
  UpdatePaymentResponse,
  VerifyPaymentResponse,
  VoidPaymentResponse
} from "@/types/payment.type";

export const DEFAULT_LIMIT = 10;

export const listPayments = async (params?: PaymentQueryParams): Promise<PaymentListResult> => {
  const response = await axios.get("/admin/payments", { params });
  const data = response.data?.data;
  
  return {
    items: data?.items || [],
    currentPage: data?.currentPage || 1,
    totalPages: data?.totalPages || 1,
    pageSize: data?.pageSize || DEFAULT_LIMIT,
    totalCount: data?.totalCount || 0,
  };
};

export const getPayment = async (id: number): Promise<PaymentType> => {
  const response = await axios.get(`/admin/payments/${id}`);
  return response.data.data?.payment;
};

export const createPayment = async (data: PaymentFormValues): Promise<CreatePaymentResponse> => {
  const response = await axios.post("/admin/payments", data);
  return response.data;
};

export const updatePayment = async (
  id: number,
  data: Partial<PaymentFormValues>
): Promise<UpdatePaymentResponse> => {
  const response = await axios.patch(`/admin/payments/${id}`, data);
  return response.data;
};

export const verifyPayment = async (
  id: number,
  data: { status: "SUCCESS" | "FAILED" }
): Promise<VerifyPaymentResponse> => {
  const response = await axios.patch(`/admin/payments/${id}/verify`, data);
  return response.data;
};

export const voidPayment = async (id: number): Promise<VoidPaymentResponse> => {
  const response = await axios.patch(`/admin/payments/${id}/void`);
  return response.data;
};
