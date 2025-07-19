"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable, SelectColumn, ActionsColumn, SortableHeader } from "@/components/ui/data-table"
import { 
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Plus,
  Filter
} from "lucide-react"
import { useState } from "react"

import { Payment } from "@/types/payment"
import { payments } from "@/data/payments"

// Re-export Payment type for backward compatibility
export type { Payment }

// Mock payments data - using centralized data
const allPayments: Payment[] = [
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
    status: "pending",
    method: "crypto",
    customer: {
      id: "7",
      name: "Lisa Zhang",
      email: "lisa.zhang@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "CryptoGoods Store",
      category: "Digital"
    },
    description: "NFT marketplace access",
    date: "2024-01-09T16:40:00Z",
    fee: 4.00,
    gateway: "CoinBase Commerce",
    country: "US",
    risk_score: "high"
  },
  {
    id: "8",
    transactionId: "TXN-008-2024",
    amount: 25.99,
    currency: "USD",
    status: "completed",
    method: "paypal",
    customer: {
      id: "8",
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "StreamingPlus",
      category: "Entertainment"
    },
    description: "Monthly subscription",
    date: "2024-01-08T19:25:00Z",
    fee: 1.05,
    gateway: "PayPal",
    country: "US",
    risk_score: "low"
  },
  {
    id: "9",
    transactionId: "TXN-009-2024",
    amount: 149.99,
    currency: "USD",
    status: "completed",
    method: "credit_card",
    customer: {
      id: "9",
      name: "Jennifer Davis",
      email: "jennifer.davis@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "OnlineCourses Pro",
      category: "Education"
    },
    description: "Full-stack development course",
    date: "2024-01-07T13:45:00Z",
    fee: 4.35,
    gateway: "Stripe",
    country: "US",
    risk_score: "low"
  },
  {
    id: "10",
    transactionId: "TXN-010-2024",
    amount: 79.99,
    currency: "USD",
    status: "pending",
    method: "debit_card",
    customer: {
      id: "10",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "GameStore Digital",
      category: "Gaming"
    },
    description: "Video game bundle",
    date: "2024-01-06T20:15:00Z",
    fee: 2.32,
    gateway: "PayPal",
    country: "US",
    risk_score: "low"
  },
  {
    id: "11",
    transactionId: "TXN-011-2024",
    amount: 399.99,
    currency: "USD",
    status: "failed",
    method: "credit_card",
    customer: {
      id: "11",
      name: "Amanda Wilson",
      email: "amanda.wilson@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "LaptopCenter Pro",
      category: "Electronics"
    },
    description: "Gaming laptop accessories",
    date: "2024-01-05T11:30:00Z",
    fee: 0,
    gateway: "Stripe",
    country: "US",
    risk_score: "medium"
  },
  {
    id: "12",
    transactionId: "TXN-012-2024",
    amount: 34.99,
    currency: "USD",
    status: "completed",
    method: "paypal",
    customer: {
      id: "12",
      name: "Christopher Lee",
      email: "christopher.lee@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "MusicStreaming Plus",
      category: "Entertainment"
    },
    description: "Premium music subscription",
    date: "2024-01-04T16:20:00Z",
    fee: 1.02,
    gateway: "PayPal",
    country: "US",
    risk_score: "low"
  },
  {
    id: "13",
    transactionId: "TXN-013-2024",
    amount: 189.99,
    currency: "USD",
    status: "refunded",
    method: "bank_transfer",
    customer: {
      id: "13",
      name: "Nicole Martinez",
      email: "nicole.martinez@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "FashionOutlet Online",
      category: "Fashion"
    },
    description: "Designer clothing order",
    date: "2024-01-03T14:10:00Z",
    fee: 2.85,
    refundAmount: 189.99,
    gateway: "Bank Direct",
    country: "US",
    risk_score: "low"
  },
  {
    id: "14",
    transactionId: "TXN-014-2024",
    amount: 99.99,
    currency: "USD",
    status: "completed",
    method: "crypto",
    customer: {
      id: "14",
      name: "Kevin Thompson",
      email: "kevin.thompson@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "CryptoTools Hub",
      category: "Technology"
    },
    description: "Blockchain analytics tool",
    date: "2024-01-02T09:45:00Z",
    fee: 2.99,
    gateway: "CoinBase Commerce",
    country: "US",
    risk_score: "high"
  },
  {
    id: "15",
    transactionId: "TXN-015-2024",
    amount: 56.99,
    currency: "USD",
    status: "pending",
    method: "credit_card",
    customer: {
      id: "15",
      name: "Rachel Green",
      email: "rachel.green@example.com",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    merchant: {
      name: "BookClub Premium",
      category: "Books"
    },
    description: "Annual book subscription",
    date: "2024-01-01T18:30:00Z",
    fee: 1.66,
    gateway: "Square",
    country: "US",
    risk_score: "low"
  }
]

// Helper functions
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "failed":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case "refunded":
      return <TrendingDown className="h-4 w-4 text-blue-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

const getMethodIcon = (method: string) => {
  switch (method) {
    case "credit_card":
    case "debit_card":
      return <CreditCard className="h-4 w-4" />
    case "paypal":
      return <DollarSign className="h-4 w-4" />
    case "bank_transfer":
      return <Building className="h-4 w-4" />
    case "crypto":
      return <TrendingUp className="h-4 w-4" />
    default:
      return <DollarSign className="h-4 w-4" />
  }
}

// Define columns for the payments table
const columns: ColumnDef<Payment>[] = [
  SelectColumn,
  {
    accessorKey: "transactionId",
    header: ({ column }) => (
      <SortableHeader column={column}>Transaction</SortableHeader>
    ),
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div>
          <div className="font-medium">{payment.transactionId}</div>
          <div className="text-sm text-muted-foreground">{payment.description}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-sm text-muted-foreground">{customer.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader column={column}>Amount</SortableHeader>
    ),
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="text-right">
          <div className="font-medium">
            {formatCurrency(payment.amount, payment.currency)}
          </div>
          <div className="text-sm text-muted-foreground">
            Fee: {formatCurrency(payment.fee, payment.currency)}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <Badge 
            variant={
              status === "completed" ? "default" : 
              status === "pending" ? "secondary" : 
              status === "failed" ? "destructive" : "outline"
            }
          >
            {status}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      const method = row.getValue("method") as string
      const payment = row.original
      return (
        <div className="flex items-center space-x-2">
          {getMethodIcon(method)}
          <div>
            <div className="font-medium capitalize">{method.replace('_', ' ')}</div>
            <div className="text-sm text-muted-foreground">{payment.gateway}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => {
      const merchant = row.original.merchant
      return (
        <div>
          <div className="font-medium">{merchant.name}</div>
          <div className="text-sm text-muted-foreground">{merchant.category}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div>{date.toLocaleDateString()}</div>
            <div className="text-sm text-muted-foreground">{date.toLocaleTimeString()}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "risk_score",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.getValue("risk_score") as string
      return (
        <Badge 
          variant={
            risk === "low" ? "default" : 
            risk === "medium" ? "secondary" : "destructive"
          }
        >
          {risk}
        </Badge>
      )
    },
  },
  ActionsColumn([
    {
      label: "View Details",
      onClick: (payment: Payment) => {
        console.log("View payment details", payment.transactionId)
      },
    },
    {
      label: "Download Receipt",
      onClick: (payment: Payment) => {
        console.log("Download receipt for", payment.transactionId)
      },
    },
    {
      label: "Refund Payment",
      onClick: (payment: Payment) => {
        console.log("Refund payment", payment.transactionId)
      },
    },
    {
      label: "Contact Customer",
      onClick: (payment: Payment) => {
        console.log("Contact customer", payment.customer.name)
      },
    },
  ]),
]

export default function PaymentsPage() {
  const [payments] = useState<Payment[]>(allPayments)

  // Calculate stats
  const totalRevenue = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)
  
  const totalFees = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.fee, 0)
  
  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)
  
  const refundedAmount = payments
    .filter(p => p.status === "refunded")
    .reduce((sum, p) => sum + (p.refundAmount || 0), 0)

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payments Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage all payment transactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue, 'USD')}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(pendingAmount, 'USD')}</div>
              <p className="text-xs text-muted-foreground">
                {payments.filter(p => p.status === "pending").length} transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalFees, 'USD')}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((totalFees / totalRevenue) * 100)}% of revenue
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Refunds</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(refundedAmount, 'USD')}</div>
              <p className="text-xs text-muted-foreground">
                {payments.filter(p => p.status === "refunded").length} refunded
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
            <CardDescription>
              A comprehensive list of all payment transactions with detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={payments} 
              searchKey="transactionId"
              searchPlaceholder="Search payments..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 