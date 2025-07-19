"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Plus, Minus } from "lucide-react"

import { Transaction } from "@/types/payment"

// Re-export for backward compatibility
export type { Transaction }

interface TransactionListProps {
  transactions: Transaction[]
  title?: string
  className?: string
  onAddQuantity?: (transactionId: string) => void
  onRemoveQuantity?: (transactionId: string) => void
}

export function TransactionList({ 
  transactions, 
  title = "Recent Transactions",
  className,
  onAddQuantity,
  onRemoveQuantity
}: TransactionListProps) {
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  const formatAmount = (amount: number, type: Transaction["type"]) => {
    const prefix = type === "credit" ? "+" : "-"
    return `${prefix}$${amount.toFixed(2)}`
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-base">
          <span>{title}</span>
          <Badge variant="outline" className="text-xs">
            {transactions.length} transactions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[400px] overflow-y-auto">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
                index !== transactions.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* User Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarImage src={transaction.userImage} alt={transaction.userName} />
                  <AvatarFallback className="text-xs">
                    {transaction.userName.split(" ").map(name => name[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{transaction.userName}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs shrink-0 ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onRemoveQuantity?.(transaction.id)}
                  disabled={transaction.quantity <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <div className="flex flex-col items-center min-w-[48px]">
                  <span className="text-xs text-muted-foreground">Qty</span>
                  <span className="font-medium text-sm">{transaction.quantity}</span>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onAddQuantity?.(transaction.id)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Amount and Type */}
              <div className="text-right shrink-0 min-w-[80px]">
                <div className="flex items-center justify-end gap-1">
                  {transaction.type === "credit" ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowDownLeft className="h-3 w-3 text-red-500" />
                  )}
                  <span 
                    className={`font-medium text-sm ${
                      transaction.type === "credit" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 