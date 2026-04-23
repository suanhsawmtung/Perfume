import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/header/_index";
import { CartSheet } from "@/components/layouts/header/cart-sheet";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-serif">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartSheet />
    </div>
  );
};
