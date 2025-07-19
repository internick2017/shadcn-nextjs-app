"use client"

import { use } from "react"
import { TodoList } from "@/components/TodoList"
import { 
  UserProfileHeader,
  UserContactInfo,
  UserContactCard,
  UserSkills,
  UserStats,
  UserTeamMembers,
  UserPerformanceChart,
  UserActivityChart,
  UserRecentActivity,
  UserAchievements,
  UserQuickActions
} from "@/components/user"
import { User, UserProfileProps } from "@/types/user"
import { getUserById } from "@/data/users"

// Mock user data - using centralized data
const getUserData = (id: string): User | null => {
  return getUserById(id) || {
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
      status: "active" as const,
      verified: true,
      followers: 2847,
      following: 892,
      posts: 156,
      performanceData: [
        { month: "Jan", commits: 45, reviews: 23, issues: 8 },
        { month: "Feb", commits: 52, reviews: 31, issues: 12 },
        { month: "Mar", commits: 38, reviews: 28, issues: 6 },
        { month: "Apr", commits: 67, reviews: 35, issues: 15 },
        { month: "May", commits: 59, reviews: 42, issues: 9 },
        { month: "Jun", commits: 73, reviews: 38, issues: 11 },
      ],
      activityTrend: [
        { week: "W1", activity: 85 },
        { week: "W2", activity: 92 },
        { week: "W3", activity: 78 },
        { week: "W4", activity: 95 },
        { week: "W5", activity: 88 },
        { week: "W6", activity: 94 },
      ],
      skills: [
        { name: "React", level: "Expert" as const, color: "blue" },
        { name: "TypeScript", level: "Expert" as const, color: "blue" },
        { name: "Next.js", level: "Advanced" as const, color: "green" },
        { name: "Node.js", level: "Advanced" as const, color: "green" },
        { name: "Python", level: "Intermediate" as const, color: "yellow" },
        { name: "GraphQL", level: "Intermediate" as const, color: "yellow" },
        { name: "AWS", level: "Beginner" as const, color: "red" }
      ],
      achievements: [
        { title: "Top Contributor", description: "Most active contributor this quarter", icon: "🏆", date: "2024-01-15" },
        { title: "Code Quality Champion", description: "Maintained 98% code review approval rate", icon: "✨", date: "2024-01-01" },
        { title: "Innovation Award", description: "Led the implementation of new design system", icon: "💡", date: "2023-12-10" }
      ],
      recentActivity: [
        { type: "commit" as const, message: "Updated user authentication flow", time: "2 hours ago", repo: "web-app" },
        { type: "review" as const, message: "Reviewed PR #234: Add dark mode support", time: "4 hours ago", repo: "ui-components" },
        { type: "issue" as const, message: "Created issue: Improve loading states", time: "1 day ago", repo: "dashboard" },
        { type: "comment" as const, message: "Commented on issue #567", time: "2 days ago", repo: "api" }
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
      status: "active" as const,
      verified: true,
      followers: 1542,
      following: 634,
      posts: 89,
      performanceData: [
        { month: "Jan", commits: 38, reviews: 18, issues: 5 },
        { month: "Feb", commits: 42, reviews: 25, issues: 8 },
        { month: "Mar", commits: 51, reviews: 32, issues: 12 },
        { month: "Apr", commits: 45, reviews: 29, issues: 7 },
        { month: "May", commits: 58, reviews: 35, issues: 10 },
        { month: "Jun", commits: 62, reviews: 41, issues: 9 },
      ],
      activityTrend: [
        { week: "W1", activity: 76 },
        { week: "W2", activity: 89 },
        { week: "W3", activity: 93 },
        { week: "W4", activity: 87 },
        { week: "W5", activity: 91 },
        { week: "W6", activity: 96 },
      ],
      skills: [
        { name: "Go", level: "Expert" as const, color: "blue" },
        { name: "Docker", level: "Expert" as const, color: "blue" },
        { name: "Kubernetes", level: "Advanced" as const, color: "green" },
        { name: "PostgreSQL", level: "Advanced" as const, color: "green" },
        { name: "Redis", level: "Advanced" as const, color: "green" },
        { name: "gRPC", level: "Intermediate" as const, color: "yellow" },
        { name: "Terraform", level: "Intermediate" as const, color: "yellow" }
      ],
      achievements: [
        { title: "System Architect", description: "Designed and implemented microservices architecture", icon: "🏗️", date: "2024-01-20" },
        { title: "Performance Hero", description: "Reduced API response time by 70%", icon: "⚡", date: "2023-12-15" },
        { title: "Reliability Expert", description: "Achieved 99.9% uptime for critical services", icon: "🛡️", date: "2023-11-30" }
      ],
      recentActivity: [
        { type: "deploy" as const, message: "Deployed v2.1.0 to production", time: "1 hour ago", repo: "api-gateway" },
        { type: "commit" as const, message: "Optimized database queries", time: "3 hours ago", repo: "user-service" },
        { type: "merge" as const, message: "Merged feature: Rate limiting", time: "6 hours ago", repo: "auth-service" },
        { type: "issue" as const, message: "Fixed critical bug in payment processing", time: "1 day ago", repo: "payment-service" }
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

export default function UserProfilePage({ params }: UserProfileProps) {
  const { id } = use(params)
  const user = getUserData(id)

  const handleSaveProfile = (updatedUser: any) => {
    // In a real app, this would make an API call to update the user profile
    console.log("Saving profile:", updatedUser)
    // You could also show a success toast here
  }
  
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <UserProfileHeader user={user} onSaveProfile={handleSaveProfile} />
      <UserContactInfo user={user} />

      {/* Main Content - Two Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          <UserSkills skills={user.skills} />
          <UserStats stats={user.stats} />
          <UserTeamMembers />
          <UserContactCard user={user} />
          <UserQuickActions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UserPerformanceChart performanceData={user.performanceData} />
          <UserActivityChart activityTrend={user.activityTrend} />
          <UserRecentActivity recentActivity={user.recentActivity} />
          <UserAchievements achievements={user.achievements} />
          <TodoList />
        </div>
      </div>
    </div>
  )
} 