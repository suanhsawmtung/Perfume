import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { type FinancialStats } from "@/types/dashboard.type";
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface DashboardStatsProps {
  stats: FinancialStats;
  hasFilter?: boolean;
}

export const DashboardStats = ({ stats, hasFilter }: DashboardStatsProps) => {
  const comparisonLabel = hasFilter ? "vs this month" : "from last month";
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-emerald-500/10 border-emerald-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Total Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
            {formatPrice(stats.revenue)}
          </div>
          <div className={`flex items-center text-xs mt-1 ${stats.revenueChange >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {stats.revenueChange >= 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
            {Math.abs(stats.revenueChange)}% {comparisonLabel}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-500/10 border-amber-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400">Total Expenses</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
            {formatPrice(stats.expense)}
          </div>
          <div className={`flex items-center text-xs mt-1 ${stats.expenseChange <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
            {stats.expenseChange >= 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
            {Math.abs(stats.expenseChange)}% {comparisonLabel}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-indigo-500/10 border-indigo-500/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Net Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
            {formatPrice(stats.profit)}
          </div>
          <div className={`flex items-center text-xs mt-1 ${stats.profitChange >= 0 ? "text-indigo-600 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400"}`}>
            {stats.profitChange >= 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
            {Math.abs(stats.profitChange)}% {comparisonLabel}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
