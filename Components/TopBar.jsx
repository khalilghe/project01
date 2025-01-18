import React, { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Sun, Moon, Settings, LogOut, Bell, User2, ChevronUp } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function TopBar({ user = {} }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const logout = () => {
    Inertia.post('/logout');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">PFE Platform</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-gray-500 dark:text-gray-400"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 dark:text-yellow-400" />
                  {(user?.notifications ?? 0) > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Notifications ({user?.notifications ?? 0})
                </div>
                {(user?.notifications ?? 0) > 0 ? (
                  user?.notificationItems?.map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <a href={item.href} className="w-full">
                        {item.message}
                      </a>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No new notifications
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full  dark:border-gray-100">
                  <img
                    src={user?.profilePhoto || '/placeholder.svg'}
                    alt={user?.name || 'User'}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

