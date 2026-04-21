import { queryClient } from "@/lib/query-client";
import { updateOrder } from "@/services/order/api";
import { orderQueryKeys } from "@/services/order/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export async function action({ request, params }: ActionFunctionArgs) {
  const { code } = params;
  if (!code) {
    throw new Response("Order code is required", { status: 400 });
  }

  const formData = await request.formData();

  try {
    const response = await updateOrder(code, formData);

    // Invalidate queries
    await queryClient.invalidateQueries({
      queryKey: orderQueryKeys.detail(code),
    });

    await queryClient.invalidateQueries({
      queryKey: orderQueryKeys.all,
    });

    // Show success toast
    toast.success(response.message || "Order updated successfully");

    if (response.success) {
      return redirect(`/admin/orders/${code}`);
    }

    return { error: response.message };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to update order");
      return { error: errorData?.message || "Failed to update order" };
    }
    toast.error("An unexpected error occurred");
    return { error: "An unexpected error occurred" };
  }
}
