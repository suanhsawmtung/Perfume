export interface DashboardFilter {
  filter?: string;
}

export interface FinancialStats {
  revenue: number;
  expense: number;
  profit: number;
  revenueChange: number;
  expenseChange: number;
  profitChange: number;
}

export interface GenderSale {
  gender: "men" | "women" | "unisex";
  sales: number;
}

export interface TopSeller {
  id: string;
  name: string;
  brand: string;
  variant: string;
  sales: number;
  revenue: number;
}

export interface LowStockItem {
  id: string;
  name: string;
  variant: string;
  stock: number;
  threshold: number;
}

export interface ChartData {
  month: string;
  revenue: number;
  expense: number;
  profit: number;
}

export interface DashboardData {
  financialStats: FinancialStats;
  genderSales: GenderSale[];
  topSellers: TopSeller[];
  lowStockItems: LowStockItem[];
  chartData: ChartData[];
}
