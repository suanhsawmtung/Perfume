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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Label,
  Pie,
  PieChart,
} from "recharts";
import { type GenderSale } from "@/types/dashboard.type";

const chartConfig = {
  sales: {
    label: "Sales",
  },
  men: {
    label: "Men",
    color: "var(--color-chart-1)",
  },
  women: {
    label: "Women",
    color: "var(--color-chart-2)",
  },
  unisex: {
    label: "Unisex",
    color: "var(--color-chart-5)",
  },
} satisfies ChartConfig;

interface GenderSalesChartProps {
  data: GenderSale[];
  className?: string; // For dynamic reusable positioning
}

export const GenderSalesChart = ({ data, className }: GenderSalesChartProps) => {
  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);

  const processedData = data.map((item) => ({
    ...item,
    fill: `var(--color-${item.gender})`,
  }));

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales by Gender</CardTitle>
        <CardDescription>Distribution of sales</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={processedData}
              dataKey="sales"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Sales
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent className="mt-4" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
