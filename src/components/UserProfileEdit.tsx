"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";

interface UserData {
  name: string;
  bio: string;
  location: string;
  company: string;
  role: string;
  email: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  experienceLevel?: string;
  workType?: string;
}

interface UserProfileEditProps {
  user: UserData;
  onSave?: (updatedUser: UserData) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  experienceLevel: z.string().optional(),
  workType: z.string().optional(),
});

export function UserProfileEdit({ user, onSave }: UserProfileEditProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio,
      location: user.location,
      company: user.company,
      role: user.role,
      email: user.email,
      phone: user.phone || "",
      website: user.website || "",
      github: user.github || "",
      linkedin: user.linkedin || "",
      twitter: user.twitter || "",
      experienceLevel: user.experienceLevel || "",
      workType: user.workType || "",
    },
  });

  const handleSaveProfile = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would make an API call to update the user profile
    console.log("Saving profile:", values);
    if (onSave) {
      onSave(values);
    }
    setIsEditOpen(false);
    // You could also show a success toast here
  };

  return (
    <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button variant="secondary" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>Edit Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveProfile)}>
            <ScrollArea className="h-[500px] pr-4">
              <div className="grid gap-4 py-4">
                <div className="text-sm text-muted-foreground mb-4">
                  <p className="font-medium mb-2">Personal Information</p>
                  <p>Update your basic profile information.</p>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Name</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-start gap-4">
                      <FormLabel className="text-right pt-3">Bio</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <textarea
                            {...field}
                            className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about yourself..."
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Role</FormLabel>
                      <div className="col-span-3">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Frontend Developer">
                              Frontend Developer
                            </SelectItem>
                            <SelectItem value="Backend Developer">
                              Backend Developer
                            </SelectItem>
                            <SelectItem value="Full Stack Developer">
                              Full Stack Developer
                            </SelectItem>
                            <SelectItem value="DevOps Engineer">
                              DevOps Engineer
                            </SelectItem>
                            <SelectItem value="Product Manager">
                              Product Manager
                            </SelectItem>
                            <SelectItem value="UI/UX Designer">
                              UI/UX Designer
                            </SelectItem>
                            <SelectItem value="Data Scientist">
                              Data Scientist
                            </SelectItem>
                            <SelectItem value="QA Engineer">
                              QA Engineer
                            </SelectItem>
                            <SelectItem value="Mobile Developer">
                              Mobile Developer
                            </SelectItem>
                            <SelectItem value="Software Architect">
                              Software Architect
                            </SelectItem>
                            <SelectItem value="Tech Lead">Tech Lead</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Company</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Location</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Experience</FormLabel>
                      <div className="col-span-3">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Intern">Intern</SelectItem>
                            <SelectItem value="Junior (0-2 years)">
                              Junior (0-2 years)
                            </SelectItem>
                            <SelectItem value="Mid-level (2-5 years)">
                              Mid-level (2-5 years)
                            </SelectItem>
                            <SelectItem value="Senior (5-8 years)">
                              Senior (5-8 years)
                            </SelectItem>
                            <SelectItem value="Lead (8+ years)">
                              Lead (8+ years)
                            </SelectItem>
                            <SelectItem value="Principal/Staff">
                              Principal/Staff
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workType"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Work Type</FormLabel>
                      <div className="col-span-3">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select work preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <div className="text-sm text-muted-foreground mb-4">
                  <p className="font-medium mb-2">Contact Information</p>
                  <p>Update your contact details.</p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">
                        Email address
                      </FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Phone</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Website</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://yourwebsite.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <div className="text-sm text-muted-foreground mb-4">
                  <p className="font-medium mb-2">Social Links</p>
                  <p>
                    Update your social media profiles to help others connect
                    with you.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">GitHub</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input {...field} placeholder="username" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">LinkedIn</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input {...field} placeholder="username" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Twitter</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input {...field} placeholder="username" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
