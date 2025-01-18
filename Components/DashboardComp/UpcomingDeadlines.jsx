import React, { useState } from 'react';
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Fake data for upcoming deadlines
const fakeDeadlines = [
  { id: 1, title: 'Project Proposal Submission', description: 'Submit the final project proposal', dueDate: '2024-03-15' },
  { id: 2, title: 'Midterm Presentation', description: 'Present project progress to the committee', dueDate: '2024-04-10' },
  { id: 3, title: 'Literature Review', description: 'Complete the literature review chapter', dueDate: '2024-05-01' },
  { id: 4, title: 'Prototype Demo', description: 'Demonstrate the working prototype', dueDate: '2024-05-20' },
  { id: 5, title: 'Final Report Submission', description: 'Submit the final project report', dueDate: '2024-06-15' },
];

export default function UpcomingDeadlines() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const openCalendar = () => setIsCalendarOpen(true);
  const closeCalendar = () => setIsCalendarOpen(false);

  const getDeadlinesForDate = (date) => {
    return fakeDeadlines.filter(deadline => new Date(deadline.dueDate).toDateString() === date.toDateString());
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const deadlinesForDate = getDeadlinesForDate(date);
      if (deadlinesForDate.length > 0) {
        return <div className="text-red-500 text-xs">•</div>;
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-green-500" />
            Upcoming Deadlines
          </h3>
          <button
            onClick={openCalendar}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            View calendar <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="mt-2">
          {fakeDeadlines.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No upcoming deadlines</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {fakeDeadlines.map((deadline) => (
                <li key={deadline.id} className="py-4 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 rounded-lg transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {deadline.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {deadline.description}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                        {new Date(deadline.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Transition appear show={isCalendarOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCalendar}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
                  >
                    Deadline Calendar
                  </Dialog.Title>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={tileContent}
                    className="w-full dark:bg-gray-700 dark:text-white"
                  />
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      Deadlines for {selectedDate.toDateString()}:
                    </h4>
                    <ul className="space-y-2">
                      {getDeadlinesForDate(selectedDate).map(deadline => (
                        <li key={deadline.id} className="text-sm text-gray-600 dark:text-gray-300">
                          {deadline.title} - {deadline.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
                      onClick={closeCalendar}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

