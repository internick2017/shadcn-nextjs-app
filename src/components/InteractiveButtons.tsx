"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

type ClickableButtonProps = {
  children: React.ReactNode, 
  onClick: () => void, 
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link", 
  size?: "sm" | "default" | "lg" | "icon"
}

export function ClickableButton({ 
  children, 
  onClick, 
  variant, 
  size 
}: ClickableButtonProps) {
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={onClick}
    >
      {children}
    </Button>
  )
} 