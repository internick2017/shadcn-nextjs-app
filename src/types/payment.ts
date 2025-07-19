// Payment related types
export interface Customer {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Merchant {
  name: string
  category: string
}

export type PaymentStatus = "completed" | "pending" | "failed" | "refunded"
export type PaymentMethod = "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "crypto"
export type RiskScore = "low" | "medium" | "high"

export interface Payment {
  id: string
  transactionId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  customer: Customer
  merchant: Merchant
  description: string
  date: string
  fee: number
  refundAmount?: number
  gateway: string
  country: string
  risk_score: RiskScore
}

// Transaction types (different from Payment - this is for general transactions)
export type TransactionType = "credit" | "debit"
export type TransactionStatus = "completed" | "pending" | "failed"

export interface Transaction {
  id: string
  userName: string
  userImage: string
  type: TransactionType
  amount: number
  quantity: number
  description: string
  timestamp: string
  status: TransactionStatus
} 