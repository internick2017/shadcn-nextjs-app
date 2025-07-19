// Validation utility functions

import { User, UserStatus } from '@/types/user'
import { Payment, PaymentStatus, PaymentMethod, RiskScore } from '@/types/payment'
import { TodoItem, TodoPriority } from '@/types/todo'
import { Project, ProjectStatus } from '@/types/card'

// User validation
export const validateUser = (user: Partial<User>): string[] => {
  const errors: string[] = []
  
  if (!user.name?.trim()) {
    errors.push('Name is required')
  }
  
  if (!user.username?.trim()) {
    errors.push('Username is required')
  } else if (!/^[a-zA-Z0-9_]+$/.test(user.username)) {
    errors.push('Username can only contain letters, numbers, and underscores')
  }
  
  if (!user.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Email must be valid')
  }
  
  if (user.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(user.phone)) {
    errors.push('Phone number format is invalid')
  }
  
  if (user.website && !isValidUrl(user.website)) {
    errors.push('Website URL is invalid')
  }
  
  return errors
}

// Payment validation
export const validatePayment = (payment: Partial<Payment>): string[] => {
  const errors: string[] = []
  
  if (!payment.amount || payment.amount <= 0) {
    errors.push('Amount must be greater than 0')
  }
  
  if (!payment.currency?.trim()) {
    errors.push('Currency is required')
  }
  
  if (!payment.customer?.id) {
    errors.push('Customer is required')
  }
  
  if (!payment.description?.trim()) {
    errors.push('Description is required')
  }
  
  if (!payment.method) {
    errors.push('Payment method is required')
  }
  
  if (!payment.gateway?.trim()) {
    errors.push('Payment gateway is required')
  }
  
  return errors
}

// Todo validation
export const validateTodo = (todo: Partial<TodoItem>): string[] => {
  const errors: string[] = []
  
  if (!todo.text?.trim()) {
    errors.push('Todo text is required')
  }
  
  if (todo.dueDate && new Date(todo.dueDate) < new Date()) {
    errors.push('Due date cannot be in the past')
  }
  
  return errors
}

// Project validation
export const validateProject = (project: Partial<Project>): string[] => {
  const errors: string[] = []
  
  if (!project.title?.trim()) {
    errors.push('Project title is required')
  }
  
  if (!project.description?.trim()) {
    errors.push('Project description is required')
  }
  
  if (!project.category?.trim()) {
    errors.push('Project category is required')
  }
  
  if (project.progress !== undefined && (project.progress < 0 || project.progress > 100)) {
    errors.push('Progress must be between 0 and 100')
  }
  
  if (project.dueDate && new Date(project.dueDate) < new Date()) {
    errors.push('Due date cannot be in the past')
  }
  
  return errors
}

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Phone number validation
export const isValidPhoneNumber = (phone: string): boolean => {
  // Simple phone validation - can be enhanced based on requirements
  const phoneRegex = /^[\+]?[1-9]\d{1,14}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean
  errors: string[]
  score: number
} => {
  const errors: string[] = []
  let score = 0
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  } else {
    score += 1
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  } else {
    score += 1
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  } else {
    score += 1
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  } else {
    score += 1
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  } else {
    score += 1
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    score
  }
}

// Type guards
export const isUserStatus = (value: string): value is UserStatus => {
  return ['active', 'inactive', 'pending'].includes(value)
}

export const isPaymentStatus = (value: string): value is PaymentStatus => {
  return ['completed', 'pending', 'failed', 'refunded'].includes(value)
}

export const isPaymentMethod = (value: string): value is PaymentMethod => {
  return ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto'].includes(value)
}

export const isRiskScore = (value: string): value is RiskScore => {
  return ['low', 'medium', 'high'].includes(value)
}

export const isTodoPriority = (value: string): value is TodoPriority => {
  return ['low', 'medium', 'high'].includes(value)
}

export const isProjectStatus = (value: string): value is ProjectStatus => {
  return ['active', 'inactive', 'pending', 'completed', 'archived'].includes(value)
} 