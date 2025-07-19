"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Building,
  Star,
  Users,
  MessageCircle,
  Search,
  CheckCircle,
  Filter
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock users data - in a real app, this would come from an API
const allUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarah_dev",
    email: "sarah.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    bio: "Full-stack developer passionate about creating beautiful and functional user experiences.",
    location: "San Francisco, CA",
    company: "TechCorp Inc.",
    role: "Senior Frontend Developer",
    joinDate: "2022-03-15",
    status: "active",
    verified: true,
    followers: 2847,
    following: 892,
    posts: 156,
    skills: ["React", "TypeScript", "Next.js", "Node.js"]
  },
  {
    id: "2",
    name: "Alex Chen",
    username: "alex_backend",
    email: "alex.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Backend engineer specializing in distributed systems and cloud architecture.",
    location: "Seattle, WA",
    company: "CloudScale Systems",
    role: "Staff Backend Engineer",
    joinDate: "2021-08-20",
    status: "active",
    verified: true,
    followers: 1542,
    following: 634,
    posts: 89,
    skills: ["Go", "Docker", "Kubernetes", "PostgreSQL"]
  },
  {
    id: "3",
    name: "Maya Patel",
    username: "maya_design",
    email: "maya.patel@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "UX/UI Designer with a passion for creating intuitive and accessible user experiences.",
    location: "Austin, TX",
    company: "Design Studio Pro",
    role: "Lead UX Designer",
    joinDate: "2023-01-10",
    status: "active",
    verified: false,
    followers: 987,
    following: 456,
    posts: 67,
    skills: ["Figma", "Sketch", "Prototyping", "User Research"]
  },
  {
    id: "4",
    name: "James Wilson",
    username: "james_devops",
    email: "james.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "DevOps engineer focused on automation, infrastructure as code, and CI/CD pipelines.",
    location: "New York, NY",
    company: "InfraTech Solutions",
    role: "Senior DevOps Engineer",
    joinDate: "2022-06-15",
    status: "active",
    verified: true,
    followers: 1234,
    following: 789,
    posts: 134,
    skills: ["AWS", "Terraform", "Jenkins", "Docker"]
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    username: "emma_mobile",
    email: "emma.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "Mobile app developer creating cross-platform solutions with React Native and Flutter.",
    location: "Los Angeles, CA",
    company: "MobileFirst Inc.",
    role: "Mobile Developer",
    joinDate: "2023-04-12",
    status: "away",
    verified: false,
    followers: 567,
    following: 234,
    posts: 45,
    skills: ["React Native", "Flutter", "Swift", "Kotlin"]
  },
  {
    id: "6",
    name: "David Kim",
    username: "david_data",
    email: "david.kim@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Data scientist and machine learning engineer working on AI solutions and analytics.",
    location: "Boston, MA",
    company: "DataInsight Corp",
    role: "Senior Data Scientist",
    joinDate: "2021-11-03",
    status: "active",
    verified: true,
    followers: 1876,
    following: 543,
    posts: 98,
    skills: ["Python", "TensorFlow", "SQL", "R"]
  }
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "away": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "offline": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        <p className="text-muted-foreground mt-2">Discover and connect with your team members</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, username, role, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("active")}
          >
            Active
          </Button>
          <Button
            variant={filterStatus === "away" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("away")}
          >
            Away
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {allUsers.filter(u => u.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {allUsers.filter(u => u.verified).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Found Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg leading-tight truncate">{user.name}</CardTitle>
                      {user.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                      )}
                    </div>
                    <CardDescription className="truncate">@{user.username}</CardDescription>
                    <Badge className={`${getStatusColor(user.status)} text-xs mt-2`}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-3 w-3" />
                    <span className="truncate">{user.role} at {user.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {user.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {user.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <span>{user.followers} followers</span>
                    <span>{user.posts} posts</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1" size="sm">
                    <Link href={`/user/${user.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 