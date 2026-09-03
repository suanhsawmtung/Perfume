import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/header";
import { CartSheet } from "@/components/layouts/header/cart-sheet";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col font-serif">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartSheet />
    </div>
  );
};
