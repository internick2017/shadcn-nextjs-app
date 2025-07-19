import { Payment, Customer } from '@/types/payment'

// Mock payments data
export const payments: Payment[] = [
  {
    id: "1",
    transactionId: "TXN-001-2024",
    amount: 129.99,
    currency: "USD",
    status: "completed",
    method: "credit_card",
    customer: {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "TechStore Pro",
      category: "Electronics"
    },
    description: "Premium Software License",
    date: "2024-01-15T10:30:00Z",
    fee: 3.77,
    gateway: "Stripe",
    country: "US",
    risk_score: "low"
  },
  {
    id: "2",
    transactionId: "TXN-002-2024",
    amount: 59.99,
    currency: "USD",
    status: "pending",
    method: "paypal",
    customer: {
      id: "2",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "DesignCourses Online",
      category: "Education"
    },
    description: "Web Design Masterclass",
    date: "2024-01-14T15:45:00Z",
    fee: 1.74,
    gateway: "PayPal",
    country: "US",
    risk_score: "low"
  },
  {
    id: "3",
    transactionId: "TXN-003-2024",
    amount: 299.99,
    currency: "USD",
    status: "failed",
    method: "credit_card",
    customer: {
      id: "3",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "CloudHosting Solutions",
      category: "Technology"
    },
    description: "Annual hosting plan",
    date: "2024-01-13T09:20:00Z",
    fee: 0,
    gateway: "Stripe",
    country: "US",
    risk_score: "medium"
  },
  {
    id: "4",
    transactionId: "TXN-004-2024",
    amount: 45.00,
    currency: "USD",
    status: "completed",
    method: "debit_card",
    customer: {
      id: "4",
      name: "David Kim",
      email: "david.kim@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "BookStore Central",
      category: "Books"
    },
    description: "Programming book collection",
    date: "2024-01-12T14:10:00Z",
    fee: 1.35,
    gateway: "Square",
    country: "US",
    risk_score: "low"
  },
  {
    id: "5",
    transactionId: "TXN-005-2024",
    amount: 89.99,
    currency: "USD",
    status: "refunded",
    method: "credit_card",
    customer: {
      id: "5",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "Fitness Gear Pro",
      category: "Sports"
    },
    description: "Wireless headphones",
    date: "2024-01-11T11:30:00Z",
    fee: 2.61,
    refundAmount: 89.99,
    gateway: "Stripe",
    country: "US",
    risk_score: "low"
  },
  {
    id: "6",
    transactionId: "TXN-006-2024",
    amount: 1299.99,
    currency: "USD",
    status: "completed",
    method: "bank_transfer",
    customer: {
      id: "6",
      name: "James Wilson",
      email: "james.wilson@example.com",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "Pro Equipment Co",
      category: "Electronics"
    },
    description: "Professional camera setup",
    date: "2024-01-10T08:15:00Z",
    fee: 15.60,
    gateway: "Bank Direct",
    country: "US",
    risk_score: "low"
  },
  {
    id: "7",
    transactionId: "TXN-007-2024",
    amount: 199.99,
    currency: "USD",
    status: "completed",
    method: "crypto",
    customer: {
      id: "7",
      name: "Lisa Thompson",
      email: "lisa.thompson@example.com",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "Digital Assets Exchange",
      category: "Technology"
    },
    description: "Cryptocurrency trading course",
    date: "2024-01-09T16:25:00Z",
    fee: 5.99,
    gateway: "Coinbase",
    country: "US",
    risk_score: "low"
  }
]

// Helper function to get payment by ID
export const getPaymentById = (id: string): Payment | undefined => {
  return payments.find(payment => payment.id === id)
}

// Helper function to get payments by customer ID
export const getPaymentsByCustomerId = (customerId: string): Payment[] => {
  return payments.filter(payment => payment.customer.id === customerId)
}

// Helper function to get payments by status
export const getPaymentsByStatus = (status: Payment['status']): Payment[] => {
  return payments.filter(payment => payment.status === status)
} 