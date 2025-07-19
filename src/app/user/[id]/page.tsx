"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter,
  Building,
  Star,
  Users,
  MessageCircle,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Award,
  Target,
  TrendingUp
} from "lucide-react"
import { TodoList } from "@/components/TodoList"

interface UserProfileProps {
  params: { id: string }
}

// Mock user data - in a real app, this would come from an API
const getUserData = (id: string) => {
  const users = {
    "1": {
      id: "1",
      name: "Sarah Johnson",
      username: "sarah_dev",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=200&fit=crop",
      bio: "Full-stack developer passionate about creating beautiful and functional user experiences. Love working with React, TypeScript, and modern web technologies.",
      location: "San Francisco, CA",
      company: "TechCorp Inc.",
      role: "Senior Frontend Developer",
      joinDate: "2022-03-15",
      website: "https://sarahjohnson.dev",
      github: "sarah_dev",
      linkedin: "sarah-johnson-dev",
      twitter: "sarah_codes",
      status: "active",
      verified: true,
      followers: 2847,
      following: 892,
      posts: 156,
      skills: [
        { name: "React", level: "Expert", color: "blue" },
        { name: "TypeScript", level: "Expert", color: "blue" },
        { name: "Next.js", level: "Advanced", color: "green" },
        { name: "Node.js", level: "Advanced", color: "green" },
        { name: "Python", level: "Intermediate", color: "yellow" },
        { name: "GraphQL", level: "Intermediate", color: "yellow" },
        { name: "AWS", level: "Beginner", color: "red" }
      ],
      achievements: [
        { title: "Top Contributor", description: "Most active contributor this quarter", icon: "🏆", date: "2024-01-15" },
        { title: "Code Quality Champion", description: "Maintained 98% code review approval rate", icon: "✨", date: "2024-01-01" },
        { title: "Innovation Award", description: "Led the implementation of new design system", icon: "💡", date: "2023-12-10" }
      ],
      recentActivity: [
        { type: "commit", message: "Updated user authentication flow", time: "2 hours ago", repo: "web-app" },
        { type: "review", message: "Reviewed PR #234: Add dark mode support", time: "4 hours ago", repo: "ui-components" },
        { type: "issue", message: "Created issue: Improve loading states", time: "1 day ago", repo: "dashboard" },
        { type: "comment", message: "Commented on issue #567", time: "2 days ago", repo: "api" }
      ],
      stats: {
        projectsCompleted: 23,
        codeReviews: 145,
        linesOfCode: 15420,
        bugsFixed: 67
      }
    },
    "2": {
      id: "2",
      name: "Alex Chen",
      username: "alex_backend",
      email: "alex.chen@example.com",
      phone: "+1 (555) 987-6543",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=200&fit=crop",
      bio: "Backend engineer specializing in distributed systems and cloud architecture. Experience with microservices, containers, and scalable infrastructure.",
      location: "Seattle, WA",
      company: "CloudScale Systems",
      role: "Staff Backend Engineer",
      joinDate: "2021-08-20",
      website: "https://alexchen.tech",
      github: "alex_backend",
      linkedin: "alex-chen-engineer",
      twitter: "alex_builds",
      status: "active",
      verified: true,
      followers: 1542,
      following: 634,
      posts: 89,
      skills: [
        { name: "Go", level: "Expert", color: "blue" },
        { name: "Docker", level: "Expert", color: "blue" },
        { name: "Kubernetes", level: "Advanced", color: "green" },
        { name: "PostgreSQL", level: "Advanced", color: "green" },
        { name: "Redis", level: "Advanced", color: "green" },
        { name: "gRPC", level: "Intermediate", color: "yellow" },
        { name: "Terraform", level: "Intermediate", color: "yellow" }
      ],
      achievements: [
        { title: "System Architect", description: "Designed and implemented microservices architecture", icon: "🏗️", date: "2024-01-20" },
        { title: "Performance Hero", description: "Reduced API response time by 70%", icon: "⚡", date: "2023-12-15" },
        { title: "Reliability Expert", description: "Achieved 99.9% uptime for critical services", icon: "🛡️", date: "2023-11-30" }
      ],
      recentActivity: [
        { type: "deploy", message: "Deployed v2.1.0 to production", time: "1 hour ago", repo: "api-gateway" },
        { type: "commit", message: "Optimized database queries", time: "3 hours ago", repo: "user-service" },
        { type: "merge", message: "Merged feature: Rate limiting", time: "6 hours ago", repo: "auth-service" },
        { type: "issue", message: "Fixed critical bug in payment processing", time: "1 day ago", repo: "payment-service" }
      ],
      stats: {
        projectsCompleted: 31,
        codeReviews: 203,
        linesOfCode: 28760,
        bugsFixed: 124
      }
    }
  }
  
  return users[id as keyof typeof users] || users["1"]
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

export default function UserProfilePage({ params }: UserProfileProps) {
  const user = getUserData(params.id)
  
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      {/* Cover Image & Avatar Section */}
      <div className="relative mb-8">
        <div 
          className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${user.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="absolute -bottom-16 left-6 md:left-8">
          <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="absolute top-4 right-4 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send Message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More Options</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* User Info Section */}
      <div className="ml-6 md:ml-8 pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              {user.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent>Verified User</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-1">@{user.username}</p>
            <p className="text-lg font-medium text-muted-foreground mb-4">{user.role} at {user.company}</p>
            <p className="text-muted-foreground max-w-2xl">{user.bio}</p>
          </div>
          
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{user.followers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.following.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
          </div>
        </div>
      </div>

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
                <Github className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub: {user.github}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>LinkedIn: {user.linkedin}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Twitter: {user.twitter}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Skills, Stats, Achievements */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <Badge className={getSkillLevelColor(skill.level)}>
                      {skill.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{user.stats.projectsCompleted}</div>
                  <div className="text-xs text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user.stats.codeReviews}</div>
                  <div className="text-xs text-muted-foreground">Code Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user.stats.linesOfCode.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Lines of Code</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{user.stats.bugsFixed}</div>
                  <div className="text-xs text-muted-foreground">Bugs Fixed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
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
        </div>

        {/* Middle Column - Activity & Todo */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest contributions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4 pr-4">
                  {user.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
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
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Todo List */}
          <TodoList />
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">{user.phone}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{user.location}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Company</div>
                  <div className="text-sm text-muted-foreground">{user.company}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Add to Team
              </Button>
              <Button className="w-full" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Follow User
              </Button>
              <Button className="w-full" variant="outline">
                <Github className="h-4 w-4 mr-2" />
                View GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 