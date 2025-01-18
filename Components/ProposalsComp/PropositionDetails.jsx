import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PropositionDetails({ proposition, onClose, onAddPreference }) {
  if (!proposition) return null;

  return (
    <Dialog open={!!proposition} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">{proposition.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-gray-600 dark:text-gray-400">{proposition.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Field</h4>
              <p className="text-gray-600 dark:text-gray-400">{proposition.field}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Type</h4>
              <p className="text-gray-600 dark:text-gray-400">{proposition.type}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Proposed By</h4>
              <p className="text-gray-600 dark:text-gray-400">{proposition.proposedBy}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Duration</h4>
              <p className="text-gray-600 dark:text-gray-400">{proposition.duration}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Max Students</h4>
              <p className="text-gray-600 dark:text-gray-400">{proposition.maxStudents}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Status</h4>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {proposition.status}
              </Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Requirements</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              {proposition.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
        {onAddPreference && (
          <div className="mt-6 flex justify-end">
            <Button onClick={() => onAddPreference(proposition)}>
              Add to Preferences
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

