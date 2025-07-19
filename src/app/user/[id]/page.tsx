"use client";

import { use } from "react";
import { TodoList } from "@/components/TodoList";
import {
  UserProfileHeader,
  UserContactInfo,
  UserContactCard,
  UserSkills,
  UserStats,
  UserTeamMembers,
  UserPerformanceChart,
  UserActivityChart,
  UserRecentActivity,
  UserAchievements,
  UserQuickActions,
} from "@/components/user";
import { User, UserSkill } from "@/types/user";
import { getUserById } from "@/data/users";

// Get user data from centralized data source
const getUserData = (id: string): User | undefined => {
  return getUserById(id);
};

// Helper function to convert skills to UserSkill format
const normalizeSkills = (
  skills: string[] | UserSkill[] | undefined
): UserSkill[] => {
  if (!skills) return [];

  if (skills.length === 0) return [];

  // If it's already UserSkill array, return as is
  if (typeof skills[0] === "object") {
    return skills as UserSkill[];
  }

  // Convert string array to UserSkill array with default values
  return (skills as string[]).map(skill => ({
    name: skill,
    level: "Intermediate" as const,
    color: "#6b7280",
  }));
};

interface UserProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = use(params);
  const user = getUserData(id);

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    // In a real app, this would make an API call to update the user profile
    console.log("Saving profile:", updatedUser);
    // You could also show a success toast here
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">User not found</h1>
        <p className="text-center mt-4">
          The user you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
      <UserProfileHeader user={user} onSaveProfile={handleSaveProfile} />
      <UserContactInfo user={user} />

      {/* Main Content - Two Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <UserSkills skills={normalizeSkills(user.skills)} />
          <UserStats stats={user.stats} />
          <UserTeamMembers />
          <UserContactCard user={user} />
          <UserQuickActions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UserPerformanceChart performanceData={user.performanceData} />
          <UserActivityChart activityTrend={user.activityTrend} />
          <UserRecentActivity recentActivity={user.recentActivity} />
          <UserAchievements achievements={user.achievements} />
          <TodoList />
        </div>
      </div>
    </div>
  );
}
