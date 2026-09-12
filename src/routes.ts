import ForgotPasswordPage from "@/pages/auth/forgot-password";
import AuthLayout from "@/pages/auth/layout";
import ResetPasswordPage from "@/pages/auth/reset-passsword";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";
import VerifyOtpPage from "@/pages/auth/verify-otp";
import BlogPage from "@/pages/blogs";
import BlogDetailPage from "@/pages/blogs/detail";
import ErrorPage from "@/pages/error";
import HomePage from "@/pages/home";
import { CustomerLayout } from "@/pages/layout";
import ProductPage from "@/pages/products";
import ProductDetailPage from "@/pages/products/detail";
import { createBrowserRouter } from "react-router";
// Import loaders and actions
import AdminCategoriesPage from "@/pages/admin/categories";
import AdminLayout from "@/pages/admin/layout";
import { loader as adminLoader } from "@/pages/admin/loader";
import AdminOrdersPage from "@/pages/admin/orders";
import { loader as adminOrdersLoader } from "@/pages/admin/orders/loader";
import AdminPostsPage from "@/pages/admin/posts";
import AdminPostCreatePage from "@/pages/admin/posts/create";
import { action as adminCreatePostAction } from "@/pages/admin/posts/create/action";
import AdminPostDetailPage from "@/pages/admin/posts/detail";
import { loader as adminPostDetailLoader } from "@/pages/admin/posts/detail/loader";
import { loader as adminPostsLoader } from "@/pages/admin/posts/loader";
import AdminPostEditPage from "@/pages/admin/posts/update";
import { action as adminUpdatePostAction } from "@/pages/admin/posts/update/action";
import { loader as adminEditPostLoader } from "@/pages/admin/posts/update/loader";
import AdminProductsPage from "@/pages/admin/products";
import AdminProductCreatePage from "@/pages/admin/products/create";
import { action as adminCreateProductAction } from "@/pages/admin/products/create/action";
import AdminProductDetailPage from "@/pages/admin/products/detail";
import { loader as adminProductDetailLoader } from "@/pages/admin/products/detail/loader";
import { loader as adminProductsLoader } from "@/pages/admin/products/loader";
import AdminProductEditPage from "@/pages/admin/products/update";
import { action as adminUpdateProductAction } from "@/pages/admin/products/update/action";
import { loader as adminEditProductLoader } from "@/pages/admin/products/update/loader";
import AdminProductVariantsPage from "@/pages/admin/products/variants";
import AdminProductVariantCreatePage from "@/pages/admin/products/variants/create";
import { action as adminCreateProductVariantAction } from "@/pages/admin/products/variants/create/action";
import AdminProductVariantDetailPage from "@/pages/admin/products/variants/detail";
import { loader as adminProductVariantDetailLoader } from "@/pages/admin/products/variants/detail/loader";
import { loader as adminProductVariantsLoader } from "@/pages/admin/products/variants/loader";
import AdminProductVariantEditPage from "@/pages/admin/products/variants/update";
import { action as adminUpdateProductVariantAction } from "@/pages/admin/products/variants/update/action";
import { loader as adminEditProductVariantLoader } from "@/pages/admin/products/variants/update/loader";
import AdminSettingsPage from "@/pages/admin/settings";
import { loader as adminSettingsLoader } from "@/pages/admin/settings/loader";
import AdminUsersPage from "@/pages/admin/users";
import AdminUserCreateDialog from "@/pages/admin/users/create";
import { action as adminCreateUserAction } from "@/pages/admin/users/create/action";
import AdminUserDeleteDialog from "@/pages/admin/users/delete";
import { action as adminDeleteUserAction } from "@/pages/admin/users/delete/action";
import { loader as adminDeleteUserLoader } from "@/pages/admin/users/delete/loader";
import { loader as adminUsersLoader } from "@/pages/admin/users/loader";
import AdminUserEditDialog from "@/pages/admin/users/update";
import { action as adminUpdateUserAction } from "@/pages/admin/users/update/action";
import { loader as adminEditUserLoader } from "@/pages/admin/users/update/loader";
import { action as forgotPasswordAction } from "@/pages/auth/forgot-password/action";
import { loader as forgotPasswordLoader } from "@/pages/auth/forgot-password/loader";
import { loader as authLoader } from "@/pages/auth/loader";
import { action as logoutAction } from "@/pages/auth/logout/action";
import { action as resetPasswordAction } from "@/pages/auth/reset-passsword/action";
import { loader as resetPasswordLoader } from "@/pages/auth/reset-passsword/loader";
import { action as signInAction } from "@/pages/auth/sign-in/action";
import { action as signUpAction } from "@/pages/auth/sign-up/action";
import { loader as signUpLoader } from "@/pages/auth/sign-up/loader";
import { action as verifyOtpAction } from "@/pages/auth/verify-otp/action";
import { loader as verifyOtpLoader } from "@/pages/auth/verify-otp/loader";
import { loader as blogLoader } from "@/pages/blogs/detail/loader";
import { loader as blogsLoader } from "@/pages/blogs/loader";
import { loader as homeLoader } from "@/pages/home/loader";
import { loader as customerLoader } from "@/pages/loader";
import { action as productAction } from "@/pages/products/detail/action";
import { loader as productLoader } from "@/pages/products/detail/loader";
import { loader as productsLoader } from "@/pages/products/loader";
import { loader as profileLayoutLoader } from "@/pages/profile/layout-loader";
import { loader as profileLoader } from "@/pages/profile/loader";
import { loader as settingsLoader } from "@/pages/settings/loader";

import AdminBrandsPage from "@/pages/admin/brands";
import AdminBrandCreateDialog from "@/pages/admin/brands/create";
import { action as adminCreateBrandAction } from "@/pages/admin/brands/create/action";
import AdminBrandDeleteDialog from "@/pages/admin/brands/delete";
import { action as adminDeleteBrandAction } from "@/pages/admin/brands/delete/action";
import { loader as adminDeleteBrandLoader } from "@/pages/admin/brands/delete/loader";
import { loader as adminBrandsLoader } from "@/pages/admin/brands/loader";
import AdminBrandEditDialog from "@/pages/admin/brands/update";
import { action as adminUpdateBrandAction } from "@/pages/admin/brands/update/action";
import { loader as adminEditBrandLoader } from "@/pages/admin/brands/update/loader";
import AdminCategoryCreateDialog from "@/pages/admin/categories/create";
import { action as adminCreateCategoryAction } from "@/pages/admin/categories/create/action";
import AdminCategoryDeleteDialog from "@/pages/admin/categories/delete";
import { action as adminDeleteCategoryAction } from "@/pages/admin/categories/delete/action";
import { loader as adminDeleteCategoryLoader } from "@/pages/admin/categories/delete/loader";
import { loader as adminCategoriesLoader } from "@/pages/admin/categories/loader";
import AdminCategoryEditDialog from "@/pages/admin/categories/update";
import { action as adminUpdateCategoryAction } from "@/pages/admin/categories/update/action";
import { loader as adminEditCategoryLoader } from "@/pages/admin/categories/update/loader";
import { loader as adminDashboardLoader } from "@/pages/admin/dashboard/loader";
import AdminDashboardPage from "./pages/admin/dashboard";
import AdminOrderCreatePage from "./pages/admin/orders/create";
import { action as adminCreateOrderAction } from "./pages/admin/orders/create/action";
import AdminOrderDetailPage from "./pages/admin/orders/detail";
import { loader as adminOrderDetailLoader } from "./pages/admin/orders/detail/loader";
import AdminOrderUpdatePage from "./pages/admin/orders/update";
import { action as adminUpdateOrderAction } from "./pages/admin/orders/update/action";
import { loader as adminUpdateOrderLoader } from "./pages/admin/orders/update/loader";

import AdminReviewsPage from "@/pages/admin/reviews";
import AdminReviewDetailPage from "@/pages/admin/reviews/detail";
import { loader as adminReviewDetailLoader } from "@/pages/admin/reviews/detail/loader";
import { loader as adminReviewsLoader } from "@/pages/admin/reviews/loader";

import AdminInventoriesPage from "@/pages/admin/inventories";
import AdminInventoryCreatePage from "@/pages/admin/inventories/create";
import { action as adminInventoryCreateAction } from "@/pages/admin/inventories/create/action";
import { loader as adminInventoriesLoader } from "@/pages/admin/inventories/loader";
import AdminPaymentsPage from "@/pages/admin/payments";
import AdminPaymentCreatePage from "@/pages/admin/payments/create";
import { action as adminPaymentCreateAction } from "@/pages/admin/payments/create/action";
import AdminPaymentDetailPage from "@/pages/admin/payments/detail";
import { loader as adminPaymentDetailLoader } from "@/pages/admin/payments/detail/loader";
import { loader as adminPaymentsLoader } from "@/pages/admin/payments/loader";
import AdminPaymentUpdatePage from "@/pages/admin/payments/update";
import { action as adminUpdatePaymentAction } from "@/pages/admin/payments/update/action";
import { loader as adminEditPaymentLoader } from "@/pages/admin/payments/update/loader";
import AdminRefundsPage from "@/pages/admin/refunds";
import AdminRefundCreatePage from "@/pages/admin/refunds/create";
import { action as adminRefundCreateAction } from "@/pages/admin/refunds/create/action";
import AdminRefundDetailPage from "@/pages/admin/refunds/detail";
import { loader as adminRefundDetailLoader } from "@/pages/admin/refunds/detail/loader";
import { loader as adminRefundsLoader } from "@/pages/admin/refunds/loader";
import AdminRefundUpdatePage from "@/pages/admin/refunds/update";
import { action as adminUpdateRefundAction } from "@/pages/admin/refunds/update/action";
import { loader as adminEditRefundLoader } from "@/pages/admin/refunds/update/loader";
import AdminTransactionsPage from "@/pages/admin/transactions";
import AdminTransactionCreatePage from "@/pages/admin/transactions/create";
import { action as adminTransactionCreateAction } from "@/pages/admin/transactions/create/action";
import AdminTransactionDetailPage from "@/pages/admin/transactions/detail";
import { loader as adminTransactionDetailLoader } from "@/pages/admin/transactions/detail/loader";
import { loader as adminTransactionsLoader } from "@/pages/admin/transactions/loader";
import AdminTransactionEditPage from "@/pages/admin/transactions/update";
import { action as adminUpdateTransactionAction } from "@/pages/admin/transactions/update/action";
import { loader as adminEditTransactionLoader } from "@/pages/admin/transactions/update/loader";
import ProfilePage from "@/pages/profile";
import OrderHistoryPage from "@/pages/profile/orders";
import ReviewPage from "@/pages/profile/reviews";
import WishlistPage from "@/pages/profile/wishlist";
import SettingsPage from "@/pages/settings";
import { baseUrl } from "./config/env";
import { DEFAULT_BRAND_IMAGE } from "./constants/metadata.constant";
import { RootLayout } from "./pages/root-layout";

const privateMetadata = (title: string) => ({
  metadata: {
    title,
    noIndex: true,
  },
});

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
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
                  {
                    "@type": "Organization",
                    name: "Azue Perfume House",
                    url: baseUrl,
                  },
                  {
                    "@type": "WebSite",
                    name: "Azue Perfume House",
                    url: baseUrl,
                  },
                ],
              },
            },
          },
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
              {
                path: ":slug",
                Component: BlogDetailPage,
                loader: blogLoader,
              },
            ],
          },
          {
            path: "products",
            children: [
              {
                index: true,
                Component: ProductPage,
                loader: productsLoader,
              },
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
      {
        path: "/admin",
        ErrorBoundary: ErrorPage,
        Component: AdminLayout,
        loader: adminLoader,
        handle: privateMetadata("Admin | Azue Perfume House"),
        children: [
          {
            index: true,
            Component: AdminDashboardPage,
            loader: adminDashboardLoader,
            handle: privateMetadata("Dashboard | Azue Perfume House"),
          },
          {
            path: "posts",
            handle: privateMetadata("Posts | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminPostsPage,
                loader: adminPostsLoader,
                handle: privateMetadata("Posts | Azue Perfume House"),
              },
              {
                path: "create",
                Component: AdminPostCreatePage,
                action: adminCreatePostAction,
                handle: privateMetadata("Create Post | Azue Perfume House"),
              },
              {
                path: ":slug",
                Component: AdminPostDetailPage,
                loader: adminPostDetailLoader,
                handle: privateMetadata("Post Details | Azue Perfume House"),
              },
              {
                path: ":slug/edit",
                Component: AdminPostEditPage,
                loader: adminEditPostLoader,
                action: adminUpdatePostAction,
                handle: privateMetadata("Edit Post | Azue Perfume House"),
              },
            ],
          },
          {
            path: "products",
            handle: privateMetadata("Products | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminProductsPage,
                loader: adminProductsLoader,
                handle: privateMetadata("Products | Azue Perfume House"),
              },
              {
                path: "create",
                Component: AdminProductCreatePage,
                action: adminCreateProductAction,
                handle: privateMetadata("Create Product | Azue Perfume House"),
              },
              {
                path: ":slug",
                Component: AdminProductDetailPage,
                loader: adminProductDetailLoader,
                handle: privateMetadata("Product Details | Azue Perfume House"),
              },
              {
                path: ":slug/edit",
                Component: AdminProductEditPage,
                loader: adminEditProductLoader,
                action: adminUpdateProductAction,
                handle: privateMetadata("Edit Product | Azue Perfume House"),
              },
              {
                path: ":slug/variants",
                Component: AdminProductVariantsPage,
                loader: adminProductVariantsLoader,
                handle: privateMetadata(
                  "Product Variants | Azue Perfume House",
                ),
              },
              {
                path: ":slug/variants/create",
                Component: AdminProductVariantCreatePage,
                action: adminCreateProductVariantAction,
                handle: privateMetadata(
                  "Create Product Variant | Azue Perfume House",
                ),
              },
              {
                path: ":slug/variants/:variantSlug/edit",
                Component: AdminProductVariantEditPage,
                loader: adminEditProductVariantLoader,
                action: adminUpdateProductVariantAction,
                handle: privateMetadata(
                  "Edit Product Variant | Azue Perfume House",
                ),
              },
              {
                path: ":slug/variants/:variantSlug",
                Component: AdminProductVariantDetailPage,
                loader: adminProductVariantDetailLoader,
                handle: privateMetadata(
                  "Product Variant Details | Azue Perfume House",
                ),
              },
            ],
          },
          {
            path: "brands",
            Component: AdminBrandsPage,
            loader: adminBrandsLoader,
            handle: privateMetadata("Brands | Azue Perfume House"),
            children: [
              {
                path: "create",
                Component: AdminBrandCreateDialog,
                action: adminCreateBrandAction,
                handle: privateMetadata("Create Brand | Azue Perfume House"),
              },
              {
                path: ":slug/edit",
                Component: AdminBrandEditDialog,
                loader: adminEditBrandLoader,
                action: adminUpdateBrandAction,
                handle: privateMetadata("Edit Brand | Azue Perfume House"),
              },
              {
                path: ":slug/delete",
                Component: AdminBrandDeleteDialog,
                loader: adminDeleteBrandLoader,
                action: adminDeleteBrandAction,
                handle: privateMetadata("Delete Brand | Azue Perfume House"),
              },
            ],
          },
          {
            path: "categories",
            Component: AdminCategoriesPage,
            loader: adminCategoriesLoader,
            handle: privateMetadata("Categories | Azue Perfume House"),
            children: [
              {
                path: "create",
                Component: AdminCategoryCreateDialog,
                action: adminCreateCategoryAction,
                handle: privateMetadata("Create Category | Azue Perfume House"),
              },
              {
                path: ":slug/edit",
                Component: AdminCategoryEditDialog,
                loader: adminEditCategoryLoader,
                action: adminUpdateCategoryAction,
                handle: privateMetadata("Edit Category | Azue Perfume House"),
              },
              {
                path: ":slug/delete",
                Component: AdminCategoryDeleteDialog,
                loader: adminDeleteCategoryLoader,
                action: adminDeleteCategoryAction,
                handle: privateMetadata("Delete Category | Azue Perfume House"),
              },
            ],
          },
          {
            path: "users",
            Component: AdminUsersPage,
            loader: adminUsersLoader,
            handle: privateMetadata("Users | Azue Perfume House"),
            children: [
              {
                path: "create",
                Component: AdminUserCreateDialog,
                action: adminCreateUserAction,
                handle: privateMetadata("Create User | Azue Perfume House"),
              },
              {
                path: ":username/edit",
                Component: AdminUserEditDialog,
                loader: adminEditUserLoader,
                action: adminUpdateUserAction,
                handle: privateMetadata("Edit User | Azue Perfume House"),
              },
              {
                path: ":username/delete",
                Component: AdminUserDeleteDialog,
                loader: adminDeleteUserLoader,
                action: adminDeleteUserAction,
                handle: privateMetadata("Delete User | Azue Perfume House"),
              },
            ],
          },
          {
            path: "orders",
            handle: privateMetadata("Orders | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminOrdersPage,
                loader: adminOrdersLoader,
                handle: privateMetadata("Orders | Azue Perfume House"),
              },
              {
                path: ":code",
                Component: AdminOrderDetailPage,
                loader: adminOrderDetailLoader,
                handle: privateMetadata("Order Details | Azue Perfume House"),
              },
              {
                path: ":code/edit",
                Component: AdminOrderUpdatePage,
                loader: adminUpdateOrderLoader,
                action: adminUpdateOrderAction,
                handle: privateMetadata("Edit Order | Azue Perfume House"),
              },
              {
                path: "create",
                Component: AdminOrderCreatePage,
                action: adminCreateOrderAction,
                handle: privateMetadata("Create Order | Azue Perfume House"),
              },
            ],
          },
          {
            path: "reviews",
            handle: privateMetadata("Reviews | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminReviewsPage,
                loader: adminReviewsLoader,
                handle: privateMetadata("Reviews | Azue Perfume House"),
              },
              {
                path: ":id",
                Component: AdminReviewDetailPage,
                loader: adminReviewDetailLoader,
                handle: privateMetadata("Review Details | Azue Perfume House"),
              },
            ],
          },
          {
            path: "refunds",
            handle: privateMetadata("Refunds | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminRefundsPage,
                loader: adminRefundsLoader,
                handle: privateMetadata("Refunds | Azue Perfume House"),
              },
              {
                path: "create",
                Component: AdminRefundCreatePage,
                action: adminRefundCreateAction,
                handle: privateMetadata("Create Refund | Azue Perfume House"),
              },
              {
                path: ":id",
                Component: AdminRefundDetailPage,
                loader: adminRefundDetailLoader,
                handle: privateMetadata("Refund Details | Azue Perfume House"),
              },
              {
                path: ":id/edit",
                Component: AdminRefundUpdatePage,
                action: adminUpdateRefundAction,
                loader: adminEditRefundLoader,
                handle: privateMetadata("Edit Refund | Azue Perfume House"),
              },
            ],
          },
          {
            path: "payments",
            handle: privateMetadata("Payments | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminPaymentsPage,
                loader: adminPaymentsLoader,
                handle: privateMetadata("Payments | Azue Perfume House"),
              },
              {
                path: "create",
                Component: AdminPaymentCreatePage,
                action: adminPaymentCreateAction,
                handle: privateMetadata("Create Payment | Azue Perfume House"),
              },
              {
                path: ":id",
                Component: AdminPaymentDetailPage,
                loader: adminPaymentDetailLoader,
                handle: privateMetadata("Payment Details | Azue Perfume House"),
              },
              {
                path: ":id/edit",
                Component: AdminPaymentUpdatePage,
                action: adminUpdatePaymentAction,
                loader: adminEditPaymentLoader,
                handle: privateMetadata("Edit Payment | Azue Perfume House"),
              },
            ],
          },
          {
            path: "transactions",
            handle: privateMetadata("Transactions | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminTransactionsPage,
                loader: adminTransactionsLoader,
                handle: privateMetadata("Transactions | Azue Perfume House"),
              },
              {
                path: ":id",
                Component: AdminTransactionDetailPage,
                loader: adminTransactionDetailLoader,
                handle: privateMetadata(
                  "Transaction Details | Azue Perfume House",
                ),
              },
              {
                path: ":id/edit",
                Component: AdminTransactionEditPage,
                loader: adminEditTransactionLoader,
                action: adminUpdateTransactionAction,
                handle: privateMetadata(
                  "Edit Transaction | Azue Perfume House",
                ),
              },
              {
                path: "create",
                Component: AdminTransactionCreatePage,
                action: adminTransactionCreateAction,
                handle: privateMetadata(
                  "Create Transaction | Azue Perfume House",
                ),
              },
            ],
          },
          {
            path: "inventories",
            handle: privateMetadata("Inventories | Azue Perfume House"),
            children: [
              {
                index: true,
                Component: AdminInventoriesPage,
                loader: adminInventoriesLoader,
                handle: privateMetadata("Inventories | Azue Perfume House"),
              },
              {
                path: "create",
                Component: AdminInventoryCreatePage,
                action: adminInventoryCreateAction,
                handle: privateMetadata(
                  "Create Inventory | Azue Perfume House",
                ),
              },
            ],
          },
          {
            path: "settings",
            Component: AdminSettingsPage,
            loader: adminSettingsLoader,
            handle: privateMetadata("Admin Settings | Azue Perfume House"),
          },
        ],
      },
    ],
  },
]);
