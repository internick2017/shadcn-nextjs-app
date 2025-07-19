import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  ExternalLink,
  Building
} from "lucide-react"
import { User } from "@/types/user"

interface UserContactInfoProps {
  user: User
}

export function UserContactInfo({ user }: UserContactInfoProps) {
  return (
    <>
      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8 ml-6 md:ml-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>{user.company}</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-3 mb-8 ml-6 md:ml-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub: {user.github}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>LinkedIn: {user.linkedin}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Twitter: {user.twitter}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

// Separate component for the detailed contact card
export function UserContactCard({ user }: UserContactInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Email</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Phone</div>
              <div className="text-xs text-muted-foreground">{user.phone}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Location</div>
              <div className="text-xs text-muted-foreground">{user.location}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Building className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Company</div>
              <div className="text-xs text-muted-foreground">{user.company}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 