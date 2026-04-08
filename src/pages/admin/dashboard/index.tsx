import { AdminHeaderActions } from "@/components/admin/shared/admin-header-section";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { RevenueExpenseChart } from "@/components/admin/dashboard/RevenueExpenseChart";
import { MonthlyProfitChart } from "@/components/admin/dashboard/MonthlyProfitChart";
import { GenderSalesChart } from "@/components/admin/dashboard/GenderSalesChart";
import { TopSellersTable } from "@/components/admin/dashboard/TopSellersTable";
import { LowStockAlerts } from "@/components/admin/dashboard/LowStockAlerts";
import { useGetDashboardData } from "@/services/dashboard/queries/useGetDashboardData";
import { useAuthStore } from "@/stores/auth.store";
import { useSearchParams } from "react-router";

const AdminDashboardPage = () => {
  const { authUser } = useAuthStore();
  const [searchParams] = useSearchParams();
  
  const filter = searchParams.get("filter") || undefined;

  const { data } = useGetDashboardData({ filter });

  const { financialStats, genderSales, topSellers, lowStockItems, chartData } = data;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-[60px] flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome Back, <span className="text-primary">{authUser?.firstName || "Admin"}</span>
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your store.
          </p>
        </div>

        <AdminHeaderActions className="hidden items-center gap-x-3 md:flex" />
      </div>

      <div className="space-y-5">
        {/* Stats Section */}
        <DashboardStats stats={financialStats} hasFilter={Boolean(filter)} />

        {/* Charts Middle Row (Revenue vs Expenses & Monthly Profit) */}
        <div className="grid gap-5 xl:grid-cols-3">
          <RevenueExpenseChart data={chartData} className="xl:col-span-2" />
          <MonthlyProfitChart data={chartData} className="xl:flex flex-col hidden" />
        </div>

        {/* Charts Bottom Row (Monthly Profit mobile & Gender Sales mobile) */}
        <div className="xl:hidden grid gap-5 md:grid-cols-2">
          <MonthlyProfitChart data={chartData} className="flex flex-col" />
          <GenderSalesChart data={genderSales} className="flex flex-col" />
        </div>

        {/* Desktop Tables & Pie Row */}
        <div className="hidden md:grid gap-5 xl:grid-cols-3">
          <GenderSalesChart data={genderSales} className="xl:flex flex-col hidden" />
          <TopSellersTable data={topSellers} className="xl:col-span-2" />
        </div>

        {/* Mobile Top Sellers */}
        <TopSellersTable data={topSellers} className="md:hidden" />

        {/* Low Stock Alerts (Always visible full width) */}
        <LowStockAlerts data={lowStockItems} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;