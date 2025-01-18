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
import { Users, Briefcase, FileText, Bell, Megaphone, Plus, ArrowRight, GraduationCap, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockStats = {
  activeProjects: 5,
  totalStudents: 15,
  pendingProposals: 3,
  upcomingPresentations: 2,
};

const mockRecentActivity = [
  { id: 1, action: "New proposal submitted", student: "Alice Johnson", time: "2 hours ago" },
  { id: 2, action: "Project milestone completed", student: "Bob Smith", time: "5 hours ago" },
  { id: 3, action: "Feedback requested", student: "Charlie Brown", time: "1 day ago" },
];

const mockAnnouncements = [
  { 
    id: 1, 
    title: "Upcoming Project Presentations", 
    content: "Project presentations for this semester are scheduled for next month. Please ensure your students are prepared.",
    date: "2024-01-02",
    isNew: true
  },
  { 
    id: 2, 
    title: "New Collaboration Opportunity", 
    content: "A new industry partner is looking for project collaborations. Interested supervisors should contact the department.",
    date: "2024-01-01",
    isNew: true
  },
  { 
    id: 3, 
    title: "Reminder: Mid-semester Evaluations", 
    content: "Don't forget to submit your mid-semester project evaluations by the end of this week.",
    date: "2023-12-28",
    isNew: false
  }
];

export default function TeacherDashboard() {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-200">
      <TopBar />
      <div className="flex">
        <Sidebar userType="teacher" />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <motion.h1 
                className="text-3xl font-bold text-indigo-900 dark:text-indigo-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Teacher Dashboard
              </motion.h1>
              
            </div>

            {/* Announcements Section */}
            <Announcements announcements={mockAnnouncements} />

            {/* Statistics Cards */}
            <motion.div 
              className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Active Projects</CardTitle>
                  <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{mockStats.activeProjects}</div>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Projects under supervision
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-150">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">{mockStats.totalStudents}</div>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Students under supervision
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700 transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-450">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">Upcoming Presentations</CardTitle>
                  <GraduationCap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{mockStats.upcomingPresentations}</div>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    Scheduled in the next 7 days
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button className="w-full justify-start bg-indigo-500 hover:bg-indigo-600 text-white transform hover:scale-105 transition-all duration-300">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Proposal
                  </Button>
                  <Button className="w-full justify-start bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-all duration-300">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Review Student Progress
                  </Button>
                  <Button className="w-full justify-start bg-yellow-500 hover:bg-yellow-600 text-white transform hover:scale-105 transition-all duration-300">
                    <FileText className="mr-2 h-4 w-4" />
                    Submit Evaluation
                  </Button>
                  <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600 text-white transform hover:scale-105 transition-all duration-300">
                    <Bell className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Latest actions from your students</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {mockRecentActivity.map((activity, index) => (
                      <motion.li 
                        key={activity.id} 
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                          <Bell className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">by {activity.student}</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button variant="link" className="mt-4 w-full text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 animate-bounce">
                    View All Activity <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

