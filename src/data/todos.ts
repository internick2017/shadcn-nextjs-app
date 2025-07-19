import { TodoItem } from '@/types/todo'

// Mock todo data
export const todos: TodoItem[] = [
  {
    id: "1",
    text: "Implement user authentication",
    completed: false,
    priority: "high",
    dueDate: "2024-01-15",
    createdAt: "2024-01-10"
  },
  {
    id: "2", 
    text: "Design new landing page",
    completed: true,
    priority: "medium",
    dueDate: "2024-01-12",
    createdAt: "2024-01-08"
  },
  {
    id: "3",
    text: "Write unit tests for API endpoints",
    completed: false,
    priority: "medium",
    createdAt: "2024-01-09"
  },
  {
    id: "4",
    text: "Optimize database queries",
    completed: false,
    priority: "low",
    dueDate: "2024-01-20",
    createdAt: "2024-01-11"
  },
  {
    id: "5",
    text: "Update documentation",
    completed: true,
    priority: "low",
    createdAt: "2024-01-07"
  },
  {
    id: "6",
    text: "Set up CI/CD pipeline",
    completed: false,
    priority: "high",
    dueDate: "2024-01-18",
    createdAt: "2024-01-12"
  },
  {
    id: "7",
    text: "Refactor legacy code",
    completed: false,
    priority: "medium",
    dueDate: "2024-01-25",
    createdAt: "2024-01-13"
  },
  {
    id: "8",
    text: "Conduct code review",
    completed: true,
    priority: "high",
    createdAt: "2024-01-14"
  }
]

// Helper function to get todo by ID
export const getTodoById = (id: string): TodoItem | undefined => {
  return todos.find(todo => todo.id === id)
}

// Helper function to get todos by completion status
export const getTodosByCompletion = (completed: boolean): TodoItem[] => {
  return todos.filter(todo => todo.completed === completed)
}

// Helper function to get todos by priority
export const getTodosByPriority = (priority: TodoItem['priority']): TodoItem[] => {
  return todos.filter(todo => todo.priority === priority)
}

// Helper function to get todos with due dates
export const getTodosWithDueDates = (): TodoItem[] => {
  return todos.filter(todo => todo.dueDate)
}

// Helper function to get overdue todos
export const getOverdueTodos = (): TodoItem[] => {
  const today = new Date().toISOString().split('T')[0]
  return todos.filter(todo => 
    todo.dueDate && 
    todo.dueDate < today && 
    !todo.completed
  )
} 