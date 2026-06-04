import { queryClient } from "@/lib/query-client";
import { homeQueryKeys } from "@/services/home/key";
import { createOrder } from "@/services/order/api";
import { orderQueryKeys } from "@/services/order/key";
import { productQueryKeys } from "@/services/product/key";
import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const response = await createOrder(formData);

    if (response.success) {
      await queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey: homeQueryKeys.all,
      });

      toast.success(response.message || "Order created successfully");
      return redirect("/admin/orders");
    } else {
      toast.error(response.message || "Failed to create order");
      return { error: response.message };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      toast.error(errorData?.message || "Failed to create order");
      return { error: errorData?.message || "Failed to create order" };
    }
    toast.error("An unexpected error occurred");
    return { error: "An unexpected error occurred" };
  }
}
