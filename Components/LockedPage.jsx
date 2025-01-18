import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LockedPage = ({ reason, onBackClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <Lock className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          This Page is Locked
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {reason}
        </p>
        {onBackClick && (
          <Button 
            onClick={onBackClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Go Back
          </Button>
        )}
      </div>
    </div>
  );
};

export default LockedPage;

