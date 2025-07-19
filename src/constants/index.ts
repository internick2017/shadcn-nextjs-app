// Status constants
export const USER_STATUSES = ['active', 'inactive', 'pending'] as const
export const PAYMENT_STATUSES = ['completed', 'pending', 'failed', 'refunded'] as const
export const TRANSACTION_STATUSES = ['completed', 'pending', 'failed'] as const
export const TODO_PRIORITIES = ['low', 'medium', 'high'] as const
export const CARD_STATUSES = ['active', 'inactive', 'pending', 'completed'] as const
export const PROJECT_STATUSES = ['active', 'inactive', 'pending', 'completed', 'archived'] as const

// Payment methods
export const PAYMENT_METHODS = [
  'credit_card',
  'debit_card', 
  'paypal',
  'bank_transfer',
  'crypto'
] as const

// Risk scores
export const RISK_SCORES = ['low', 'medium', 'high'] as const

// Transaction types
export const TRANSACTION_TYPES = ['credit', 'debit'] as const

// Skill levels
export const SKILL_LEVELS = ['Expert', 'Advanced', 'Intermediate', 'Beginner'] as const

// Activity types
export const ACTIVITY_TYPES = [
  'commit',
  'review', 
  'issue',
  'comment',
  'deploy',
  'merge'
] as const

// Badge variants
export const BADGE_VARIANTS = ['default', 'destructive', 'outline', 'secondary'] as const

// Button variants
export const BUTTON_VARIANTS = [
  'default',
  'destructive',
  'outline', 
  'secondary',
  'ghost',
  'link'
] as const

// Categories
export const MERCHANT_CATEGORIES = [
  'Electronics',
  'Education',
  'Technology',
  'Books',
  'Sports',
  'Software',
  'Hardware',
  'Services'
] as const

export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Desktop Application',
  'API Development',
  'DevOps',
  'Machine Learning',
  'Data Analysis',
  'Design',
  'Research'
] as const

// Payment gateways
export const PAYMENT_GATEWAYS = [
  'Stripe',
  'PayPal',
  'Square',
  'Bank Direct',
  'Coinbase'
] as const

// Countries (commonly used)
export const COUNTRIES = [
  'US',
  'CA', 
  'UK',
  'DE',
  'FR',
  'JP',
  'AU',
  'BR'
] as const

// Currencies
export const CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'CAD',
  'AUD',
  'BRL'
] as const 