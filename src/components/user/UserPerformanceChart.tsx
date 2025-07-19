import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp } from "lucide-react"
import { UserPerformanceData } from "@/types/user"

interface UserPerformanceChartProps {
  performanceData: UserPerformanceData[]
}

const performanceChartConfig = {
  commits: {
    label: "Commits",
    color: "hsl(var(--chart-1))",
  },
  reviews: {
    label: "Reviews",
    color: "hsl(var(--chart-2))",
  },
  issues: {
    label: "Issues Closed",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function UserPerformanceChart({ performanceData }: UserPerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance Overview
        </CardTitle>
        <CardDescription>Monthly commits, reviews, and issues closed</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] p-4">
        <ChartContainer config={performanceChartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
              <Line 
                dataKey="commits" 
                stroke="var(--color-commits)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-commits)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                dataKey="reviews" 
                stroke="var(--color-reviews)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-reviews)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                dataKey="issues" 
                stroke="var(--color-issues)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-issues)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 