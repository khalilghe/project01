import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from 'lucide-react';

export default function TaskManagement({ tasks, setProjectData }) {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setProjectData(prevData => ({
        ...prevData,
        tasks: [...prevData.tasks, { id: Date.now(), title: newTask, completed: false }]
      }));
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setProjectData(prevData => ({
      ...prevData,
      tasks: prevData.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const deleteTask = (taskId) => {
    setProjectData(prevData => ({
      ...prevData,
      tasks: prevData.tasks.filter(task => task.id !== taskId)
    }));
  };

  return (
    <div className="bg-white dark:bg-indigo-950 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-4">Task Management</h2>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center space-x-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
              <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
    </div>
  );
}

