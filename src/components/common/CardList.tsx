"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface CardAction {
  label: string
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export interface HeaderAction {
  icon: React.ReactNode
  onClick: () => void
  tooltip?: string
}

export interface BadgeData {
  text: string
  variant?: "default" | "destructive" | "outline" | "secondary"
}

export interface CardItem {
  id: string
  title: string
  description?: string
  content?: React.ReactNode | string
  badge?: BadgeData
  status?: "active" | "inactive" | "pending" | "completed"
  headerAction?: HeaderAction
  actions?: CardAction[]
  footer?: React.ReactNode
  image?: string
  className?: string
}

interface CardListProps {
  items: CardItem[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function CardList({ 
  items, 
  columns = 3, 
  className = "" 
}: CardListProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active": return "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800"
      case "inactive": return "bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800"
      case "pending": return "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800"
      case "completed": return "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
      default: return ""
    }
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {items.map((item) => (
        <Card 
          key={item.id} 
          className={`h-fit transition-all duration-200 hover:shadow-lg hover:shadow-black/5 ${item.className || ""} ${getStatusColor(item.status)}`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg leading-tight truncate">{item.title}</CardTitle>
                  {item.badge && (
                    <Badge variant={item.badge.variant || "default"} className="shrink-0">
                      {item.badge.text}
                    </Badge>
                  )}
                </div>
                {item.description && (
                  <CardDescription className="text-sm line-clamp-2">
                    {item.description}
                  </CardDescription>
                )}
              </div>
              
              {item.headerAction && (
                <div className="ml-2 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={item.headerAction.onClick}
                    title={item.headerAction.tooltip}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    {item.headerAction.icon}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-0">
            {item.image && (
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = '<div class="text-muted-foreground text-sm">Image not available</div>'
                    }
                  }}
                />
              </div>
            )}
            
            {item.content && (
              <div className="text-sm text-muted-foreground">
                {typeof item.content === 'string' ? (
                  <p className="leading-relaxed">{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            )}
            
            {item.footer && (
              <div className="pt-2">
                {item.footer}
              </div>
            )}
            
            {item.actions && item.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    size="sm"
                    onClick={action.onClick}
                    className="flex-1 min-w-fit"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 