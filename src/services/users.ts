import { User, UserSummary } from "@/types/user";
import { apiClient, handleApiResponse } from "./api";
import {
  users,
  userSummaries,
  getUserById,
  getUserSummaryById,
} from "@/data/users";

// User service class
export class UserService {
  private mockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

  // Get all users
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<UserSummary[]> {
    if (this.mockMode) {
      // Filter and paginate mock data
      let filteredUsers = [...userSummaries];

      if (params?.search) {
        const searchTerm = params.search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.company.toLowerCase().includes(searchTerm)
        );
      }

      if (params?.status) {
        filteredUsers = filteredUsers.filter(
          user => user.status === params.status
        );
      }

      // Simple pagination
      if (params?.page && params?.limit) {
        const start = (params.page - 1) * params.limit;
        const end = start + params.limit;
        filteredUsers = filteredUsers.slice(start, end);
      }

      return filteredUsers;
    }

    // Real API call
    const response = await apiClient.get<UserSummary[]>(
      "/users",
      params as Record<string, string>
    );
    return handleApiResponse(response);
  }

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    if (this.mockMode) {
      return getUserById(id) || null;
    }

    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      return handleApiResponse(response);
    } catch (error: unknown) {
      if (error instanceof Error && "status" in error && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Create new user
  async createUser(userData: Omit<User, "id">): Promise<User> {
    if (this.mockMode) {
      // Simulate creation with mock data
      const newUser: User = {
        ...userData,
        id: (users.length + 1).toString(),
      };
      users.push(newUser);
      return newUser;
    }

    const response = await apiClient.post<User>("/users", userData);
    return handleApiResponse(response);
  }

  // Update user
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    if (this.mockMode) {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      users[userIndex] = { ...users[userIndex], ...userData };
      return users[userIndex];
    }

    const response = await apiClient.put<User>(`/users/${id}`, userData);
    return handleApiResponse(response);
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    if (this.mockMode) {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }

      users.splice(userIndex, 1);
      return;
    }

    await apiClient.delete(`/users/${id}`);
  }

  // Get user summary by ID
  async getUserSummaryById(id: string): Promise<UserSummary | null> {
    if (this.mockMode) {
      return getUserSummaryById(id) || null;
    }

    try {
      const response = await apiClient.get<UserSummary>(`/users/${id}/summary`);
      return handleApiResponse(response);
    } catch (error: unknown) {
      if (error instanceof Error && "status" in error && error.status === 404) {
        return null;
      }
      throw error;
    }
  }
}

// Default user service instance
export const userService = new UserService();
