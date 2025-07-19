"use client";

import { AppBarChart } from "@/components/AppBarChart";
import { AppAreaChart } from "@/components/AppAreaChart";
import { AppPieChart } from "@/components/AppPieChart";
import { CardList, type CardItem } from "@/components/common/CardList";
import {
  TransactionList,
  type Transaction,
} from "@/components/TransactionList";
import { projectCards } from "@/data/projects";
import { transactions } from "@/data/transactions";
import { blogPosts } from "@/data/blogs";
import { TodoList } from "@/components/TodoList";
import {
  MoreHorizontal,
  Star,
  Clock,
  CheckCircle,
  Calendar,
  User,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Enhanced card data showcasing all functionalities - using centralized project data
const cardItems: CardItem[] = [
  ...projectCards.slice(0, 3), // Use first 3 projects from centralized data
  {
    id: "custom-1",
    title: "Custom Dashboard",
    description: "Analytics and reporting dashboard",
    content:
      "Real-time analytics dashboard with customizable widgets and reporting features.",
    badge: {
      text: "New",
      variant: "secondary",
    },
    status: "active",
    headerAction: {
      icon: <MoreHorizontal className="h-4 w-4" />,
      onClick: () => console.log("More options for Custom Dashboard"),
      tooltip: "More options",
    },
    actions: [
      {
        label: "View Details",
        onClick: () => console.log("View Custom Dashboard"),
        variant: "default",
      },
      {
        label: "Edit",
        onClick: () => console.log("Edit Custom Dashboard"),
        variant: "outline",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
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
      variant: "secondary",
    },
    status: "pending",
    headerAction: {
      icon: <Star className="h-4 w-4" />,
      onClick: () => console.log("Favorite Dashboard"),
      tooltip: "Add to favorites",
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
        variant: "default",
      },
    ],
  },
  {
    id: "3",
    title: "User Management System",
    description: "Complete admin panel for user operations",
    content:
      "Advanced user management system with role-based access control, permissions management, and audit logging capabilities.",
    badge: {
      text: "Completed",
      variant: "outline",
    },
    status: "completed",
    headerAction: {
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: () => console.log("Mark as reviewed"),
      tooltip: "Mark as reviewed",
    },
    actions: [
      {
        label: "Manage Users",
        onClick: () => console.log("Manage Users"),
        variant: "default",
      },
      {
        label: "View Logs",
        onClick: () => console.log("View Logs"),
        variant: "ghost",
      },
      {
        label: "Settings",
        onClick: () => console.log("Settings"),
        variant: "outline",
      },
    ],
    footer: (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Deployed 3 days ago</span>
      </div>
    ),
  },
];

// Blog posts data is now imported from data file
// Blog posts data is now imported from data file

// Transaction data - using centralized data
const transactionData: Transaction[] = transactions.slice(0, 6); // Use first 6 transactions

export default function Home() {
  const handleAddQuantity = (transactionId: string) => {
    console.log(`Adding quantity for transaction: ${transactionId}`);
    // Here you would update the transaction quantity in your state management
  };

  const handleRemoveQuantity = (transactionId: string) => {
    console.log(`Removing quantity for transaction: ${transactionId}`);
    // Here you would update the transaction quantity in your state management
  };

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Overview of your projects, analytics, and latest content
        </p>
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
        <h3 className="text-2xl font-semibold tracking-tight mb-4">
          Recent Projects
        </h3>
        <CardList items={cardItems} columns={3} />
      </div>

      {/* Blog Posts Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-2xl font-semibold tracking-tight">
            Latest Blog Posts
          </h3>
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
