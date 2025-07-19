// User related types
export type UserStatus = 'active' | 'inactive' | 'pending'
export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'
export type ActivityType = 'commit' | 'review' | 'issue' | 'comment' | 'deploy' | 'merge'

export interface UserPerformanceData {
  month: string
  commits: number
  reviews: number
  issues: number
}

export interface UserActivityTrend {
  week: string
  activity: number
}

export interface UserSkill {
  name: string
  level: SkillLevel
  color: string
}

export interface UserAchievement {
  title: string
  description: string
  icon: string
  date: string
}

export interface UserRecentActivity {
  type: ActivityType
  message: string
  time: string
  repo: string
}

export interface UserStats {
  projectsCompleted: number
  codeReviews: number
  linesOfCode: number
  bugsFixed: number
}

export interface TeamMember {
  name: string
  avatar: string
  role: string
  initials: string
}

// Main User interface - comprehensive version
export interface User {
  id: string
  name: string
  username: string
  email: string
  phone?: string
  avatar: string
  coverImage?: string
  bio: string
  location: string
  company: string
  role: string
  joinDate: string
  website?: string
  github?: string
  linkedin?: string
  twitter?: string
  status: UserStatus
  verified: boolean
  followers: number
  following: number
  posts: number
  skills: string[] | UserSkill[] // Support both formats for backward compatibility
  performanceData?: UserPerformanceData[]
  activityTrend?: UserActivityTrend[]
  achievements?: UserAchievement[]
  recentActivity?: UserRecentActivity[]
  stats?: UserStats
}

// Simplified User interface for lists and basic display
export interface UserSummary {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  location: string
  company: string
  role: string
  joinDate: string
  status: UserStatus
  verified: boolean
  followers: number
  following: number
  posts: number
  skills: string[]
}

export interface UserProfileProps {
  params: Promise<{ id: string }>
} 