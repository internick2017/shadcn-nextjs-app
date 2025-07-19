import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MessageCircle,
  CheckCircle,
  Clock,
  Target,
  TrendingUp
} from "lucide-react"
import { UserRecentActivity as UserRecentActivityType } from "@/types/user"

interface UserRecentActivityProps {
  recentActivity?: UserRecentActivityType[]
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "commit": return <CheckCircle className="h-4 w-4 text-green-500" />
    case "review": return <MessageCircle className="h-4 w-4 text-blue-500" />
    case "issue": return <Target className="h-4 w-4 text-orange-500" />
    case "comment": return <MessageCircle className="h-4 w-4 text-purple-500" />
    case "deploy": return <TrendingUp className="h-4 w-4 text-green-600" />
    case "merge": return <CheckCircle className="h-4 w-4 text-indigo-500" />
    default: return <Clock className="h-4 w-4 text-gray-500" />
  }
}

export function UserRecentActivity({ recentActivity }: UserRecentActivityProps) {
  // Provide fallback if recentActivity is undefined or empty
  const activities = recentActivity || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest contributions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4 pr-4">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.repo}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent activity available</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 