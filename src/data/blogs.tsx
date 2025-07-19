import React from "react";
import { CardItem } from "@/components/common/CardList";
import {
  Star,
  CheckCircle,
  Calendar,
  User,
  MessageCircle,
  Heart,
} from "lucide-react";

// Blog posts data
export const blogPosts: CardItem[] = [
  {
    id: "post-1",
    title: "Getting Started with Next.js 14",
    description: "A comprehensive guide to building modern web applications",
    content:
      "Learn how to set up a new Next.js project with the latest features including App Router, Server Components, and improved performance optimizations.",
    badge: {
      text: "Tutorial",
      variant: "secondary",
    },
    status: "active",
    headerAction: {
      icon: <Heart className="h-4 w-4" />,
      onClick: () => console.log("Like post"),
      tooltip: "Like this post",
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
        variant: "default",
      },
      {
        label: "Share",
        onClick: () => console.log("Share post"),
        variant: "outline",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
  },
  {
    id: "post-2",
    title: "Building Responsive UI with Tailwind CSS",
    description: "Master the art of responsive design with utility-first CSS",
    content:
      "Discover advanced Tailwind CSS techniques for creating beautiful, responsive interfaces that work seamlessly across all devices and screen sizes.",
    badge: {
      text: "CSS",
      variant: "outline",
    },
    status: "active",
    headerAction: {
      icon: <Star className="h-4 w-4" />,
      onClick: () => console.log("Bookmark post"),
      tooltip: "Bookmark this post",
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
            <span>1 week ago</span>
          </div>
        </div>
      </div>
    ),
    actions: [
      {
        label: "Read More",
        onClick: () => console.log("Read Tailwind post"),
        variant: "default",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
  },
  {
    id: "post-3",
    title: "TypeScript Best Practices",
    description: "Write better, more maintainable TypeScript code",
    content:
      "Explore advanced TypeScript patterns, type safety techniques, and best practices for building robust applications with better developer experience.",
    badge: {
      text: "TypeScript",
      variant: "default",
    },
    status: "active",
    headerAction: {
      icon: <CheckCircle className="h-4 w-4" />,
      onClick: () => console.log("Mark as read"),
      tooltip: "Mark as read",
    },
    footer: (
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>Mike Johnson</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>15</span>
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
        onClick: () => console.log("Read TypeScript post"),
        variant: "default",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
  },
  {
    id: "post-4",
    title: "State Management in Modern React",
    description: "Compare different state management solutions for React apps",
    content:
      "A detailed comparison of useState, useReducer, Context API, Zustand, and Redux Toolkit for managing application state effectively.",
    badge: {
      text: "React",
      variant: "destructive",
    },
    status: "active",
    headerAction: {
      icon: <Heart className="h-4 w-4" />,
      onClick: () => console.log("Like post"),
      tooltip: "Like this post",
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
        variant: "default",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
  },
];
