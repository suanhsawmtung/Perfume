import BlogDetailPage from "@/pages/blogs/detail";
import { loader as blogLoader } from "@/pages/blogs/detail/loader";
import BlogPage from "@/pages/blogs";
import { loader as blogsLoader } from "@/pages/blogs/loader";
import HomePage from "@/pages/home";
import { loader as homeLoader } from "@/pages/home/loader";
import { CustomerLayout } from "@/pages/layout";
import { loader as customerLoader } from "@/pages/loader";
import ProductDetailPage from "@/pages/products/detail";
import { action as productAction } from "@/pages/products/detail/action";
import { loader as productLoader } from "@/pages/products/detail/loader";
import ProductPage from "@/pages/products";
import { loader as productsLoader } from "@/pages/products/loader";
import { action as logoutAction } from "@/pages/auth/logout/action";
import { baseUrl } from "@/config/env";
import { DEFAULT_BRAND_IMAGE } from "@/constants/metadata.constant";
import ErrorPage from "@/pages/error";
import { profileRoutes } from "./profile.routes";

export const publicRoutes = [
  {
    path: "/",
    ErrorBoundary: ErrorPage,
    Component: CustomerLayout,
    loader: customerLoader,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
        handle: {
          metadata: {
            title: "Azue Perfume House | Discover Your Signature Scent",
            description:
              "Explore exquisite fragrances from trusted perfume brands and discover your signature scent at Azue Perfume House.",
            canonical: "/",
            og: {
              title: "Azue Perfume House | Discover Your Signature Scent",
              description:
                "Explore exquisite fragrances from trusted perfume brands and discover your signature scent at Azue Perfume House.",
              image: DEFAULT_BRAND_IMAGE,
              type: "website",
            },
            twitter: {
              title: "Azue Perfume House | Discover Your Signature Scent",
              description:
                "Explore exquisite fragrances from trusted perfume brands and discover your signature scent at Azue Perfume House.",
              image: DEFAULT_BRAND_IMAGE,
            },
            jsonLd: [
              { "@type": "Organization", name: "Azue Perfume House", url: baseUrl },
              { "@type": "WebSite", name: "Azue Perfume House", url: baseUrl },
            ],
          },
        },
      },
      ...profileRoutes,
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "blogs",
        children: [
          {
            index: true,
            Component: BlogPage,
            loader: blogsLoader,
            handle: {
              metadata: {
                title: "Perfume Journal | Azue Perfume House",
                description:
                  "Discover the world of fragrance through our curated stories, helpful guides, expert insights, and inspiration for every scent lover.",
                canonical: "/blogs",
                og: {
                  title: "Perfume Journal | Azue Perfume House",
                  description:
                    "Discover the world of fragrance through our curated stories, helpful guides, expert insights, and inspiration for every scent lover.",
                  image: DEFAULT_BRAND_IMAGE,
                  type: "website",
                },
                twitter: {
                  title: "Perfume Journal | Azue Perfume House",
                  description:
                    "Discover the world of fragrance through our curated stories, helpful guides, expert insights, and inspiration for every scent lover.",
                  image: DEFAULT_BRAND_IMAGE,
                },
              },
            },
          },
          { path: ":slug", Component: BlogDetailPage, loader: blogLoader },
        ],
      },
      {
        path: "products",
        children: [
          { index: true, Component: ProductPage, loader: productsLoader },
          {
            path: ":slug",
            Component: ProductDetailPage,
            loader: productLoader,
            action: productAction,
          },
        ],
      },
    ],
  },
];
