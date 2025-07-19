"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, SelectColumn, ActionsColumn, SortableHeader } from "@/components/ui/data-table"
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
  Filter,
  Plus,
  UserPlus
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { UserSummary } from "@/types/user"
import { userSummaries } from "@/data/users"

// Re-export User type for backward compatibility
export type User = UserSummary

// Mock users data - using centralized data
const allUsers: User[] = [
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
    company: "CloudTech Solutions",
    role: "Senior Backend Engineer",
    joinDate: "2021-08-22",
    status: "active",
    verified: true,
    followers: 1923,
    following: 654,
    posts: 89,
    skills: ["Python", "Docker", "Kubernetes", "AWS"]
  },
  {
    id: "3",
    name: "Maria Garcia",
    username: "maria_design",
    email: "maria.garcia@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Product designer with a passion for creating intuitive and accessible user interfaces.",
    location: "Austin, TX",
    company: "DesignStudio Pro",
    role: "Lead Product Designer",
    joinDate: "2023-01-10",
    status: "active",
    verified: false,
    followers: 3421,
    following: 1205,
    posts: 234,
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"]
  },
  {
    id: "4",
    name: "David Kim",
    username: "david_devops",
    email: "david.kim@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "DevOps engineer focused on automation, monitoring, and scalable infrastructure.",
    location: "Portland, OR",
    company: "InfraTech Corp",
    role: "DevOps Engineer",
    joinDate: "2022-06-18",
    status: "inactive",
    verified: true,
    followers: 1456,
    following: 432,
    posts: 67,
    skills: ["Jenkins", "Terraform", "Monitoring", "CI/CD"]
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    username: "emily_qa",
    email: "emily.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    bio: "Quality assurance engineer ensuring software reliability and user satisfaction.",
    location: "Denver, CO",
    company: "QualityFirst Inc",
    role: "Senior QA Engineer",
    joinDate: "2021-11-05",
    status: "pending",
    verified: false,
    followers: 892,
    following: 298,
    posts: 45,
    skills: ["Test Automation", "Selenium", "Jest", "Quality Assurance"]
  },
  {
    id: "6",
    name: "James Wilson",
    username: "james_mobile",
    email: "james.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    bio: "Mobile app developer creating cross-platform solutions with React Native and Flutter.",
    location: "Miami, FL",
    company: "MobileInnovate",
    role: "Mobile Developer",
    joinDate: "2023-04-12",
    status: "active",
    verified: true,
    followers: 2156,
    following: 743,
    posts: 123,
    skills: ["React Native", "Flutter", "iOS", "Android"]
  },
  {
    id: "7",
    name: "Lisa Zhang",
    username: "lisa_data",
    email: "lisa.zhang@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    bio: "Data scientist passionate about machine learning and data-driven insights.",
    location: "Boston, MA",
    company: "DataInsights Ltd",
    role: "Senior Data Scientist",
    joinDate: "2020-09-30",
    status: "active",
    verified: true,
    followers: 4521,
    following: 1876,
    posts: 298,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"]
  },
  {
    id: "8",
    name: "Robert Taylor",
    username: "robert_security",
    email: "robert.taylor@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Cybersecurity specialist protecting digital assets and ensuring system security.",
    location: "Washington, DC",
    company: "SecureNet Solutions",
    role: "Security Engineer",
    joinDate: "2022-01-20",
    status: "active",
    verified: true,
    followers: 1678,
    following: 521,
    posts: 87,
    skills: ["Cybersecurity", "Penetration Testing", "Network Security", "Incident Response"]
  },
  {
    id: "9",
    name: "Jennifer Davis",
    username: "jen_fullstack",
    email: "jennifer.davis@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "Full-stack developer with expertise in modern web technologies and cloud platforms.",
    location: "Chicago, IL",
    company: "WebSolutions Inc",
    role: "Full Stack Developer",
    joinDate: "2023-02-14",
    status: "active",
    verified: false,
    followers: 1234,
    following: 567,
    posts: 89,
    skills: ["React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: "10",
    name: "Michael Brown",
    username: "mike_ui",
    email: "michael.brown@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    bio: "UI/UX designer focused on creating delightful and intuitive user experiences.",
    location: "Los Angeles, CA",
    company: "CreativeStudio",
    role: "UI/UX Designer",
    joinDate: "2022-09-10",
    status: "active",
    verified: true,
    followers: 2890,
    following: 1123,
    posts: 145,
    skills: ["Sketch", "Figma", "Adobe XD", "Prototyping"]
  },
  {
    id: "11",
    name: "Amanda Wilson",
    username: "amanda_pm",
    email: "amanda.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Product manager passionate about building products that users love and businesses need.",
    location: "New York, NY",
    company: "ProductCorp",
    role: "Senior Product Manager",
    joinDate: "2021-04-18",
    status: "inactive",
    verified: true,
    followers: 3456,
    following: 987,
    posts: 201,
    skills: ["Product Strategy", "Agile", "Analytics", "User Research"]
  },
  {
    id: "12",
    name: "Christopher Lee",
    username: "chris_cloud",
    email: "christopher.lee@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Cloud architect specializing in scalable infrastructure and microservices architecture.",
    location: "San Jose, CA",
    company: "CloudTech Solutions",
    role: "Cloud Architect",
    joinDate: "2020-11-25",
    status: "active",
    verified: true,
    followers: 4321,
    following: 1654,
    posts: 267,
    skills: ["AWS", "Azure", "Docker", "Microservices"]
  },
  {
    id: "13",
    name: "Nicole Martinez",
    username: "nicole_analytics",
    email: "nicole.martinez@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    bio: "Data analyst turning complex data into actionable insights for business growth.",
    location: "Phoenix, AZ",
    company: "DataInsights Pro",
    role: "Senior Data Analyst",
    joinDate: "2022-07-03",
    status: "pending",
    verified: false,
    followers: 1567,
    following: 432,
    posts: 78,
    skills: ["Python", "R", "Tableau", "SQL"]
  },
  {
    id: "14",
    name: "Kevin Thompson",
    username: "kevin_blockchain",
    email: "kevin.thompson@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Blockchain developer building the future of decentralized applications.",
    location: "Las Vegas, NV",
    company: "BlockchainInnovate",
    role: "Blockchain Developer",
    joinDate: "2023-03-12",
    status: "active",
    verified: true,
    followers: 2234,
    following: 789,
    posts: 134,
    skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"]
  },
  {
    id: "15",
    name: "Rachel Green",
    username: "rachel_marketing",
    email: "rachel.green@example.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    bio: "Digital marketing specialist driving growth through data-driven campaigns.",
    location: "Nashville, TN",
    company: "MarketingGenius",
    role: "Digital Marketing Manager",
    joinDate: "2021-12-08",
    status: "active",
    verified: false,
    followers: 3789,
    following: 1456,
    posts: 289,
    skills: ["SEO", "PPC", "Content Marketing", "Social Media"]
  }
]

// Define columns for the users table
const columns: ColumnDef<User>[] = [
  SelectColumn,
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>User</SortableHeader>
    ),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <Link href={`/user/${user.id}`}>
                <span className="font-medium hover:underline">{user.name}</span>
              </Link>
              {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
            </div>
            <div className="text-sm text-muted-foreground">@{user.username}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <SortableHeader column={column}>Role</SortableHeader>
    ),
    cell: ({ row }) => {
      const user = row.original
      return (
        <div>
          <div className="font-medium">{user.role}</div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Building className="h-3 w-3 mr-1" />
            {user.company}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("location")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          variant={
            status === "active" ? "default" : 
            status === "inactive" ? "secondary" : "outline"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "followers",
    header: ({ column }) => (
      <SortableHeader column={column}>Followers</SortableHeader>
    ),
    cell: ({ row }) => {
      const followers = row.getValue("followers") as number
      return (
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{followers.toLocaleString()}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "joinDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Join Date</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"))
      return (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{date.toLocaleDateString()}</span>
        </div>
      )
    },
  },
  ActionsColumn([
    {
      label: "View Profile",
      onClick: (user: User) => {
        window.location.href = `/user/${user.id}`
      },
    },
    {
      label: "Send Message",
      onClick: (user: User) => {
        console.log("Send message to", user.name)
      },
    },
    {
      label: "Edit User",
      onClick: (user: User) => {
        console.log("Edit user", user.name)
      },
    },
    {
      label: "Delete User",
      onClick: (user: User) => {
        console.log("Delete user", user.name)
      },
    },
  ]),
]

export default function UsersPage() {
  const [users] = useState<User[]>(allUsers)

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage and view all users in your organization
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((users.filter(u => u.status === "active").length / users.length) * 100)}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.verified).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((users.filter(u => u.verified).length / users.length) * 100)}% verified
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Followers</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(users.reduce((acc, u) => acc + u.followers, 0) / users.length).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Per user average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              A list of all users with their details and management options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={users} 
              searchKey="name"
              searchPlaceholder="Search users..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 