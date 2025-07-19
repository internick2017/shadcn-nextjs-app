"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DataTable,
  SelectColumn,
  ActionsColumn,
  SortableHeader,
} from "@/components/ui/data-table";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Plus,
} from "lucide-react";
import { useState } from "react";

import { Payment } from "@/types/payment";
import { payments } from "@/data/payments";

// Re-export Payment type for backward compatibility
export type { Payment };

// Use payments data from centralized data file

// Helper functions
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "failed":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "refunded":
      return <TrendingDown className="h-4 w-4 text-blue-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "credit_card":
    case "debit_card":
      return <CreditCard className="h-4 w-4" />;
    case "paypal":
      return <DollarSign className="h-4 w-4" />;
    case "bank_transfer":
      return <Building className="h-4 w-4" />;
    case "crypto":
      return <TrendingUp className="h-4 w-4" />;
    default:
      return <DollarSign className="h-4 w-4" />;
  }
};

// Define columns for the payments table
const columns: ColumnDef<Payment>[] = [
  SelectColumn,
  {
    accessorKey: "transactionId",
    header: ({ column }) => (
      <SortableHeader column={column}>Transaction</SortableHeader>
    ),
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div>
          <div className="font-medium">{payment.transactionId}</div>
          <div className="text-sm text-muted-foreground">
            {payment.description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback>
              {customer.name
                .split(" ")
                .map(n => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-sm text-muted-foreground">
              {customer.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader column={column}>Amount</SortableHeader>
    ),
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="text-right">
          <div className="font-medium">
            {formatCurrency(payment.amount, payment.currency)}
          </div>
          <div className="text-sm text-muted-foreground">
            Fee: {formatCurrency(payment.fee, payment.currency)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "pending"
                  ? "secondary"
                  : status === "failed"
                    ? "destructive"
                    : "outline"
            }
          >
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      const method = row.getValue("method") as string;
      const payment = row.original;
      return (
        <div className="flex items-center space-x-2">
          {getMethodIcon(method)}
          <div>
            <div className="font-medium capitalize">
              {method.replace("_", " ")}
            </div>
            <div className="text-sm text-muted-foreground">
              {payment.gateway}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => {
      const merchant = row.original.merchant;
      return (
        <div>
          <div className="font-medium">{merchant.name}</div>
          <div className="text-sm text-muted-foreground">
            {merchant.category}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div>{date.toLocaleDateString()}</div>
            <div className="text-sm text-muted-foreground">
              {date.toLocaleTimeString()}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "risk_score",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.getValue("risk_score") as string;
      return (
        <Badge
          variant={
            risk === "low"
              ? "default"
              : risk === "medium"
                ? "secondary"
                : "destructive"
          }
        >
          {risk}
        </Badge>
      );
    },
  },
  ActionsColumn([
    {
      label: "View Details",
      onClick: (payment: Payment) => {
        console.log("View payment details", payment.transactionId);
      },
    },
    {
      label: "Download Receipt",
      onClick: (payment: Payment) => {
        console.log("Download receipt for", payment.transactionId);
      },
    },
    {
      label: "Refund Payment",
      onClick: (payment: Payment) => {
        console.log("Refund payment", payment.transactionId);
      },
    },
    {
      label: "Contact Customer",
      onClick: (payment: Payment) => {
        console.log("Contact customer", payment.customer.name);
      },
    },
  ]),
];

export default function PaymentsPage() {
  const [paymentsData] = useState<Payment[]>(payments);

  // Calculate stats
  const totalRevenue = paymentsData
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalFees = paymentsData
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.fee, 0);

  const pendingAmount = paymentsData
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const refundedAmount = paymentsData
    .filter(p => p.status === "refunded")
    .reduce((sum, p) => sum + (p.refundAmount || 0), 0);

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Payments Management
            </h1>
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
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalRevenue, "USD")}
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(pendingAmount, "USD")}
              </div>
              <p className="text-xs text-muted-foreground">
                {paymentsData.filter(p => p.status === "pending").length}{" "}
                transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalFees, "USD")}
              </div>
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
              <div className="text-2xl font-bold">
                {formatCurrency(refundedAmount, "USD")}
              </div>
              <p className="text-xs text-muted-foreground">
                {paymentsData.filter(p => p.status === "refunded").length}{" "}
                refunded
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
            <CardDescription>
              A comprehensive list of all payment transactions with detailed
              information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={paymentsData}
              searchKey="transactionId"
              searchPlaceholder="Search payments..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
