import React from 'react';

export default function SummaryCard({ title, value, icon, color, trend }) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg transition-all duration-200 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${color} rounded-xl p-4`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {value || 0}
                </div>
                {trend && (
                  <span className="ml-2 text-sm font-medium text-green-600">
                    {trend}
                  </span>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

