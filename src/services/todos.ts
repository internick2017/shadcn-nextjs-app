import { TodoItem } from "@/types/todo";
import { apiClient, handleApiResponse } from "./api";
import {
  todos,
  getTodoById,
  getTodosByCompletion,
  getTodosByPriority,
  getTodosWithDueDates,
  getOverdueTodos,
} from "@/data/todos";

// Todo service class
export class TodoService {
  private mockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

  // Get all todos
  async getTodos(params?: {
    completed?: boolean;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<TodoItem[]> {
    if (this.mockMode) {
      let filteredTodos = [...todos];

      if (params?.completed !== undefined) {
        filteredTodos = getTodosByCompletion(params.completed);
      }

      if (params?.priority) {
        filteredTodos = getTodosByPriority(
          params.priority as TodoItem["priority"]
        );
      }

      // Simple pagination
      if (params?.page && params?.limit) {
        const start = (params.page - 1) * params.limit;
        const end = start + params.limit;
        filteredTodos = filteredTodos.slice(start, end);
      }

      return filteredTodos;
    }

    const response = await apiClient.get<TodoItem[]>(
      "/todos",
      params as Record<string, string>
    );
    return handleApiResponse(response);
  }

  // Get todo by ID
  async getTodoById(id: string): Promise<TodoItem | null> {
    if (this.mockMode) {
      return getTodoById(id) || null;
    }

    try {
      const response = await apiClient.get<TodoItem>(`/todos/${id}`);
      return handleApiResponse(response);
    } catch (error: unknown) {
      if (error instanceof Error && "status" in error && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Create new todo
  async createTodo(todoData: Omit<TodoItem, "id">): Promise<TodoItem> {
    if (this.mockMode) {
      const newTodo: TodoItem = {
        ...todoData,
        id: (todos.length + 1).toString(),
      };
      todos.push(newTodo);
      return newTodo;
    }

    const response = await apiClient.post<TodoItem>("/todos", todoData);
    return handleApiResponse(response);
  }

  // Update todo
  async updateTodo(id: string, todoData: Partial<TodoItem>): Promise<TodoItem> {
    if (this.mockMode) {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        throw new Error("Todo not found");
      }

      todos[todoIndex] = { ...todos[todoIndex], ...todoData };
      return todos[todoIndex];
    }

    const response = await apiClient.put<TodoItem>(`/todos/${id}`, todoData);
    return handleApiResponse(response);
  }

  // Delete todo
  async deleteTodo(id: string): Promise<void> {
    if (this.mockMode) {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        throw new Error("Todo not found");
      }

      todos.splice(todoIndex, 1);
      return;
    }

    await apiClient.delete(`/todos/${id}`);
  }

  // Toggle todo completion
  async toggleTodo(id: string): Promise<TodoItem> {
    if (this.mockMode) {
      const todo = getTodoById(id);
      if (!todo) {
        throw new Error("Todo not found");
      }

      return this.updateTodo(id, { completed: !todo.completed });
    }

    const response = await apiClient.patch<TodoItem>(`/todos/${id}/toggle`);
    return handleApiResponse(response);
  }

  // Get todos with due dates
  async getTodosWithDueDates(): Promise<TodoItem[]> {
    if (this.mockMode) {
      return getTodosWithDueDates();
    }

    const response = await apiClient.get<TodoItem[]>("/todos/with-due-dates");
    return handleApiResponse(response);
  }

  // Get overdue todos
  async getOverdueTodos(): Promise<TodoItem[]> {
    if (this.mockMode) {
      return getOverdueTodos();
    }

    const response = await apiClient.get<TodoItem[]>("/todos/overdue");
    return handleApiResponse(response);
  }
}

// Default todo service instance
export const todoService = new TodoService();
