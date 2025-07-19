import { Project } from '@/types/card'
import { CardItem } from '@/types/card'

// Mock project data
export const projects: Project[] = [
  {
    id: "1",
    title: "Project Alpha",
    description: "Next.js application with modern UI components",
    content: "A full-stack application built with Next.js, TypeScript, and shadcn/ui components. Features include authentication, real-time updates, and responsive design.",
    status: "active",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "React", "Tailwind"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    dueDate: "2024-02-15T23:59:59Z",
    progress: 75,
    priority: "high",
    assignees: ["1", "2"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"]
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description: "Revolutionary mobile banking experience",
    content: "Cross-platform mobile application for banking services with biometric authentication, real-time notifications, and advanced security features.",
    status: "active",
    category: "Mobile Development",
    tags: ["React Native", "Banking", "Security"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
    createdAt: "2023-12-15T00:00:00Z",
    updatedAt: "2024-01-14T15:20:00Z",
    dueDate: "2024-03-01T23:59:59Z",
    progress: 60,
    priority: "high",
    assignees: ["3", "5"],
    technologies: ["React Native", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: "3",
    title: "E-commerce Analytics",
    description: "Advanced analytics dashboard for e-commerce",
    content: "Comprehensive analytics platform providing insights into customer behavior, sales trends, and inventory management for e-commerce businesses.",
    status: "pending",
    category: "Data Analysis",
    tags: ["Analytics", "Dashboard", "E-commerce"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-13T09:45:00Z",
    progress: 25,
    priority: "medium",
    assignees: ["7"],
    technologies: ["Python", "Django", "PostgreSQL", "D3.js"]
  },
  {
    id: "4",
    title: "DevOps Automation Suite",
    description: "Complete CI/CD and infrastructure management",
    content: "Automated deployment pipeline and infrastructure management tools to streamline development workflows and reduce deployment time.",
    status: "completed",
    category: "DevOps",
    tags: ["CI/CD", "Automation", "Infrastructure"],
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop",
    createdAt: "2023-11-01T00:00:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    dueDate: "2024-01-15T23:59:59Z",
    progress: 100,
    priority: "high",
    assignees: ["6"],
    technologies: ["Docker", "Kubernetes", "Jenkins", "Terraform"]
  },
  {
    id: "5",
    title: "AI Content Generator",
    description: "AI-powered content creation tool",
    content: "Machine learning application that generates high-quality content for marketing campaigns, blog posts, and social media.",
    status: "active",
    category: "Machine Learning",
    tags: ["AI", "Content", "ML"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-15T11:15:00Z",
    progress: 40,
    priority: "medium",
    assignees: ["7", "2"],
    technologies: ["Python", "TensorFlow", "FastAPI", "Redis"]
  },
  {
    id: "6",
    title: "Design System Library",
    description: "Comprehensive design system and component library",
    content: "Unified design system with reusable components, design tokens, and documentation to ensure consistency across all products.",
    status: "inactive",
    category: "Design",
    tags: ["Design System", "Components", "UI/UX"],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop",
    createdAt: "2023-12-20T00:00:00Z",
    updatedAt: "2024-01-10T16:45:00Z",
    progress: 85,
    priority: "low",
    assignees: ["3"],
    technologies: ["Figma", "Storybook", "React", "CSS-in-JS"]
  }
]

// Convert projects to CardItems for compatibility
export const projectCards: CardItem[] = projects.map(project => ({
  id: project.id,
  title: project.title,
  description: project.description,
  content: project.content,
  badge: {
    text: project.status.charAt(0).toUpperCase() + project.status.slice(1),
    variant: project.status === 'active' ? 'default' : 
             project.status === 'completed' ? 'secondary' : 
             project.status === 'pending' ? 'outline' : 'destructive'
  },
  status: project.status as any,
  image: project.image,
  actions: [
    {
      label: "View Details",
      onClick: () => console.log(`View ${project.title}`),
      variant: "default"
    },
    {
      label: "Edit",
      onClick: () => console.log(`Edit ${project.title}`),
      variant: "outline"
    }
  ]
}))

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

// Helper function to get projects by status
export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return projects.filter(project => project.status === status)
}

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category)
}

// Helper function to get projects by priority
export const getProjectsByPriority = (priority: Project['priority']): Project[] => {
  return projects.filter(project => project.priority === priority)
}

// Helper function to get projects assigned to a user
export const getProjectsByAssignee = (userId: string): Project[] => {
  return projects.filter(project => project.assignees.includes(userId))
}

// Helper function to get active projects
export const getActiveProjects = (): Project[] => {
  return projects.filter(project => project.status === 'active')
} 