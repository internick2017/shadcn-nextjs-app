// Team member data

export interface TeamMember {
  name: string
  role: string
  avatar: string
  initials: string
}

export const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    role: "Backend Dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    initials: "JD"
  },
  {
    name: "Emma Wilson",
    role: "UI Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    initials: "EM"
  },
  {
    name: "Alex Chen",
    role: "DevOps",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    initials: "AC"
  },
  {
    name: "Maria Garcia",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
    initials: "MJ"
  }
] 