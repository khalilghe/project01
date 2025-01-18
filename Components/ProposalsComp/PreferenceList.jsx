import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical, X, Save } from 'lucide-react';

export function PreferenceList({ preferences, setPreferences }) {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-grow">
        <Droppable droppableId="preferences">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 p-2">
              {preferences.map((pref, index) => (
                <Draggable key={pref.id} draggableId={pref.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center space-x-2 ${
                        snapshot.isDragging ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                      }`}
                    >
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="text-gray-400" size={20} />
                      </div>
                      <span className="flex-1 font-medium text-gray-700 dark:text-gray-200 text-sm truncate">
                        {index + 1}. {pref.title}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900"
                        onClick={() => {
                          const newPreferences = preferences.filter((_, i) => i !== index);
                          setPreferences(newPreferences);
                        }}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ScrollArea>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

