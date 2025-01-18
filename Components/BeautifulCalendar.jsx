import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameDay } from "date-fns";

export function BeautifulCalendar({ events, onSelectDate }) {
  return (
    <Calendar
      mode="single"
      onDayClick={onSelectDate}
      className="rounded-md border shadow-lg p-4 bg-white dark:bg-gray-800"
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground font-bold",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        DayContent: ({ date, ...props }) => {
          const eventsForDay = events.filter(event => isSameDay(new Date(event.date), date));
          const hasDeadline = eventsForDay.some(event => event.type === 'deadline');

          return (
            <div
              className={cn(
                "relative w-full h-full flex items-center justify-center rounded-full transition-colors",
                hasDeadline && "bg-red-100 dark:bg-red-900/30"
              )}
            >
              <div {...props} />
              {eventsForDay.length > 0 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  {eventsForDay.map((event, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        event.type === 'meeting' && "bg-blue-500",
                        event.type === 'presentation' && "bg-purple-500",
                        event.type === 'deadline' && "bg-red-500"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        },
      }}
    />
  );
}

