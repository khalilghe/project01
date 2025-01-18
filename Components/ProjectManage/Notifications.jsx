import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';

const notificationsData = [
  { id: 1, message: "New task added: Data preprocessing", time: "2 hours ago" },
  { id: 2, message: "Checkpoint 'Data Collection' completed", time: "1 day ago" },
  { id: 3, message: "Team meeting scheduled for tomorrow", time: "2 days ago" },
];

export default function Notifications() {
  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notificationsData.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-4">
              <Bell className="w-5 h-5 mt-1 text-blue-500" />
              <div>
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

