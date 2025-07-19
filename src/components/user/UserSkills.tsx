import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { UserSkill } from "@/types/user"

interface UserSkillsProps {
  skills: UserSkill[]
}

const getSkillLevelColor = (level: string) => {
  switch (level) {
    case "Expert": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Advanced": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Beginner": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function UserSkills({ skills }: UserSkillsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Skills & Expertise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">{skill.name}</span>
              <Badge className={getSkillLevelColor(skill.level)}>
                {skill.level}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 