import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resendOtp } from "../api";

export function useResendOtp() {
  return useMutation({
    mutationFn: (data: {
      email: string;
      type: "VERIFY_EMAIL" | "RESET_PASSWORD";
    }) => resendOtp(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const { updateAuthFlow } = useAuthStore.getState();
        updateAuthFlow({
            email: response.data.email,
            token: response.data.token,
        });
    
        toast.success(
            response.message || "OTP has been resent successfully.",
        );
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });
}
