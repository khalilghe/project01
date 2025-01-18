import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Announcements = ({ announcements }) => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-indigo-900 dark:text-indigo-100">Announcements</CardTitle>
              <CardDescription className="text-indigo-600 dark:text-indigo-400">
                Latest updates and notifications
              </CardDescription>
            </div>
            <Button variant="outline" className="text-white bg-indigo-800 dark:bg-white dark:hover:bg-indigo-500 dark:text-indigo-400">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 rounded-lg bg-white/80 dark:bg-gray-800 border border-gray-100 shadow-md dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
              >
                <div className="flex items-start justify-between ">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-black dark:text-indigo-100">
                        {announcement.title}
                      </h3>
                      {announcement.isNew && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full animate-pulse-slow bg-green-400 dark:bg-indigo-900 text-white dark:text-indigo-400">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {announcement.content}
                    </p>
                  </div>
                  <time className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {announcement.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

