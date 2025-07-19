// Navigation data for sidebar and menu components

import React from "react";
import {
  Home,
  BarChart3,
  Calendar,
  MessageSquare,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

export interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  badge?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "Inbox",
    icon: MessageSquare,
    url: "/inbox",
    badge: "12",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Search",
    icon: BarChart3,
    url: "/search",
  },
  {
    title: "Team Members",
    icon: Users,
    url: "/users",
  },
  {
    title: "Payments",
    icon: CreditCard,
    url: "/payments",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export const userProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Alex Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];
