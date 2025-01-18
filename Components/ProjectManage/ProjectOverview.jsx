import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Calendar, User, Clock, CheckCircle2 } from 'lucide-react';

export default function ProjectOverview({ projectData }) {
  const calculateDaysRemaining = () => {
    const endDate = new Date(projectData.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white dark:bg-indigo-950 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">Project Progress</h2>
        <div className="text-2xl font-bold">{projectData.progress}%</div>
        <Progress value={projectData.progress} className="mt-2 bg-indigo-200 dark:bg-indigo-700" indicatorClassName="bg-indigo-600 dark:bg-indigo-400" />
      </div>
      <div className="bg-white dark:bg-indigo-950 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">Project Duration</h2>
        <div className="text-2xl font-bold">{projectData.startDate}</div>
        <p className="text-xs text-muted-foreground">to {projectData.endDate}</p>
      </div>
      <div className="bg-white dark:bg-indigo-950 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">Team Members</h2>
        <div className="text-2xl font-bold">{projectData.team.length}</div>
        <p className="text-xs text-muted-foreground">Active members</p>
      </div>
      <div className="bg-white dark:bg-indigo-950 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">Time Remaining</h2>
        <div className="text-2xl font-bold">{calculateDaysRemaining()} days</div>
        <p className="text-xs text-muted-foreground">Until project deadline</p>
      </div>
    </div>
  );
}

