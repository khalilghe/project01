import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';

export default function AuthenticatedLayout({ children, user, title }) {
  // Ensure we have a valid user object with default values if not provided
  const safeUser = user || {
    name: 'Guest',
    role: 'student', // Default role
    profilePhoto: '/placeholder.svg', // Default photo
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head title={title || 'Dashboard'} />
      <TopBar user={safeUser} />
      <div className="flex">
        <Sidebar userType={safeUser.role} />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

