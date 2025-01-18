import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

export default function RecentActivity({ activities = [] }) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Bell className="mr-2 h-5 w-5 text-blue-500" />
            Recent Activity
          </h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="mt-2">
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No recent activities</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {activities.map((activity, index) => (
                <li key={index} className="py-4 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 rounded-lg transition-colors duration-150">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

