import { Project } from '@/types/card'
import { ApiResponse, apiClient, handleApiResponse } from './api'
import { 
  projects, 
  getProjectById, 
  getProjectsByStatus, 
  getProjectsByCategory,
  getProjectsByPriority,
  getProjectsByAssignee,
  getActiveProjects
} from '@/data/projects'

// Project service class
export class ProjectService {
  private mockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false'

  // Get all projects
  async getProjects(params?: {
    status?: string
    category?: string
    priority?: string
    assignee?: string
    page?: number
    limit?: number
  }): Promise<Project[]> {
    if (this.mockMode) {
      let filteredProjects = [...projects]
      
      if (params?.status) {
        filteredProjects = getProjectsByStatus(params.status as Project['status'])
      }
      
      if (params?.category) {
        filteredProjects = getProjectsByCategory(params.category)
      }
      
      if (params?.priority) {
        filteredProjects = getProjectsByPriority(params.priority as Project['priority'])
      }
      
      if (params?.assignee) {
        filteredProjects = getProjectsByAssignee(params.assignee)
      }
      
      // Simple pagination
      if (params?.page && params?.limit) {
        const start = (params.page - 1) * params.limit
        const end = start + params.limit
        filteredProjects = filteredProjects.slice(start, end)
      }
      
      return filteredProjects
    }

    const response = await apiClient.get<Project[]>('/projects', params as Record<string, string>)
    return handleApiResponse(response)
  }

  // Get project by ID
  async getProjectById(id: string): Promise<Project | null> {
    if (this.mockMode) {
      return getProjectById(id) || null
    }

    try {
      const response = await apiClient.get<Project>(`/projects/${id}`)
      return handleApiResponse(response)
    } catch (error: any) {
      if (error.status === 404) {
        return null
      }
      throw error
    }
  }

  // Create new project
  async createProject(projectData: Omit<Project, 'id'>): Promise<Project> {
    if (this.mockMode) {
      const newProject: Project = {
        ...projectData,
        id: (projects.length + 1).toString()
      }
      projects.push(newProject)
      return newProject
    }

    const response = await apiClient.post<Project>('/projects', projectData)
    return handleApiResponse(response)
  }

  // Update project
  async updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    if (this.mockMode) {
      const projectIndex = projects.findIndex(project => project.id === id)
      if (projectIndex === -1) {
        throw new Error('Project not found')
      }
      
      projects[projectIndex] = { ...projects[projectIndex], ...projectData }
      return projects[projectIndex]
    }

    const response = await apiClient.put<Project>(`/projects/${id}`, projectData)
    return handleApiResponse(response)
  }

  // Delete project
  async deleteProject(id: string): Promise<void> {
    if (this.mockMode) {
      const projectIndex = projects.findIndex(project => project.id === id)
      if (projectIndex === -1) {
        throw new Error('Project not found')
      }
      
      projects.splice(projectIndex, 1)
      return
    }

    await apiClient.delete(`/projects/${id}`)
  }

  // Get active projects
  async getActiveProjects(): Promise<Project[]> {
    if (this.mockMode) {
      return getActiveProjects()
    }

    const response = await apiClient.get<Project[]>('/projects/active')
    return handleApiResponse(response)
  }

  // Update project progress
  async updateProjectProgress(id: string, progress: number): Promise<Project> {
    if (this.mockMode) {
      return this.updateProject(id, { progress })
    }

    const response = await apiClient.patch<Project>(`/projects/${id}/progress`, { progress })
    return handleApiResponse(response)
  }

  // Assign user to project
  async assignUserToProject(projectId: string, userId: string): Promise<Project> {
    if (this.mockMode) {
      const project = getProjectById(projectId)
      if (!project) {
        throw new Error('Project not found')
      }
      
      const assignees = [...project.assignees]
      if (!assignees.includes(userId)) {
        assignees.push(userId)
      }
      
      return this.updateProject(projectId, { assignees })
    }

    const response = await apiClient.post<Project>(`/projects/${projectId}/assignees`, { userId })
    return handleApiResponse(response)
  }

  // Remove user from project
  async removeUserFromProject(projectId: string, userId: string): Promise<Project> {
    if (this.mockMode) {
      const project = getProjectById(projectId)
      if (!project) {
        throw new Error('Project not found')
      }
      
      const assignees = project.assignees.filter(id => id !== userId)
      return this.updateProject(projectId, { assignees })
    }

    const response = await apiClient.delete<Project>(`/projects/${projectId}/assignees/${userId}`)
    return handleApiResponse(response)
  }
}

// Default project service instance
export const projectService = new ProjectService() 