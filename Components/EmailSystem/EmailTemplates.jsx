import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LayoutTemplateIcon as Template } from 'lucide-react';

export function EmailTemplates({ templates, onSelect }) {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {template.subject}
                </p>
              </div>
              <Template className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

