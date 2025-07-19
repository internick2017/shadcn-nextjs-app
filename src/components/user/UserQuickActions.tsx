import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MessageCircle,
  Users,
  Star,
  ExternalLink
} from "lucide-react"

export function UserQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button className="w-full" variant="default">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button className="w-full" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Add to Team
          </Button>
          <Button className="w-full" variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Follow
          </Button>
          <Button className="w-full" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 