import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp } from "lucide-react"
import { UserPerformanceData } from "@/types/user"

interface UserPerformanceChartProps {
  performanceData?: UserPerformanceData[]
}

const performanceChartConfig = {
  commits: {
    label: "Commits",
    color: "rgb(239, 68, 68)",
  },
  reviews: {
    label: "Reviews", 
    color: "rgb(59, 130, 246)",
  },
  issues: {
    label: "Issues Closed",
    color: "rgb(34, 197, 94)",
  },
} satisfies ChartConfig

export function UserPerformanceChart({ performanceData }: UserPerformanceChartProps) {
  // Provide fallback if performanceData is undefined or empty
  const data = performanceData || []

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
        {data.length > 0 ? (
          <ChartContainer config={performanceChartConfig} className="h-full w-full">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
                strokeWidth={3}
                dot={{ fill: "var(--color-commits)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "var(--color-commits)" }}
                connectNulls={false}
              />
              <Line 
                dataKey="reviews" 
                stroke="var(--color-reviews)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-reviews)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "var(--color-reviews)" }}
                connectNulls={false}
              />
              <Line 
                dataKey="issues" 
                stroke="var(--color-issues)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-issues)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "var(--color-issues)" }}
                connectNulls={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No performance data available</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 