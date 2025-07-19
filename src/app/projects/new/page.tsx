"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Calendar as CalendarIcon,
  Users,
  GitBranch,
  FolderOpen,
  ArrowLeft,
  X,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

const availableTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    role: "Frontend Developer",
  },
  {
    id: "2",
    name: "Alex Chen",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "Backend Developer",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "DevOps Engineer",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "UI/UX Designer",
  },
];

export default function NewProjectPage() {
  const [date, setDate] = useState<Date>();
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const addTeamMember = (member: TeamMember) => {
    if (!selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers(prev => [...prev, member]);
    }
  };

  const removeTeamMember = (memberId: string) => {
    setSelectedMembers(prev => prev.filter(m => m.id !== memberId));
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Create New Project
            </h2>
            <p className="text-muted-foreground">
              Set up a new project with team members and goals
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FolderOpen className="h-5 w-5" />
                <span>Project Details</span>
              </CardTitle>
              <CardDescription>
                Basic information about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" placeholder="Enter project name..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project goals and objectives..."
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Project Status</Label>
                  <Select defaultValue="planning">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={newDate => {
                        setDate(newDate);
                        setIsCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repository">Repository (Optional)</Label>
                <div className="flex space-x-2">
                  <div className="flex items-center px-3 py-2 bg-muted rounded-md">
                    <GitBranch className="h-4 w-4 mr-2" />
                    <span className="text-sm text-muted-foreground">
                      github.com/
                    </span>
                  </div>
                  <Input
                    id="repository"
                    placeholder="repository-name"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Team Members</span>
              </CardTitle>
              <CardDescription>
                Add team members to collaborate on this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Available Team Members</Label>
                <div className="grid gap-2">
                  {availableTeamMembers
                    .filter(
                      member => !selectedMembers.find(m => m.id === member.id)
                    )
                    .map(member => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => addTeamMember(member)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
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
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>

              {selectedMembers.length > 0 && (
                <div className="space-y-3">
                  <Label>
                    Selected Team Members ({selectedMembers.length})
                  </Label>
                  <div className="space-y-2">
                    {selectedMembers.map(member => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
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
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTeamMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview/Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
              <CardDescription>Preview of your new project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  PROJECT NAME
                </Label>
                <p className="font-medium">Untitled Project</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">STATUS</Label>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  Planning
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  TEAM SIZE
                </Label>
                <p className="font-medium">{selectedMembers.length} members</p>
              </div>

              {date && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    DUE DATE
                  </Label>
                  <p className="font-medium">{format(date, "PPP")}</p>
                </div>
              )}

              <div className="pt-4">
                <Button className="w-full">Create Project</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Set up project repository</p>
                <p>• Define project milestones</p>
                <p>• Create initial task board</p>
                <p>• Schedule kickoff meeting</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
