// Todo related types
export type TodoPriority = "low" | "medium" | "high"

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  priority: TodoPriority
  dueDate?: string
  createdAt: string
} 