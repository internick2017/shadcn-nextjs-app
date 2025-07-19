import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { UserStats as UserStatsType } from "@/types/user"

interface UserStatsProps {
  stats?: UserStatsType
}

export function UserStats({ stats }: UserStatsProps) {
  // Provide default values if stats is undefined
  const defaultStats: UserStatsType = {
    projectsCompleted: 0,
    codeReviews: 0,
    linesOfCode: 0,
    bugsFixed: 0
  }

  const displayStats = stats || defaultStats

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{displayStats.projectsCompleted}</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{displayStats.codeReviews}</div>
            <div className="text-sm text-muted-foreground">Code Reviews</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{displayStats.linesOfCode.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Lines of Code</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{displayStats.bugsFixed}</div>
            <div className="text-sm text-muted-foreground">Bugs Fixed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 