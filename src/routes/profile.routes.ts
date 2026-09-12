import ProfilePage from "@/pages/profile";
import { loader as profileLayoutLoader } from "@/pages/profile/layout-loader";
import OrderHistoryPage from "@/pages/profile/orders";
import { loader as profileLoader } from "@/pages/profile/loader";
import ReviewPage from "@/pages/profile/reviews";
import WishlistPage from "@/pages/profile/wishlist";
import SettingsPage from "@/pages/settings";
import { loader as settingsLoader } from "@/pages/settings/loader";
import { privateMetadata } from "./metadata";

export const profileRoutes = [
  {
    path: "profile",
    loader: profileLayoutLoader,
    handle: privateMetadata("Profile | Azue Perfume House"),
    children: [
      {
        index: true,
        Component: ProfilePage,
        loader: profileLoader,
        handle: privateMetadata("Profile | Azue Perfume House"),
      },
      {
        path: "reviews",
        Component: ReviewPage,
        handle: privateMetadata("My Reviews | Azue Perfume House"),
      },
      {
        path: "wishlists",
        Component: WishlistPage,
        handle: privateMetadata("My Wishlist | Azue Perfume House"),
      },
      {
        path: "orders",
        Component: OrderHistoryPage,
        handle: privateMetadata("My Orders | Azue Perfume House"),
      },
    ],
  },
  {
    path: "settings",
    Component: SettingsPage,
    loader: settingsLoader,
    handle: privateMetadata("Settings | Azue Perfume House"),
  },
];
