"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DataTable,
  SelectColumn,
  ActionsColumn,
  SortableHeader,
} from "@/components/ui/data-table";
import {
  MapPin,
  Calendar,
  Mail,
  Building,
  Star,
  Users,
  MessageCircle,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { UserSummary } from "@/types/user";
import { userSummaries } from "@/data/users";

// Re-export User type for backward compatibility
export type User = UserSummary;

// Define columns for the users table
const columns: ColumnDef<User>[] = [
  SelectColumn,
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>User</SortableHeader>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map(n => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <Link href={`/user/${user.id}`}>
                <span className="font-medium hover:underline">{user.name}</span>
              </Link>
              {user.verified && (
                <CheckCircle className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              @{user.username}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader column={column}>Email</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <SortableHeader column={column}>Role</SortableHeader>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <div className="font-medium">{user.role}</div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Building className="h-3 w-3 mr-1" />
            {user.company}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("location")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "active"
              ? "default"
              : status === "inactive"
                ? "secondary"
                : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "followers",
    header: ({ column }) => (
      <SortableHeader column={column}>Followers</SortableHeader>
    ),
    cell: ({ row }) => {
      const followers = row.getValue("followers") as number;
      return (
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{followers.toLocaleString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "joinDate",
    header: ({ column }) => (
      <SortableHeader column={column}>Join Date</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"));
      return (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{date.toLocaleDateString()}</span>
        </div>
      );
    },
  },
  ActionsColumn([
    {
      label: "View Profile",
      onClick: (user: User) => {
        window.location.href = `/user/${user.id}`;
      },
    },
    {
      label: "Send Message",
      onClick: (user: User) => {
        console.log("Send message to", user.name);
      },
    },
    {
      label: "Edit User",
      onClick: (user: User) => {
        console.log("Edit user", user.name);
      },
    },
    {
      label: "Delete User",
      onClick: (user: User) => {
        console.log("Delete user", user.name);
      },
    },
  ]),
];

export default function UsersPage() {
  const [users] = useState<User[]>(userSummaries);

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Users Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and view all users in your organization
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (users.filter(u => u.status === "active").length /
                    users.length) *
                    100
                )}
                % of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Verified Users
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.verified).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (users.filter(u => u.verified).length / users.length) * 100
                )}
                % verified
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Followers
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  users.reduce((acc, u) => acc + u.followers, 0) / users.length
                ).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Per user average</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              A list of all users with their details and management options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={users}
              searchKey="name"
              searchPlaceholder="Search users..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
