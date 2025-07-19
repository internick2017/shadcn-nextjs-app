import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"
import { UserAchievement } from "@/types/user"

interface UserAchievementsProps {
  achievements: UserAchievement[]
}

export function UserAchievements({ achievements }: UserAchievementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-medium">{achievement.title}</div>
                <div className="text-sm text-muted-foreground">{achievement.description}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(achievement.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 