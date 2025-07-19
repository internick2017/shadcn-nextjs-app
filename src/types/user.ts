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
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'
  color: string
}

export interface UserAchievement {
  title: string
  description: string
  icon: string
  date: string
}

export interface UserRecentActivity {
  type: 'commit' | 'review' | 'issue' | 'comment' | 'deploy' | 'merge'
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

export interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  avatar: string
  coverImage: string
  bio: string
  location: string
  company: string
  role: string
  joinDate: string
  website: string
  github: string
  linkedin: string
  twitter: string
  status: 'active' | 'inactive'
  verified: boolean
  followers: number
  following: number
  posts: number
  performanceData: UserPerformanceData[]
  activityTrend: UserActivityTrend[]
  skills: UserSkill[]
  achievements: UserAchievement[]
  recentActivity: UserRecentActivity[]
  stats: UserStats
}

export interface UserProfileProps {
  params: Promise<{ id: string }>
} 