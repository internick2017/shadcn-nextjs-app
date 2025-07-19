"use client"

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
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
import { pieChartData } from "@/data/charts"

const chartConfig = {
  web: {
    label: "Web",
    color: "rgb(239, 68, 68)",
  },
  mobile: {
    label: "Mobile",
    color: "rgb(59, 130, 246)",
  },
  desktop: {
    label: "Desktop",
    color: "rgb(34, 197, 94)",
  },
  other: {
    label: "Other",
    color: "rgb(251, 191, 36)",
  },
} satisfies ChartConfig

export function AppPieChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Platform Usage</CardTitle>
        <CardDescription className="text-sm">Distribution of User Access</CardDescription>
      </CardHeader>
      <CardContent className="h-[140px] md:h-[160px] p-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="75%"
                dataKey="value"
                fill="#8884d8"
              >
                {pieChartData.map((entry, index) => {
                  const name = entry.name.toLowerCase()
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={`var(--color-${name})`}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  )
                })}
              </Pie>
              <ChartTooltip 
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value) => `${value} users`}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 