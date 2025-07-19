"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  CreditCard,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchResult {
  id: string;
  type: "user" | "project" | "message" | "file" | "payment" | "event";
  title: string;
  description: string;
  url: string;
  metadata?: {
    author?: string;
    date?: string;
    status?: string;
    avatar?: string;
  };
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    type: "user",
    title: "Sarah Johnson",
    description:
      "Senior Frontend Developer specializing in React and TypeScript",
    url: "/user/1",
    metadata: {
      status: "Active",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    },
  },
  {
    id: "2",
    type: "project",
    title: "E-commerce Platform Redesign",
    description:
      "Complete overhaul of the online store interface with modern UI/UX",
    url: "/projects/1",
    metadata: {
      author: "Alex Chen",
      date: "2024-01-15",
      status: "In Progress",
    },
  },
  {
    id: "3",
    type: "message",
    title: "Project Update - Q4 Results",
    description:
      "Hey there! I wanted to share the latest updates on our Q4 project...",
    url: "/inbox",
    metadata: {
      author: "Sarah Johnson",
      date: "2 hours ago",
    },
  },
  {
    id: "4",
    type: "file",
    title: "Design System Documentation",
    description:
      "Comprehensive guide to our design system components and usage",
    url: "/files/design-system.pdf",
    metadata: {
      author: "Emma Davis",
      date: "2024-01-20",
    },
  },
  {
    id: "5",
    type: "payment",
    title: "December Subscription Payment",
    description: "Monthly subscription fee for premium features",
    url: "/payments",
    metadata: {
      date: "2024-01-01",
      status: "Completed",
    },
  },
  {
    id: "6",
    type: "event",
    title: "Team Standup Meeting",
    description: "Daily standup meeting with the development team",
    url: "/calendar",
    metadata: {
      date: "Today, 09:00",
      status: "Upcoming",
    },
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4" />;
      case "project":
        return <FileText className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "file":
        return <FileText className="h-4 w-4" />;
      case "payment":
        return <CreditCard className="h-4 w-4" />;
      case "event":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-800";
      case "project":
        return "bg-green-100 text-green-800";
      case "message":
        return "bg-purple-100 text-purple-800";
      case "file":
        return "bg-orange-100 text-orange-800";
      case "payment":
        return "bg-red-100 text-red-800";
      case "event":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResults =
    activeTab === "all"
      ? mockSearchResults
      : mockSearchResults.filter(result => result.type === activeTab);

  const resultCounts = {
    all: mockSearchResults.length,
    user: mockSearchResults.filter(r => r.type === "user").length,
    project: mockSearchResults.filter(r => r.type === "project").length,
    message: mockSearchResults.filter(r => r.type === "message").length,
    file: mockSearchResults.filter(r => r.type === "file").length,
    payment: mockSearchResults.filter(r => r.type === "payment").length,
    event: mockSearchResults.filter(r => r.type === "event").length,
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Search</h2>
          <p className="text-muted-foreground">
            Find users, projects, messages, and more
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for anything..."
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All ({resultCounts.all})
              </TabsTrigger>
              <TabsTrigger value="user" className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                Users ({resultCounts.user})
              </TabsTrigger>
              <TabsTrigger value="project" className="flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Projects ({resultCounts.project})
              </TabsTrigger>
              <TabsTrigger value="message" className="flex items-center gap-2">
                <MessageSquare className="h-3 w-3" />
                Messages ({resultCounts.message})
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Files ({resultCounts.file})
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-3 w-3" />
                Payments ({resultCounts.payment})
              </TabsTrigger>
              <TabsTrigger value="event" className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Events ({resultCounts.event})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredResults.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">No results found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                ) : (
                  filteredResults.map(result => (
                    <div
                      key={result.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {result.metadata?.avatar ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={result.metadata.avatar}
                              alt={result.title}
                            />
                            <AvatarFallback>
                              {result.title
                                .split(" ")
                                .map(n => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            {getIcon(result.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold hover:text-primary">
                            {result.title}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={getTypeColor(result.type)}
                          >
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          {result.metadata?.author && (
                            <span>By {result.metadata.author}</span>
                          )}
                          {result.metadata?.date && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{result.metadata.date}</span>
                            </div>
                          )}
                          {result.metadata?.status && (
                            <Badge variant="outline" className="text-xs">
                              {result.metadata.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Search Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>
              • Use quotes for exact phrases:{" "}
              <code>&quot;team meeting&quot;</code>
            </p>
            <p>
              • Filter by type: <code>type:user sarah</code> or{" "}
              <code>type:project</code>
            </p>
            <p>
              • Search by date: <code>date:today</code> or{" "}
              <code>date:2024</code>
            </p>
            <p>
              • Combine terms: <code>project frontend react</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
