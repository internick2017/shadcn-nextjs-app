"use client"

import { AppBarChart } from "@/components/AppBarChart"
import { AppAreaChart } from "@/components/AppAreaChart"
import { AppPieChart } from "@/components/AppPieChart"
import { CardList, type CardItem } from "@/components/common/CardList"
import { TransactionList, type Transaction } from "@/components/TransactionList"
import { projectCards } from "@/data/projects"
import { transactions } from "@/data/transactions"
import { TodoList } from "@/components/TodoList"
import { MoreHorizontal, Star, Clock, CheckCircle, Calendar, User, MessageCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

// Enhanced card data showcasing all functionalities - using centralized project data
const cardItems: CardItem[] = [
  ...projectCards.slice(0, 3), // Use first 3 projects from centralized data
  {
    id: "custom-1",
    title: "Custom Dashboard",
    description: "Analytics and reporting dashboard",
    content: "Real-time analytics dashboard with customizable widgets and reporting features.",
    badge: {
      text: "New",
      variant: "secondary"
    },
    status: "active",
    headerAction: {
      icon: <MoreHorizontal className="h-4 w-4" />,
      onClick: () => console.log("More options for Custom Dashboard"),
      tooltip: "More options"
    },
    actions: [
      {
        label: "View Details",
        onClick: () => console.log("View Custom Dashboard"),
        variant: "default"
      },
      {
        label: "Edit",
        onClick: () => console.log("Edit Custom Dashboard"),
        variant: "outline"
      }
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
  },
  {
    id: "2", 
    title: "Dashboard Analytics",
    description: "Real-time data visualization platform",
    content: (
      <div className="space-y-2">
        <p>Interactive charts and graphs showing:</p>
        <ul className="list-disc list-inside text-xs space-y-1">
          <li>Key business metrics</li>
          <li>Performance indicators</li>
          <li>User engagement data</li>
        </ul>
      </div>
    ),
    badge: {
      text: "In Progress",
      variant: "secondary"
    },
    status: "pending",
    headerAction: {
      icon: <Star className="h-4 w-4" />,
      onClick: () => console.log("Favorite Dashboard"),
      tooltip: "Add to favorites"
    },
    footer: (
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <span>Last updated: 2 hours ago</span>
        <span>Progress: 75%</span>
      </div>
    ),
    actions: [
      {
        label: "Open Dashboard",
        onClick: () => console.log("Open Dashboard"),
        variant: "default"
      }
    ]
  },
  {
    id: "3",
    title: "User Management System",
    description: "Complete admin panel for user operations",
    content: "Advanced user management system with role-based access control, permissions management, and audit logging capabilities.",
    badge: {
      text: "Completed",
      variant: "outline"
    },
    status: "completed",
    headerAction: {
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: () => console.log("Mark as reviewed"),
      tooltip: "Mark as reviewed"
    },
    actions: [
      {
        label: "Manage Users",
        onClick: () => console.log("Manage Users"),
        variant: "default"
      },
      {
        label: "View Logs",
        onClick: () => console.log("View Logs"),
        variant: "ghost"
      },
      {
        label: "Settings",
        onClick: () => console.log("Settings"),
        variant: "outline"
      }
    ],
    footer: (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Deployed 3 days ago</span>
      </div>
    )
  }
]

// Blog posts data
const blogPosts: CardItem[] = [
  {
    id: "post-1",
    title: "Getting Started with Next.js 14",
    description: "A comprehensive guide to building modern web applications",
    content: "Learn how to set up a new Next.js project with the latest features including App Router, Server Components, and improved performance optimizations.",
    badge: {
      text: "Tutorial",
      variant: "secondary"
    },
    status: "active",
    headerAction: {
      icon: <Heart className="h-4 w-4" />,
      onClick: () => console.log("Like post"),
      tooltip: "Like this post"
    },
    footer: (
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>John Doe</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>12</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>2 days ago</span>
          </div>
        </div>
      </div>
    ),
    actions: [
      {
        label: "Read More",
        onClick: () => console.log("Read Next.js post"),
        variant: "default"
      },
      {
        label: "Share",
        onClick: () => console.log("Share post"),
        variant: "outline"
      }
    ],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
  },
  {
    id: "post-2",
    title: "Building Responsive UI with Tailwind CSS",
    description: "Master the art of responsive design with utility-first CSS",
    content: "Discover advanced Tailwind CSS techniques for creating beautiful, responsive interfaces that work seamlessly across all devices and screen sizes.",
    badge: {
      text: "CSS",
      variant: "outline"
    },
    status: "active",
    headerAction: {
      icon: <Star className="h-4 w-4" />,
      onClick: () => console.log("Bookmark post"),
      tooltip: "Bookmark this post"
    },
    footer: (
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>Jane Smith</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>8</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>5 days ago</span>
          </div>
        </div>
      </div>
    ),
    actions: [
      {
        label: "Read More",
        onClick: () => console.log("Read Tailwind post"),
        variant: "default"
      }
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  },
  {
    id: "post-3",
    title: "TypeScript Best Practices for React",
    description: "Write better, more maintainable React code with TypeScript",
    content: "Explore essential TypeScript patterns and best practices that will help you build more robust React applications with better type safety.",
    badge: {
      text: "TypeScript",
      variant: "default"
    },
    status: "active",
    headerAction: {
      icon: <MoreHorizontal className="h-4 w-4" />,
      onClick: () => console.log("More options"),
      tooltip: "More options"
    },
    footer: (
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>Alex Johnson</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>15</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>1 week ago</span>
          </div>
        </div>
      </div>
    ),
    actions: [
      {
        label: "Read More",
        onClick: () => console.log("Read TypeScript post"),
        variant: "default"
      },
      {
        label: "Save",
        onClick: () => console.log("Save post"),
        variant: "ghost"
      }
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
  },
  {
    id: "post-4",
    title: "State Management in Modern React",
    description: "Compare different state management solutions for React apps",
    content: "A detailed comparison of useState, useReducer, Context API, Zustand, and Redux Toolkit for managing application state effectively.",
    badge: {
      text: "React",
      variant: "destructive"
    },
    status: "active",
    headerAction: {
      icon: <Heart className="h-4 w-4" />,
      onClick: () => console.log("Like post"),
      tooltip: "Like this post"
    },
    footer: (
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>Sarah Wilson</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>23</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>3 days ago</span>
          </div>
        </div>
      </div>
    ),
    actions: [
      {
        label: "Read More",
        onClick: () => console.log("Read State Management post"),
        variant: "default"
      }
    ],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
  }
]

// Transaction data - using centralized data
const transactionData: Transaction[] = transactions.slice(0, 6) // Use first 6 transactions

export default function Home() {
  const handleAddQuantity = (transactionId: string) => {
    console.log(`Adding quantity for transaction: ${transactionId}`)
    // Here you would update the transaction quantity in your state management
  }

  const handleRemoveQuantity = (transactionId: string) => {
    console.log(`Removing quantity for transaction: ${transactionId}`)
    // Here you would update the transaction quantity in your state management
  }
  
  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">Overview of your projects, analytics, and latest content</p>
      </div>
      
      {/* Charts Grid - Better responsive layout */}
      <div className="space-y-6 mb-8">
        {/* Top row - Main bar chart takes full width */}
        <div className="w-full">
          <AppBarChart />
        </div>
        
        {/* Bottom row - Four columns for charts, transactions, and todo list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div>
            <AppAreaChart />
          </div>
          <div>
            <AppPieChart />
          </div>
          <div>
            <TransactionList 
              transactions={transactionData}
              onAddQuantity={handleAddQuantity}
              onRemoveQuantity={handleRemoveQuantity}
            />
          </div>
          <div>
            <TodoList />
          </div>
        </div>
      </div>
      
      {/* Projects Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold tracking-tight mb-4">Recent Projects</h3>
        <CardList items={cardItems} columns={3} />
      </div>

      {/* Blog Posts Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-2xl font-semibold tracking-tight">Latest Blog Posts</h3>
          <Button 
            variant="outline" 
            onClick={() => console.log("View all posts")}
            className="self-start sm:self-auto"
          >
            View All Posts
          </Button>
        </div>
        <CardList items={blogPosts} columns={2} />
      </div>
    </div>
  );
}
