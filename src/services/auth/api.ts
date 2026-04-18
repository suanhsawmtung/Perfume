import api from "@/lib/api";
import type { AuthUser } from "@/stores/auth.store";

export interface AuthCheckResult {
  user: AuthUser | null;
  isSuccess: boolean;
}

export async function checkAuth(): Promise<AuthCheckResult> {
  try {
    const response = await api.get("/auth-check");

    if (response.data.success && response.data.data) {
      return {
        user: response.data.data,
        isSuccess: true,
      };
    }

    return {
      user: null,
      isSuccess: false,
    };
  } catch (error: any) {
    // If not authenticated (401 or other error), return failure
    return {
      user: null,
      isSuccess: false,
    };
  }
}

export const resendOtp = async ({
  email,
  type,
}: {
  email: string;
  type: "VERIFY_EMAIL" | "RESET_PASSWORD";
}): Promise<{
  data: {
    email: string;
    token: string;
  };
  success: boolean;
  message: string;
}> => {
  try {
    const response = await api.post("/auth/resend-otp", {
      email,
      type,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
