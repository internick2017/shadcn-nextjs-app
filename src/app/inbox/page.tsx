"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Search,
  Archive,
  Trash2,
  Reply,
  Forward,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    subject: "Project Update - Q4 Results",
    preview:
      "Hey there! I wanted to share the latest updates on our Q4 project. The results are looking great...",
    timestamp: "2 hours ago",
    isRead: false,
    isImportant: true,
  },
  {
    id: "2",
    sender: "Alex Chen",
    senderAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    subject: "Meeting Reminder",
    preview:
      "Don't forget about our team meeting tomorrow at 10 AM. We'll be discussing the new features...",
    timestamp: "4 hours ago",
    isRead: false,
    isImportant: false,
  },
  {
    id: "3",
    sender: "Mike Wilson",
    senderAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    subject: "Budget Approval",
    preview:
      "The budget for the new marketing campaign has been approved. We can move forward with...",
    timestamp: "1 day ago",
    isRead: true,
    isImportant: false,
  },
  {
    id: "4",
    sender: "Emma Davis",
    senderAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    subject: "Design Review Feedback",
    preview:
      "I've reviewed the latest design mockups and have some feedback. Overall, they look fantastic...",
    timestamp: "2 days ago",
    isRead: true,
    isImportant: false,
  },
];

export default function InboxPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">
            Manage your messages and notifications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {mockMessages.filter(m => !m.isRead).length} unread
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <CardTitle>Messages</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMessages.map(message => (
                <div key={message.id}>
                  <div
                    className={`flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                      !message.isRead
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={message.senderAvatar}
                        alt={message.sender}
                      />
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p
                            className={`text-sm font-medium ${!message.isRead ? "font-bold" : ""}`}
                          >
                            {message.sender}
                          </p>
                          {message.isImportant && (
                            <Badge variant="destructive" className="text-xs">
                              Important
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {message.timestamp}
                        </p>
                      </div>
                      <p
                        className={`text-sm ${!message.isRead ? "font-semibold" : ""}`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.preview}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Forward className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {message.id !== mockMessages[mockMessages.length - 1].id && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
