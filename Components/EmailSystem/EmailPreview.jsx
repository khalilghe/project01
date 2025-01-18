import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function EmailPreview({ isOpen, onClose, email }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
          <DialogDescription>Preview how your email will look to recipients</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Subject</h3>
              {email.scheduledFor && (
                <Badge variant="outline">
                  Scheduled for: {email.scheduledFor.toLocaleString()}
                </Badge>
              )}
            </div>
            <p className="text-lg">{email.subject}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Recipients ({email.recipients.length})</h3>
            <div className="flex flex-wrap gap-2">
              {email.recipients.map(recipient => (
                <Badge key={recipient.id} variant="secondary">
                  {recipient.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Content</h3>
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: email.content }}
              />
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

