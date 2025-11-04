"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { use } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { OrderChartType } from "@repo/types"; // same type as in AppBarChart

const chartConfig = {
  totalUsers: {
    label: "Total People",
    color: "var(--chart-1)",
  },
  successful: {
    label: "Successful Transactions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const AppAreaChart = ({
  dataPromise,
}: {
  dataPromise: Promise<OrderChartType[]>;
}) => {
  const chartData = use(dataPromise);

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Monthly Transactions</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <defs>
            <linearGradient id="fillTotalUsers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-totalUsers)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-totalUsers)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillSuccessful" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-successful)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-successful)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          <Area
            dataKey="totalUsers"
            type="natural"
            fill="url(#fillTotalUsers)"
            fillOpacity={0.4}
            stroke="var(--color-totalUsers)"
            stackId="a"
          />
          <Area
            dataKey="successful"
            type="natural"
            fill="url(#fillSuccessful)"
            fillOpacity={0.4}
            stroke="var(--color-successful)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
