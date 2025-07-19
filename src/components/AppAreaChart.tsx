"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { areaChartData } from "@/data/charts"

const chartConfig = {
  sales: {
    label: "Sales",
    color: "rgb(239, 68, 68)",
  },
  revenue: {
    label: "Revenue",
    color: "rgb(59, 130, 246)",
  },
} satisfies ChartConfig

export function AppAreaChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Area Chart - Stacked</CardTitle>
        <CardDescription className="text-sm">Sales & Revenue - January to June 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-[140px] md:h-[160px] p-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaChartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                dataKey="sales" 
                stackId="1" 
                stroke="var(--color-sales)" 
                fill="var(--color-sales)" 
                type="monotone"
                fillOpacity={0.6}
              />
              <Area 
                dataKey="revenue" 
                stackId="1" 
                stroke="var(--color-revenue)" 
                fill="var(--color-revenue)" 
                type="monotone"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 