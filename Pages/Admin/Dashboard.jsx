import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import { Announcements } from '@/components/Announcements';
import { Users, Briefcase, FileText, Bell, Megaphone, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockStats = {
  totalProjects: 45,
  activeProjects: 32,
  totalUsers: 150,
  pendingProposals: 8,
};

const mockRecentActivity = [
  { id: 1, action: "New project created", user: "Dr. Jane Smith", time: "2 hours ago" },
  { id: 2, action: "Proposal approved", user: "Prof. John Doe", time: "5 hours ago" },
  { id: 3, action: "New user registered", user: "Alice Cooper", time: "1 day ago" },
];

const mockAnnouncements = [
  {
    id: 1,
    title: "New Semester Registration",
    content: "Registration for the new semester begins next week. Please ensure all documentation is prepared.",
    date: "2024-01-02",
    isNew: true
  },
  {
    id: 2,
    title: "System Maintenance",
    content: "The platform will undergo maintenance this weekend. Please save your work accordingly.",
    date: "2024-01-01",
    isNew: true
  },
  {
    id: 3,
    title: "Updated Project Guidelines",
    content: "New project submission guidelines have been published. Please review them before your next submission.",
    date: "2023-12-28",
    isNew: false
  }
];

export default function AdminDashboard() {
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: '', content: '' });

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the announcement to your backend
    console.log('Announcement submitted:', announcement);
    setIsAnnouncementDialogOpen(false);
    setAnnouncement({ title: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <TopBar />
      <div className="flex">
        <Sidebar userType="admin" />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-fade-in-down">Admin Dashboard</h1>
              <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white animate-pulse-slow">
                    <Megaphone className="mr-2 h-4 w-4" />
                    New Announcement
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-800">
                  <form onSubmit={handleAnnouncementSubmit}>
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-white">Create New Announcement</DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        This announcement will be visible to all users of the platform.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="announcement-title" className="text-right text-gray-700 dark:text-gray-300">
                          Title
                        </Label>
                        <Input
                          id="announcement-title"
                          value={announcement.title}
                          onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                          className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="announcement-content" className="text-right text-gray-700 dark:text-gray-300">
                          Content
                        </Label>
                        <Textarea
                          id="announcement-content"
                          value={announcement.content}
                          onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                          className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Publish Announcement</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Announcements Section */}
            <Announcements announcements={mockAnnouncements} />

            {/* Statistics Cards */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-800 dark:text-red-200">Total Projects</CardTitle>
                  <Briefcase className="h-4 w-4 text-red-600 dark:text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-900 dark:text-red-100">{mockStats.totalProjects}</div>
                  <p className="text-xs text-red-700 dark:text-red-300">
                    {mockStats.activeProjects} active
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-150">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{mockStats.totalUsers}</div>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Students, supervisors, and admins
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Pending Proposals</CardTitle>
                  <FileText className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{mockStats.pendingProposals}</div>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Awaiting review
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-450">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Recent Activity</CardTitle>
                  <Bell className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">{mockRecentActivity.length}</div>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    New actions in the last 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>



            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-750">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Latest actions across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockRecentActivity.map((activity, index) => (
                    <li key={activity.id} className={`flex items-center space-x-4 animate-fade-in-right animation-delay-${(index + 1) * 150}`}>
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 animate-bounce">
                  View All Activity <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

