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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Users,
  GitBranch,
  Edit,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  assignee: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

interface Activity {
  id: string;
  type: "comment" | "task_update" | "file_upload" | "milestone";
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage wireframes",
    status: "completed",
    assignee: "Emma Davis",
    dueDate: "2024-01-15",
    priority: "high",
  },
  {
    id: "2",
    title: "Implement user authentication",
    status: "in-progress",
    assignee: "Alex Chen",
    dueDate: "2024-01-20",
    priority: "high",
  },
  {
    id: "3",
    title: "Set up database schema",
    status: "completed",
    assignee: "Mike Wilson",
    dueDate: "2024-01-18",
    priority: "medium",
  },
  {
    id: "4",
    title: "Create responsive layout",
    status: "todo",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-25",
    priority: "medium",
  },
];

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "comment",
    user: "Sarah Johnson",
    content: "Updated the design specifications based on client feedback",
    timestamp: "2 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    type: "task_update",
    user: "Alex Chen",
    content: "Completed user authentication implementation",
    timestamp: "5 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    type: "file_upload",
    user: "Emma Davis",
    content: "Uploaded new wireframe mockups v2.1",
    timestamp: "1 day ago",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id;

  // Mock project data - in real app, fetch based on projectId
  const project = {
    id: projectId,
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
        role: "Frontend Developer",
      },
      {
        name: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "Backend Developer",
      },
      {
        name: "Emma Davis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        role: "UI/UX Designer",
      },
      {
        name: "Mike Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "DevOps Engineer",
      },
    ],
    dueDate: "2024-02-15",
    repository: "ecommerce-redesign",
    createdDate: "2024-01-01",
    lastUpdated: "2 hours ago",
  };

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

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "todo":
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "task_update":
        return <CheckCircle className="h-4 w-4" />;
      case "file_upload":
        return <FileText className="h-4 w-4" />;
      case "milestone":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const completedTasks = mockTasks.filter(
    task => task.status === "completed"
  ).length;
  const totalTasks = mockTasks.length;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-bold tracking-tight">
                {project.name}
              </h2>
              <Badge
                variant="secondary"
                className={getStatusColor(project.status)}
              >
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedTasks}/{totalTasks}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.team.length}</div>
            <p className="text-xs text-muted-foreground">Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Feb 15</div>
            <p className="text-xs text-muted-foreground">2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">{project.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="font-medium">{project.lastUpdated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Repository
                      </p>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="h-4 w-4" />
                        <p className="font-medium">{project.repository}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(project.status)}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActivities.slice(0, 3).map(activity => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={activity.avatar}
                            alt={activity.user}
                          />
                          <AvatarFallback>
                            {activity.user
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </p>
                        </div>
                        {getActivityIcon(activity.type)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task List</CardTitle>
              <CardDescription>Track progress on project tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getTaskStatusIcon(task.status)}
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Assigned to {task.assignee} • Due {task.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {task.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {project.team.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Activity</CardTitle>
              <CardDescription>
                Complete activity log for this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 pb-4 border-b last:border-b-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Project Settings</span>
              </CardTitle>
              <CardDescription>
                Manage project configuration and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Project Details
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team Members
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Repository Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
