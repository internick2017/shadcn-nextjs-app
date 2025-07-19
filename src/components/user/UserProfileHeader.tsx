import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircle, MoreHorizontal, CheckCircle } from "lucide-react";
import { UserProfileEdit } from "@/components/UserProfileEdit";
import { User } from "@/types/user";

interface UserProfileHeaderProps {
  user: User;
  onSaveProfile: (updatedUser: Partial<User>) => void;
}

export function UserProfileHeader({
  user,
  onSaveProfile,
}: UserProfileHeaderProps) {
  return (
    <>
      {/* Cover Image & Avatar Section */}
      <div className="relative mb-8">
        <div
          className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${user.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="absolute -bottom-16 left-6 md:left-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900 shadow-xl">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {user.name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.status === "active" && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
            )}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send Message</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <UserProfileEdit user={user} onSave={onSaveProfile} />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More Options</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* User Info Section */}
      <div className="ml-6 md:ml-8 pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              {user.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent>Verified User</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
              >
                {user.status}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-1">
              @{user.username}
            </p>
            <p className="text-lg font-medium text-muted-foreground mb-4">
              {user.role} at {user.company}
            </p>
            <p className="text-muted-foreground max-w-2xl">{user.bio}</p>
          </div>

          <div className="flex gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">
                {user.followers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {user.following.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.posts}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
