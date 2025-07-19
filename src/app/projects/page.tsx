"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  MoreHorizontal,
  GitBranch,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "planning";
  progress: number;
  team: Array<{
    name: string;
    avatar: string;
  }>;
  dueDate: string;
  repository?: string;
  lastUpdated: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform Redesign",
    description:
      "Complete overhaul of the online store interface with modern UI/UX principles and improved performance.",
    status: "active",
    progress: 65,
    team: [
      {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    ],
    dueDate: "2024-02-15",
    repository: "ecommerce-redesign",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description:
      "Native mobile application for iOS and Android platforms with real-time synchronization.",
    status: "active",
    progress: 40,
    team: [
      {
        name: "Mike Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Emma Davis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    ],
    dueDate: "2024-03-01",
    repository: "mobile-app",
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "API Documentation",
    description:
      "Comprehensive documentation for our REST API with interactive examples and code samples.",
    status: "completed",
    progress: 100,
    team: [{ name: "John Doe", avatar: "/placeholder-avatar.jpg" }],
    dueDate: "2024-01-20",
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    name: "Data Analytics Dashboard",
    description:
      "Real-time analytics dashboard with customizable widgets and advanced reporting features.",
    status: "planning",
    progress: 15,
    team: [
      {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Mike Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    ],
    dueDate: "2024-04-10",
    repository: "analytics-dashboard",
    lastUpdated: "5 days ago",
  },
];

export default function ProjectsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      case "planning":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activeProjects = mockProjects.filter(p => p.status === "active").length;
  const completedProjects = mockProjects.filter(
    p => p.status === "completed"
  ).length;
  const totalProjects = mockProjects.length;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and track your project portfolio
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/projects/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">
              Successfully finished
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((completedProjects / totalProjects) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Project completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map(project => (
          <Card
            key={project.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className={getStatusColor(project.status)}
                >
                  {project.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Link href={`/projects/${project.id}`}>
                  <CardTitle className="hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                </Link>
                <CardDescription className="mt-2 line-clamp-3">
                  {project.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar
                        key={index}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map(n => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{project.team.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Due {project.dueDate}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {project.repository && (
                  <div className="flex items-center space-x-1">
                    <GitBranch className="h-3 w-3" />
                    <span>{project.repository}</span>
                  </div>
                )}
                <span>Updated {project.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
