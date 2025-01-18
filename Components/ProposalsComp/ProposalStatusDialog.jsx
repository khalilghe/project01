import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, User, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  refused: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function ProposalStatusDialog({ isOpen, onClose, proposals, onDelete }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>My Proposals Status</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] mt-4">
          <div className="space-y-4">
            {proposals.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No proposals submitted yet
              </p>
            ) : (
              proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {proposal.title}
                    </h3>
                    <Badge className={statusStyles[proposal.status]}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <User className="mr-2 h-4 w-4" />
                      {proposal.supervisor}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Submitted on {proposal.submittedDate}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(proposal.id)}
                      className="flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

