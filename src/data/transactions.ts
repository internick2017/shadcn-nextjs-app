import { Transaction } from '@/types/payment'

// Mock transaction data for dashboard
export const transactions: Transaction[] = [
  {
    id: "txn-1",
    userName: "John Smith",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    type: "credit",
    amount: 250.00,
    quantity: 5,
    description: "Product purchase - Premium subscription",
    timestamp: "2 minutes ago",
    status: "completed"
  },
  {
    id: "txn-2", 
    userName: "Emma Johnson",
    userImage: "https://images.unsplash.com/photo-1494790108755-2616b25b7e54?w=100&h=100&fit=crop&crop=face",
    type: "debit",
    amount: 75.50,
    quantity: 2,
    description: "Refund processed - Order #12345",
    timestamp: "15 minutes ago",
    status: "pending"
  },
  {
    id: "txn-3",
    userName: "Michael Brown",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "credit",
    amount: 450.00,
    quantity: 8,
    description: "Bulk order - Enterprise license",
    timestamp: "1 hour ago",
    status: "completed"
  },
  {
    id: "txn-4",
    userName: "Sarah Wilson",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    type: "credit",
    amount: 120.00,
    quantity: 3,
    description: "Monthly subscription renewal",
    timestamp: "3 hours ago", 
    status: "completed"
  },
  {
    id: "txn-5",
    userName: "David Lee",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    type: "debit",
    amount: 30.00,
    quantity: 1,
    description: "Payment failed - Insufficient funds",
    timestamp: "6 hours ago",
    status: "failed"
  },
  {
    id: "txn-6",
    userName: "Lisa Garcia",
    userImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    type: "credit",
    amount: 89.99,
    quantity: 4,
    description: "Add-on features purchase",
    timestamp: "1 day ago",
    status: "completed"
  },
  {
    id: "txn-7",
    userName: "Robert Taylor",
    userImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    type: "credit",
    amount: 175.00,
    quantity: 3,
    description: "Annual membership upgrade",
    timestamp: "2 days ago",
    status: "completed"
  },
  {
    id: "txn-8",
    userName: "Jennifer Davis",
    userImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    type: "debit",
    amount: 42.99,
    quantity: 1,
    description: "Cancelled subscription refund",
    timestamp: "3 days ago",
    status: "completed"
  }
]

// Helper function to get transaction by ID
export const getTransactionById = (id: string): Transaction | undefined => {
  return transactions.find(transaction => transaction.id === id)
}

// Helper function to get transactions by type
export const getTransactionsByType = (type: Transaction['type']): Transaction[] => {
  return transactions.filter(transaction => transaction.type === type)
}

// Helper function to get transactions by status
export const getTransactionsByStatus = (status: Transaction['status']): Transaction[] => {
  return transactions.filter(transaction => transaction.status === status)
}

// Helper function to get recent transactions (last N)
export const getRecentTransactions = (count: number = 6): Transaction[] => {
  return transactions.slice(0, count)
} 