import ForgotPasswordPage from "@/pages/auth/forgot-password";
import { action as forgotPasswordAction } from "@/pages/auth/forgot-password/action";
import { loader as forgotPasswordLoader } from "@/pages/auth/forgot-password/loader";
import AuthLayout from "@/pages/auth/layout";
import { loader as authLoader } from "@/pages/auth/loader";
import ResetPasswordPage from "@/pages/auth/reset-passsword";
import { action as resetPasswordAction } from "@/pages/auth/reset-passsword/action";
import { loader as resetPasswordLoader } from "@/pages/auth/reset-passsword/loader";
import SignInPage from "@/pages/auth/sign-in";
import { action as signInAction } from "@/pages/auth/sign-in/action";
import SignUpPage from "@/pages/auth/sign-up";
import { action as signUpAction } from "@/pages/auth/sign-up/action";
import { loader as signUpLoader } from "@/pages/auth/sign-up/loader";
import VerifyOtpPage from "@/pages/auth/verify-otp";
import { action as verifyOtpAction } from "@/pages/auth/verify-otp/action";
import { loader as verifyOtpLoader } from "@/pages/auth/verify-otp/loader";
import { privateMetadata } from "./metadata";

export const authRoutes = [
  {
    Component: AuthLayout,
    loader: authLoader,
    children: [
      {
        path: "/sign-in",
        Component: SignInPage,
        action: signInAction,
        handle: privateMetadata("Sign In | Azue Perfume House"),
      },
      {
        path: "/sign-up",
        Component: SignUpPage,
        loader: signUpLoader,
        action: signUpAction,
        handle: privateMetadata("Sign Up | Azue Perfume House"),
      },
      {
        path: "/verify-otp",
        Component: VerifyOtpPage,
        loader: verifyOtpLoader,
        action: verifyOtpAction,
        handle: privateMetadata("Verify OTP | Azue Perfume House"),
      },
      {
        path: "/verify-password-otp",
        Component: VerifyOtpPage,
        loader: verifyOtpLoader,
        action: verifyOtpAction,
        handle: privateMetadata("Verify Password OTP | Azue Perfume House"),
      },
      {
        path: "/forgot-password",
        Component: ForgotPasswordPage,
        loader: forgotPasswordLoader,
        action: forgotPasswordAction,
        handle: privateMetadata("Forgot Password | Azue Perfume House"),
      },
      {
        path: "/reset-password",
        Component: ResetPasswordPage,
        loader: resetPasswordLoader,
        action: resetPasswordAction,
        handle: privateMetadata("Reset Password | Azue Perfume House"),
      },
    ],
  },
];
