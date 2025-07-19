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
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  time: string;
  duration: string;
  location?: string;
  attendees: string[];
  type: "meeting" | "appointment" | "reminder" | "deadline";
  color: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    time: "09:00",
    duration: "30 min",
    location: "Conference Room A",
    attendees: ["Sarah Johnson", "Alex Chen"],
    type: "meeting",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Project Review",
    time: "14:00",
    duration: "1 hour",
    location: "Virtual",
    attendees: ["Mike Wilson", "Emma Davis", "John Doe"],
    type: "meeting",
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Client Call",
    time: "16:30",
    duration: "45 min",
    attendees: ["Sarah Johnson"],
    type: "appointment",
    color: "bg-purple-500",
  },
  {
    id: "4",
    title: "Submit Report",
    time: "17:00",
    duration: "",
    attendees: [],
    type: "deadline",
    color: "bg-red-500",
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "appointment":
        return "bg-purple-100 text-purple-800";
      case "reminder":
        return "bg-yellow-100 text-yellow-800";
      case "deadline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">
            Manage your schedule and events
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Calendar Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Today&apos;s Schedule */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>{todayFormatted}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-1 h-16 rounded-full ${event.color}`} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{event.title}</h4>
                      <Badge
                        variant="secondary"
                        className={getTypeColor(event.type)}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {event.time} {event.duration && `(${event.duration})`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      )}
                    </div>
                    {event.attendees.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {event.attendees
                            .slice(0, 3)
                            .map((attendee, index) => (
                              <Avatar
                                key={index}
                                className="h-6 w-6 border-2 border-background"
                              >
                                <AvatarFallback className="text-xs">
                                  {attendee
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          {event.attendees.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                +{event.attendees.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {event.attendees.slice(0, 2).join(", ")}
                          {event.attendees.length > 2 &&
                            ` and ${event.attendees.length - 2} more`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockEvents.map(event => (
                <div
                  key={`upcoming-${event.id}`}
                  className="p-4 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge
                      variant="outline"
                      className={getTypeColor(event.type)}
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Today, {event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
