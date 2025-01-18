import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import RecentActivity from '@/Components/DashboardComp/RecentActivity';
import UpcomingDeadlines from '@/Components/DashboardComp/UpcomingDeadlines';
import ProjectViewModal from '@/Components/ProjectViewModal';
import SummaryCard from '@/Components/DashboardComp/SummaryCard';
import { Book, Calendar, FileText, Users, BookOpen, ChevronRight } from 'lucide-react';

function QuickActions({ onContactSupervisor, onViewProject }) {
  const actions = [
    {
      title: 'Submit Proposal',
      icon: FileText,
      color: 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200',
      onClick: () => window.location.href = route('proposals.new')
    },
    {
      title: 'View Projects',
      icon: BookOpen,
      color: 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-200',
      onClick: onViewProject
    },
    {
      title: 'Contact Supervisor',
      icon: Users,
      color: 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200',
      onClick: onContactSupervisor
    },
  ];

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              onClick={action.onClick}
              className={`flex flex-col items-center p-4 rounded-lg ${action.color} transition-colors duration-150 transform hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <action.icon className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">{action.title}</span>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard({ auth, stats, activities, deadlines }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const user = auth?.user || {};
  const dashboardStats = stats || {
    currentProjects: 0,
    upcomingDeadlines: 0,
    pendingProposals: 0
  };

  // Sample project data - replace with actual data from your backend
  const sampleProject = {
    title: "AI-Powered Healthcare System",
    beginDate: "2024-01-01",
    endDate: "2024-06-30",
    supervisor: "Dr. Jane Doe",
    speciality: "Computer Science",
    type: "research",
    progress: 35,
    description: "Development of an AI-powered healthcare system for early disease detection using machine learning algorithms and patient data analysis."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <TopBar user={user} />
      <div className="flex">
        <Sidebar userType="student" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
                Welcome back, {user.name || 'Student'}!
              </h1>
              <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">
                Here's what's happening with your projects today.
              </p>
            </motion.div>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <QuickActions
                onContactSupervisor={() => setIsContactModalOpen(true)}
                onViewProject={() => setIsProjectModalOpen(true)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentActivity activities={activities || []} />
                </CardContent>
              </Card>
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <UpcomingDeadlines deadlines={deadlines || []} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      <ProjectViewModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={sampleProject}
      />
    </div>
  );
}

