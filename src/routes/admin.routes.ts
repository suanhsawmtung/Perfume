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
import AdminCategoriesPage from "@/pages/admin/categories";
import AdminCategoryCreateDialog from "@/pages/admin/categories/create";
import { action as adminCreateCategoryAction } from "@/pages/admin/categories/create/action";
import AdminCategoryDeleteDialog from "@/pages/admin/categories/delete";
import { action as adminDeleteCategoryAction } from "@/pages/admin/categories/delete/action";
import { loader as adminDeleteCategoryLoader } from "@/pages/admin/categories/delete/loader";
import { loader as adminCategoriesLoader } from "@/pages/admin/categories/loader";
import AdminCategoryEditDialog from "@/pages/admin/categories/update";
import { action as adminUpdateCategoryAction } from "@/pages/admin/categories/update/action";
import { loader as adminEditCategoryLoader } from "@/pages/admin/categories/update/loader";
import AdminDashboardPage from "@/pages/admin/dashboard";
import { loader as adminDashboardLoader } from "@/pages/admin/dashboard/loader";
import AdminLayout from "@/pages/admin/layout";
import { loader as adminLoader } from "@/pages/admin/loader";
import AdminInventoryCreatePage from "@/pages/admin/inventories/create";
import { action as adminInventoryCreateAction } from "@/pages/admin/inventories/create/action";
import AdminInventoriesPage from "@/pages/admin/inventories";
import { loader as adminInventoriesLoader } from "@/pages/admin/inventories/loader";
import AdminOrderCreatePage from "@/pages/admin/orders/create";
import { action as adminCreateOrderAction } from "@/pages/admin/orders/create/action";
import AdminOrderDetailPage from "@/pages/admin/orders/detail";
import { loader as adminOrderDetailLoader } from "@/pages/admin/orders/detail/loader";
import AdminOrdersPage from "@/pages/admin/orders";
import { loader as adminOrdersLoader } from "@/pages/admin/orders/loader";
import AdminOrderUpdatePage from "@/pages/admin/orders/update";
import { action as adminUpdateOrderAction } from "@/pages/admin/orders/update/action";
import { loader as adminUpdateOrderLoader } from "@/pages/admin/orders/update/loader";
import AdminPaymentCreatePage from "@/pages/admin/payments/create";
import { action as adminPaymentCreateAction } from "@/pages/admin/payments/create/action";
import AdminPaymentDetailPage from "@/pages/admin/payments/detail";
import { loader as adminPaymentDetailLoader } from "@/pages/admin/payments/detail/loader";
import AdminPaymentsPage from "@/pages/admin/payments";
import { loader as adminPaymentsLoader } from "@/pages/admin/payments/loader";
import AdminPaymentUpdatePage from "@/pages/admin/payments/update";
import { action as adminUpdatePaymentAction } from "@/pages/admin/payments/update/action";
import { loader as adminEditPaymentLoader } from "@/pages/admin/payments/update/loader";
import AdminPostCreatePage from "@/pages/admin/posts/create";
import { action as adminCreatePostAction } from "@/pages/admin/posts/create/action";
import AdminPostDetailPage from "@/pages/admin/posts/detail";
import { loader as adminPostDetailLoader } from "@/pages/admin/posts/detail/loader";
import AdminPostsPage from "@/pages/admin/posts";
import { loader as adminPostsLoader } from "@/pages/admin/posts/loader";
import AdminPostEditPage from "@/pages/admin/posts/update";
import { action as adminUpdatePostAction } from "@/pages/admin/posts/update/action";
import { loader as adminEditPostLoader } from "@/pages/admin/posts/update/loader";
import AdminProductCreatePage from "@/pages/admin/products/create";
import { action as adminCreateProductAction } from "@/pages/admin/products/create/action";
import AdminProductDetailPage from "@/pages/admin/products/detail";
import { loader as adminProductDetailLoader } from "@/pages/admin/products/detail/loader";
import AdminProductsPage from "@/pages/admin/products";
import { loader as adminProductsLoader } from "@/pages/admin/products/loader";
import AdminProductEditPage from "@/pages/admin/products/update";
import { action as adminUpdateProductAction } from "@/pages/admin/products/update/action";
import { loader as adminEditProductLoader } from "@/pages/admin/products/update/loader";
import AdminProductVariantCreatePage from "@/pages/admin/products/variants/create";
import { action as adminCreateProductVariantAction } from "@/pages/admin/products/variants/create/action";
import AdminProductVariantDetailPage from "@/pages/admin/products/variants/detail";
import { loader as adminProductVariantDetailLoader } from "@/pages/admin/products/variants/detail/loader";
import AdminProductVariantsPage from "@/pages/admin/products/variants";
import { loader as adminProductVariantsLoader } from "@/pages/admin/products/variants/loader";
import AdminProductVariantEditPage from "@/pages/admin/products/variants/update";
import { action as adminUpdateProductVariantAction } from "@/pages/admin/products/variants/update/action";
import { loader as adminEditProductVariantLoader } from "@/pages/admin/products/variants/update/loader";
import AdminRefundCreatePage from "@/pages/admin/refunds/create";
import { action as adminRefundCreateAction } from "@/pages/admin/refunds/create/action";
import AdminRefundDetailPage from "@/pages/admin/refunds/detail";
import { loader as adminRefundDetailLoader } from "@/pages/admin/refunds/detail/loader";
import AdminRefundsPage from "@/pages/admin/refunds";
import { loader as adminRefundsLoader } from "@/pages/admin/refunds/loader";
import AdminRefundUpdatePage from "@/pages/admin/refunds/update";
import { action as adminUpdateRefundAction } from "@/pages/admin/refunds/update/action";
import { loader as adminEditRefundLoader } from "@/pages/admin/refunds/update/loader";
import AdminReviewDetailPage from "@/pages/admin/reviews/detail";
import { loader as adminReviewDetailLoader } from "@/pages/admin/reviews/detail/loader";
import AdminReviewsPage from "@/pages/admin/reviews";
import { loader as adminReviewsLoader } from "@/pages/admin/reviews/loader";
import AdminSettingsPage from "@/pages/admin/settings";
import { loader as adminSettingsLoader } from "@/pages/admin/settings/loader";
import AdminTransactionCreatePage from "@/pages/admin/transactions/create";
import { action as adminTransactionCreateAction } from "@/pages/admin/transactions/create/action";
import AdminTransactionDetailPage from "@/pages/admin/transactions/detail";
import { loader as adminTransactionDetailLoader } from "@/pages/admin/transactions/detail/loader";
import AdminTransactionsPage from "@/pages/admin/transactions";
import { loader as adminTransactionsLoader } from "@/pages/admin/transactions/loader";
import AdminTransactionEditPage from "@/pages/admin/transactions/update";
import { action as adminUpdateTransactionAction } from "@/pages/admin/transactions/update/action";
import { loader as adminEditTransactionLoader } from "@/pages/admin/transactions/update/loader";
import AdminUserCreateDialog from "@/pages/admin/users/create";
import { action as adminCreateUserAction } from "@/pages/admin/users/create/action";
import AdminUserDeleteDialog from "@/pages/admin/users/delete";
import { action as adminDeleteUserAction } from "@/pages/admin/users/delete/action";
import { loader as adminDeleteUserLoader } from "@/pages/admin/users/delete/loader";
import AdminUsersPage from "@/pages/admin/users";
import { loader as adminUsersLoader } from "@/pages/admin/users/loader";
import AdminUserEditDialog from "@/pages/admin/users/update";
import { action as adminUpdateUserAction } from "@/pages/admin/users/update/action";
import { loader as adminEditUserLoader } from "@/pages/admin/users/update/loader";
import ErrorPage from "@/pages/error";
import { privateMetadata } from "./metadata";

const admin = (title: string) => privateMetadata(`${title} | Azue Perfume House`);

export const adminRoutes = [
  {
    path: "/admin",
    ErrorBoundary: ErrorPage,
    Component: AdminLayout,
    loader: adminLoader,
    handle: admin("Admin"),
    children: [
      { index: true, Component: AdminDashboardPage, loader: adminDashboardLoader, handle: admin("Dashboard") },
      {
        path: "posts",
        handle: admin("Posts"),
        children: [
          { index: true, Component: AdminPostsPage, loader: adminPostsLoader, handle: admin("Posts") },
          { path: "create", Component: AdminPostCreatePage, action: adminCreatePostAction, handle: admin("Create Post") },
          { path: ":slug", Component: AdminPostDetailPage, loader: adminPostDetailLoader, handle: admin("Post Details") },
          { path: ":slug/edit", Component: AdminPostEditPage, loader: adminEditPostLoader, action: adminUpdatePostAction, handle: admin("Edit Post") },
        ],
      },
      {
        path: "products",
        handle: admin("Products"),
        children: [
          { index: true, Component: AdminProductsPage, loader: adminProductsLoader, handle: admin("Products") },
          { path: "create", Component: AdminProductCreatePage, action: adminCreateProductAction, handle: admin("Create Product") },
          { path: ":slug", Component: AdminProductDetailPage, loader: adminProductDetailLoader, handle: admin("Product Details") },
          { path: ":slug/edit", Component: AdminProductEditPage, loader: adminEditProductLoader, action: adminUpdateProductAction, handle: admin("Edit Product") },
          { path: ":slug/variants", Component: AdminProductVariantsPage, loader: adminProductVariantsLoader, handle: admin("Product Variants") },
          { path: ":slug/variants/create", Component: AdminProductVariantCreatePage, action: adminCreateProductVariantAction, handle: admin("Create Product Variant") },
          { path: ":slug/variants/:variantSlug/edit", Component: AdminProductVariantEditPage, loader: adminEditProductVariantLoader, action: adminUpdateProductVariantAction, handle: admin("Edit Product Variant") },
          { path: ":slug/variants/:variantSlug", Component: AdminProductVariantDetailPage, loader: adminProductVariantDetailLoader, handle: admin("Product Variant Details") },
        ],
      },
      {
        path: "brands",
        Component: AdminBrandsPage,
        loader: adminBrandsLoader,
        handle: admin("Brands"),
        children: [
          { path: "create", Component: AdminBrandCreateDialog, action: adminCreateBrandAction, handle: admin("Create Brand") },
          { path: ":slug/edit", Component: AdminBrandEditDialog, loader: adminEditBrandLoader, action: adminUpdateBrandAction, handle: admin("Edit Brand") },
          { path: ":slug/delete", Component: AdminBrandDeleteDialog, loader: adminDeleteBrandLoader, action: adminDeleteBrandAction, handle: admin("Delete Brand") },
        ],
      },
      {
        path: "categories",
        Component: AdminCategoriesPage,
        loader: adminCategoriesLoader,
        handle: admin("Categories"),
        children: [
          { path: "create", Component: AdminCategoryCreateDialog, action: adminCreateCategoryAction, handle: admin("Create Category") },
          { path: ":slug/edit", Component: AdminCategoryEditDialog, loader: adminEditCategoryLoader, action: adminUpdateCategoryAction, handle: admin("Edit Category") },
          { path: ":slug/delete", Component: AdminCategoryDeleteDialog, loader: adminDeleteCategoryLoader, action: adminDeleteCategoryAction, handle: admin("Delete Category") },
        ],
      },
      {
        path: "users",
        Component: AdminUsersPage,
        loader: adminUsersLoader,
        handle: admin("Users"),
        children: [
          { path: "create", Component: AdminUserCreateDialog, action: adminCreateUserAction, handle: admin("Create User") },
          { path: ":username/edit", Component: AdminUserEditDialog, loader: adminEditUserLoader, action: adminUpdateUserAction, handle: admin("Edit User") },
          { path: ":username/delete", Component: AdminUserDeleteDialog, loader: adminDeleteUserLoader, action: adminDeleteUserAction, handle: admin("Delete User") },
        ],
      },
      {
        path: "orders",
        handle: admin("Orders"),
        children: [
          { index: true, Component: AdminOrdersPage, loader: adminOrdersLoader, handle: admin("Orders") },
          { path: ":code", Component: AdminOrderDetailPage, loader: adminOrderDetailLoader, handle: admin("Order Details") },
          { path: ":code/edit", Component: AdminOrderUpdatePage, loader: adminUpdateOrderLoader, action: adminUpdateOrderAction, handle: admin("Edit Order") },
          { path: "create", Component: AdminOrderCreatePage, action: adminCreateOrderAction, handle: admin("Create Order") },
        ],
      },
      {
        path: "reviews",
        handle: admin("Reviews"),
        children: [
          { index: true, Component: AdminReviewsPage, loader: adminReviewsLoader, handle: admin("Reviews") },
          { path: ":id", Component: AdminReviewDetailPage, loader: adminReviewDetailLoader, handle: admin("Review Details") },
        ],
      },
      {
        path: "refunds",
        handle: admin("Refunds"),
        children: [
          { index: true, Component: AdminRefundsPage, loader: adminRefundsLoader, handle: admin("Refunds") },
          { path: "create", Component: AdminRefundCreatePage, action: adminRefundCreateAction, handle: admin("Create Refund") },
          { path: ":id", Component: AdminRefundDetailPage, loader: adminRefundDetailLoader, handle: admin("Refund Details") },
          { path: ":id/edit", Component: AdminRefundUpdatePage, action: adminUpdateRefundAction, loader: adminEditRefundLoader, handle: admin("Edit Refund") },
        ],
      },
      {
        path: "payments",
        handle: admin("Payments"),
        children: [
          { index: true, Component: AdminPaymentsPage, loader: adminPaymentsLoader, handle: admin("Payments") },
          { path: "create", Component: AdminPaymentCreatePage, action: adminPaymentCreateAction, handle: admin("Create Payment") },
          { path: ":id", Component: AdminPaymentDetailPage, loader: adminPaymentDetailLoader, handle: admin("Payment Details") },
          { path: ":id/edit", Component: AdminPaymentUpdatePage, action: adminUpdatePaymentAction, loader: adminEditPaymentLoader, handle: admin("Edit Payment") },
        ],
      },
      {
        path: "transactions",
        handle: admin("Transactions"),
        children: [
          { index: true, Component: AdminTransactionsPage, loader: adminTransactionsLoader, handle: admin("Transactions") },
          { path: ":id", Component: AdminTransactionDetailPage, loader: adminTransactionDetailLoader, handle: admin("Transaction Details") },
          { path: ":id/edit", Component: AdminTransactionEditPage, loader: adminEditTransactionLoader, action: adminUpdateTransactionAction, handle: admin("Edit Transaction") },
          { path: "create", Component: AdminTransactionCreatePage, action: adminTransactionCreateAction, handle: admin("Create Transaction") },
        ],
      },
      {
        path: "inventories",
        handle: admin("Inventories"),
        children: [
          { index: true, Component: AdminInventoriesPage, loader: adminInventoriesLoader, handle: admin("Inventories") },
          { path: "create", Component: AdminInventoryCreatePage, action: adminInventoryCreateAction, handle: admin("Create Inventory") },
        ],
      },
      { path: "settings", Component: AdminSettingsPage, loader: adminSettingsLoader, handle: admin("Admin Settings") },
    ],
  },
];
