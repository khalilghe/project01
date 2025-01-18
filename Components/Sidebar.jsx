import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { LayoutDashboard, FileText, Calendar,Mail, Briefcase, PlusCircle, Users, Settings, Waypoints } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = {
  admin: [
    { name: 'Dashboard', icon: LayoutDashboard, route: 'admin.dashboard' },
    { name: 'Users', icon: Users, route: 'admin.users' },
    { name: 'Proposals', icon: FileText, route: 'admin.proposals' },
    { name: 'Process Management', icon: Waypoints, route: 'admin.process' },
    { name: 'Mailing', icon: Mail, route: 'admin.mail' },
  ],
  student: [
    { name: 'Dashboard', icon: LayoutDashboard, route: 'student.dashboard' },
    { name: 'Proposals', icon: FileText, route: 'proposals.page' },
    { name: 'New Proposal', icon: PlusCircle, route: 'proposals.new' },
    { name: 'Schedule', icon: Calendar, route: 'schedule' },
    { name: 'Project', icon: Briefcase, route: 'ProjectPage' },
  ],
  teacher: [
    { name: 'Dashboard', icon: LayoutDashboard, route: 'teacher.dashboard' },
    { name: 'Proposals', icon: FileText, route: 'proposals.page' },
    { name: 'New Proposal', icon: PlusCircle, route: 'proposals.new' },
    { name: 'Schedule', icon: Calendar, route: 'schedule' },
    { name: 'Project', icon: Briefcase, route: 'ProjectPage' },
  ],
  company: [
    { name: 'Dashboard', icon: LayoutDashboard, route: 'company.dashboard' },
    { name: 'Proposals', icon: FileText, route: 'proposals.page' },
    { name: 'New Proposal', icon: PlusCircle, route: 'proposals.new' },
    { name: 'Schedule', icon: Calendar, route: 'schedule' },
    { name: 'Project', icon: Briefcase, route: 'ProjectPage' },
  ]
};

export default function Sidebar({ userType = 'student' }) {
  const items = menuItems[userType] || [];

  return (
    <div className=" space-y-3 ml-6 mt-8 rounded-md w-64 h-fit flex flex-col overflow-hidden ">
      {/* Header Section */}
      <div className="bg-indigo-600 rounded-md shadow-lg text-white p-4 flex flex-col items-center">
        <Avatar className="w-16 h-16 mb-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">Welcome, User!</h2>
        <p className="text-sm text-gray-200">Role: {userType}</p>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 bg-white dark:bg-slate-600 dark:text-gray-100 rounded-md shadow-lg overflow-y-auto mt-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                href={route(item.route)}
                className="flex items-center space-x-3 p-3 rounded-lg mx-2 hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-300"
              >
                <item.icon className="h-5 w-5 text-indigo-600 dark:text-white" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 bg-indigo-800 rounded-md shadow-lg  mt-auto">
        <Link

          className="flex  items-center space-x-2 text-white font-bold hover:text-indigo-600 transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
