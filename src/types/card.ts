import { ReactNode } from "react"

// Card related types
export interface CardAction {
  label: string
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export interface HeaderAction {
  icon: ReactNode
  onClick: () => void
  tooltip?: string
}

export interface BadgeData {
  text: string
  variant?: "default" | "destructive" | "outline" | "secondary"
}

export type CardStatus = "active" | "inactive" | "pending" | "completed"

export interface CardItem {
  id: string
  title: string
  description?: string
  content?: ReactNode | string
  badge?: BadgeData
  status?: CardStatus
  headerAction?: HeaderAction
  actions?: CardAction[]
  footer?: ReactNode
  image?: string
  className?: string
}

// Project related types (based on the card items in main page)
export type ProjectStatus = "active" | "inactive" | "pending" | "completed" | "archived"

export interface Project {
  id: string
  title: string
  description: string
  content: string
  status: ProjectStatus
  category: string
  tags: string[]
  image?: string
  createdAt: string
  updatedAt: string
  dueDate?: string
  progress: number
  priority: "low" | "medium" | "high"
  assignees: string[]
  technologies: string[]
} 