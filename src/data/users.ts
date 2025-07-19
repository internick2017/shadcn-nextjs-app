import { User, UserSummary, UserSkill, UserPerformanceData, UserActivityTrend, UserAchievement, UserRecentActivity, UserStats } from '@/types/user'

// Shared user skills data
const commonSkills: UserSkill[] = [
  { name: 'JavaScript', level: 'Expert', color: '#f7df1e' },
  { name: 'TypeScript', level: 'Advanced', color: '#3178c6' },
  { name: 'React', level: 'Expert', color: '#61dafb' },
  { name: 'Next.js', level: 'Advanced', color: '#000000' },
  { name: 'Node.js', level: 'Advanced', color: '#339933' },
  { name: 'Python', level: 'Intermediate', color: '#3776ab' },
  { name: 'Docker', level: 'Intermediate', color: '#2496ed' },
  { name: 'AWS', level: 'Beginner', color: '#ff9900' },
  { name: 'Figma', level: 'Expert', color: '#f24e1e' },
  { name: 'Adobe Creative Suite', level: 'Advanced', color: '#ff0000' }
]

// Sample performance data
const samplePerformanceData: UserPerformanceData[] = [
  { month: "Jan", commits: 45, reviews: 23, issues: 8 },
  { month: "Feb", commits: 52, reviews: 31, issues: 12 },
  { month: "Mar", commits: 38, reviews: 28, issues: 6 },
  { month: "Apr", commits: 67, reviews: 35, issues: 15 },
  { month: "May", commits: 59, reviews: 42, issues: 9 },
  { month: "Jun", commits: 73, reviews: 38, issues: 11 }
]

// Sample activity trend data
const sampleActivityTrend: UserActivityTrend[] = [
  { week: "Week 1", activity: 85 },
  { week: "Week 2", activity: 92 },
  { week: "Week 3", activity: 78 },
  { week: "Week 4", activity: 96 }
]

// Sample achievements
const sampleAchievements: UserAchievement[] = [
  {
    title: "Code Contributor",
    description: "Made 100+ commits this month",
    icon: "🏆",
    date: "2024-01-15"
  },
  {
    title: "Team Player", 
    description: "Reviewed 50+ pull requests",
    icon: "👥",
    date: "2024-01-10"
  }
]

// Sample recent activity
const sampleRecentActivity: UserRecentActivity[] = [
  {
    type: "commit",
    message: "Fix user authentication bug",
    time: "2 hours ago",
    repo: "main-app"
  },
  {
    type: "review",
    message: "Reviewed PR #123: Add dark mode",
    time: "4 hours ago", 
    repo: "ui-components"
  },
  {
    type: "merge",
    message: "Merged feature/payment-integration",
    time: "1 day ago",
    repo: "backend-api"
  }
]

// Sample stats
const sampleStats: UserStats = {
  projectsCompleted: 24,
  codeReviews: 156,
  linesOfCode: 45670,
  bugsFixed: 89
}

// Mock users data - comprehensive version
export const users: User[] = [
  {
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
    skills: [commonSkills[0], commonSkills[1], commonSkills[2], commonSkills[3]],
    performanceData: samplePerformanceData,
    activityTrend: sampleActivityTrend,
    achievements: sampleAchievements,
    recentActivity: sampleRecentActivity,
    stats: sampleStats
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
    skills: [commonSkills[4], commonSkills[5], commonSkills[6], commonSkills[7]],
    stats: {
      projectsCompleted: 18,
      codeReviews: 132,
      linesOfCode: 38450,
      bugsFixed: 73
    }
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
    skills: [commonSkills[8], commonSkills[9]],
    stats: {
      projectsCompleted: 12,
      codeReviews: 87,
      linesOfCode: 15230,
      bugsFixed: 34
    }
  },
  {
    id: "4",
    name: "David Kim",
    username: "david_fullstack",
    email: "david.kim@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Full-stack developer with expertise in both frontend and backend technologies.",
    location: "New York, NY",
    company: "Startup Ventures",
    role: "Lead Developer",
    joinDate: "2022-11-08",
    status: "active",
    verified: true,
    followers: 1567,
    following: 432,
    posts: 123,
    skills: ["JavaScript", "Python", "React", "Django"]
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    username: "emily_mobile",
    email: "emily.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    bio: "Mobile app developer focused on creating seamless user experiences across platforms.",
    location: "Los Angeles, CA",
    company: "Mobile Solutions Inc.",
    role: "Senior Mobile Developer",
    joinDate: "2023-05-20",
    status: "active",
    verified: true,
    followers: 987,
    following: 234,
    posts: 67,
    skills: ["React Native", "Swift", "Kotlin", "Flutter"]
  },
  {
    id: "6",
    name: "James Wilson",
    username: "james_devops",
    email: "james.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    bio: "DevOps engineer passionate about automation, infrastructure, and continuous deployment.",
    location: "Chicago, IL",
    company: "Infrastructure Co.",
    role: "Senior DevOps Engineer",
    joinDate: "2021-12-03",
    status: "active",
    verified: true,
    followers: 1432,
    following: 567,
    posts: 89,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"]
  },
  {
    id: "7",
    name: "Lisa Thompson",
    username: "lisa_data",
    email: "lisa.thompson@example.com",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    bio: "Data scientist and machine learning engineer turning data into actionable insights.",
    location: "Boston, MA",
    company: "Data Analytics Corp",
    role: "Senior Data Scientist",
    joinDate: "2022-07-14",
    status: "pending",
    verified: false,
    followers: 756,
    following: 189,
    posts: 45,
    skills: ["Python", "R", "TensorFlow", "PyTorch"]
  }
]

// Simplified user summaries for list views
export const userSummaries: UserSummary[] = users.map(user => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  bio: user.bio,
  location: user.location,
  company: user.company,
  role: user.role,
  joinDate: user.joinDate,
  status: user.status,
  verified: user.verified,
  followers: user.followers,
  following: user.following,
  posts: user.posts,
  skills: Array.isArray(user.skills) && user.skills.length > 0 && typeof user.skills[0] === 'object' 
    ? (user.skills as UserSkill[]).map(skill => skill.name)
    : user.skills as string[]
}))

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id)
}

// Helper function to get user summary by ID
export const getUserSummaryById = (id: string): UserSummary | undefined => {
  return userSummaries.find(user => user.id === id)
} 