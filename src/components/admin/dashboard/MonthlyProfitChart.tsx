import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import { type ChartData } from "@/types/dashboard.type";

const chartConfig = {
  profit: {
    label: "Net Profit",
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig;

interface MonthlyProfitChartProps {
  data: ChartData[];
  className?: string; // For dynamic reusable positioning
}

export const MonthlyProfitChart = ({ data, className }: MonthlyProfitChartProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Monthly Net Profit</CardTitle>
        <CardDescription>Profit overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="profit"
              fill="var(--color-chart-3)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
