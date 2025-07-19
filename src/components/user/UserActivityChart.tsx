import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Clock } from "lucide-react"
import { UserActivityTrend } from "@/types/user"

interface UserActivityChartProps {
  activityTrend: UserActivityTrend[]
}

const activityChartConfig = {
  activity: {
    label: "Activity Score",
    color: "rgb(251, 191, 36)",
  },
} satisfies ChartConfig

export function UserActivityChart({ activityTrend }: UserActivityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Activity Trend
        </CardTitle>
        <CardDescription>Weekly activity score (last 6 weeks)</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px] p-4">
        <ChartContainer config={activityChartConfig} className="h-full w-full">
          <LineChart data={activityTrend} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="week" 
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
              domain={[60, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              dataKey="activity" 
              stroke="var(--color-activity)" 
              strokeWidth={4}
              dot={{ fill: "var(--color-activity)", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "var(--color-activity)" }}
              type="monotone"
              connectNulls={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 