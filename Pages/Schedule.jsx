import React, { useState } from 'react';
import { BeautifulCalendar } from "@/components/BeautifulCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronRight, Presentation, Users, AlertCircle } from 'lucide-react';
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import { format, isSameDay, addDays } from "date-fns";

export default function Schedule() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Submit project proposal",
      completed: false,
      dueDate: addDays(new Date(), 5),
      type: "deadline",
      description: "Final deadline for submitting the initial project proposal"
    },
    {
      id: 2,
      text: "Meet with supervisor",
      completed: true,
      dueDate: addDays(new Date(), 2),
      type: "meeting",
      description: "Weekly progress review meeting"
    },
    {
      id: 3,
      text: "Literature Review Deadline",
      completed: false,
      dueDate: addDays(new Date(), 10),
      type: "deadline",
      description: "Submit completed literature review chapter"
    },
    {
      id: 4,
      text: "Progress Presentation",
      completed: false,
      dueDate: addDays(new Date(), 7),
      type: "presentation",
      description: "Present current project progress to committee"
    },
    {
      id: 5,
      text: "Final Report Submission",
      completed: false,
      dueDate: addDays(new Date(), 15),
      type: "deadline",
      description: "Submit final project report and documentation"
    },
    {
      id: 6,
      text: "Team Sync",
      completed: false,
      dueDate: addDays(new Date(), 3),
      type: "meeting",
      description: "Sync with development team on implementation"
    }
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [newTaskType, setNewTaskType] = useState("meeting");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false,
        dueDate: newTaskDate,
        type: newTaskType,
        description: newTaskDescription
      }]);
      setNewTask("");
      setNewTaskDescription("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task =>
      isSameDay(new Date(task.dueDate), date)
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDateDialogOpen(true);
  };

  const events = tasks.map(task => ({
    date: new Date(task.dueDate),
    title: task.text,
    type: task.type,
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Schedule</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="lg:sticky lg:top-8 h-fit">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <BeautifulCalendar events={events} onSelectDate={handleDateSelect} />
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Meeting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Presentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-bold text-red-600 dark:text-red-400">Deadline</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Task</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addTask} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="task">Task Title</Label>
                      <Input
                        id="task"
                        type="text"
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taskDescription">Description</Label>
                      <Input
                        id="taskDescription"
                        type="text"
                        placeholder="Add task description"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taskDate">Due Date</Label>
                      <Input
                        id="taskDate"
                        type="date"
                        value={format(newTaskDate, 'yyyy-MM-dd')}
                        onChange={(e) => setNewTaskDate(new Date(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taskType">Type</Label>
                      <Select value={newTaskType} onValueChange={setNewTaskType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meeting">Meeting with Supervisor</SelectItem>
                          <SelectItem value="presentation">Presentation</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Add Task</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <Button variant="ghost" size="sm" className="text-sm text-blue-600 dark:text-blue-400">
                      View all <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {tasks
                      .sort((a, b) => a.dueDate - b.dueDate)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="mb-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id={`task-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() => toggleTask(task.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={`task-${task.id}`}
                                className={`block font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}
                              >
                                {task.text}
                              </Label>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {task.description}
                              </p>
                              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {format(task.dueDate, 'MMM dd, yyyy')}
                                <Badge className={`ml-2 ${
                                  task.type === 'meeting'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    : task.type === 'presentation'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {task.type === 'meeting' ? (
                                    <Users className="h-3 w-3 mr-1 inline-block" />
                                  ) : task.type === 'presentation' ? (
                                    <Presentation className="h-3 w-3 mr-1 inline-block" />
                                  ) : (
                                    <AlertCircle className="h-3 w-3 mr-1 inline-block" />
                                  )}
                                  {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tasks for {format(selectedDate, 'MMMM dd, yyyy')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {getTasksForDate(selectedDate).length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No tasks scheduled for this date
              </p>
            ) : (
              getTasksForDate(selectedDate).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{task.text}</h3>
                    <Badge className={
                      task.type === 'meeting'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : task.type === 'presentation'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }>
                      {task.type === 'meeting' ? (
                        <Users className="h-3 w-3 mr-1 inline-block" />
                      ) : task.type === 'presentation' ? (
                        <Presentation className="h-3 w-3 mr-1 inline-block" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1 inline-block" />
                      )}
                      {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {task.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

