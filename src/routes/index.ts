import { RootLayout } from "@/pages/root-layout";
import { createBrowserRouter } from "react-router";
import { adminRoutes } from "./admin.routes";
import { authRoutes } from "./auth.routes";
import { publicRoutes } from "./public.routes";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [...publicRoutes, ...authRoutes, ...adminRoutes],
  },
]);
