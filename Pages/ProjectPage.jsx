import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Calendar, User, Clock, CheckCircle2, Circle, LinkIcon, Plus, ArrowRight, GitBranch, FileText, Database, ChevronDown, ChevronRight, UserPlus } from 'lucide-react';
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import { toast } from "@/components/ui/use-toast";

// Initial project data
const initialProjectData = {
  title: "AI-Powered Healthcare System",
  description: "Developing an AI system for early disease detection using machine learning algorithms and patient data analysis.",
  supervisor: "Dr. Jane Smith",
  coSupervisor: null,
  company: null,
  startDate: "2023-09-01",
  endDate: "2024-06-30",
  status: "In Progress",
  teamMembers: [
    { id: 1, name: "John Doe", role: "Student", email: "john@university.edu" },
  ],
  checkpoints: [
    {
      id: 1,
      title: "Project Initialization",
      percentage: 20,
      tasks: [
        { id: 1, title: "Literature Review", status: "Completed", description: "Review of existing healthcare AI systems" },
        { id: 2, title: "Project Proposal", status: "Completed", description: "Submit and get approval for project proposal" },
      ]
    },
    {
      id: 2,
      title: "Data Collection & Analysis",
      percentage: 30,
      tasks: [
        { id: 3, title: "Data Collection", status: "In Progress", description: "Gathering medical datasets" },
        { id: 4, title: "Data Preprocessing", status: "Not Started", description: "Cleaning and preparing the data" },
        { id: 5, title: "Initial Analysis", status: "Not Started", description: "Preliminary data analysis" },
      ]
    },
    {
      id: 3,
      title: "Implementation",
      percentage: 35,
      tasks: [
        { id: 6, title: "Model Development", status: "Not Started", description: "Implementing ML models" },
        { id: 7, title: "Testing", status: "Not Started", description: "Testing the system" },
        { id: 8, title: "Validation", status: "Not Started", description: "Validating results" },
      ]
    },
    {
      id: 4,
      title: "Documentation & Submission",
      percentage: 15,
      tasks: [
        { id: 9, title: "Final Report", status: "Not Started", description: "Writing the final report" },
        { id: 10, title: "Documentation", status: "Not Started", description: "System documentation" },
      ]
    }
  ],
  links: [
    { id: 1, title: "Project Repository", url: "https://github.com/example/ai-healthcare", icon: GitBranch },
    { id: 2, title: "Research Paper", url: "https://example.com/research-paper.pdf", icon: FileText },
    { id: 3, title: "Dataset", url: "https://example.com/healthcare-dataset", icon: Database },
  ],
};

const statusColors = {
  "Completed": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Not Started": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
};

const StatusIcon = ({ status }) => {
  if (status === "Completed") return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />;
  if (status === "In Progress") return <Circle className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
  return <Circle className="w-4 h-4 text-gray-400" />;
};

const CheckpointProgress = ({ checkpoint }) => {
  const completedTasks = checkpoint.tasks.filter(task => task.status === "Completed").length;
  const progress = (completedTasks / checkpoint.tasks.length) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">Progress</span>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-1" />
    </div>
  );
};

export default function ProjectPage({ user, isAdmin }) {
  const [projectData, setProjectData] = useState(initialProjectData);
  const [isLocked, setIsLocked] = useState(true);
  const [pageState, setPageState] = useState('teamFormation'); // 'teamFormation' or 'projectWork'
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberId, setNewMemberId] = useState('');
  const [expandedCheckpoints, setExpandedCheckpoints] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [newCheckpoint, setNewCheckpoint] = useState({ title: '', percentage: 0 });
  const [newTask, setNewTask] = useState({ title: '', description: '', checkpointId: null });
  const [isNewCheckpointDialogOpen, setIsNewCheckpointDialogOpen] = useState(false);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch the project data and page state from the server here
    calculateOverallProgress();
    if (isAdmin) {
      setIsLocked(false);
    }
  }, [projectData, isAdmin]);

  const calculateOverallProgress = () => {
    const progress = projectData.checkpoints.reduce((acc, checkpoint) => {
      const completedTasks = checkpoint.tasks.filter(task => task.status === "Completed").length;
      const checkpointProgress = (completedTasks / checkpoint.tasks.length) * checkpoint.percentage;
      return acc + checkpointProgress;
    }, 0);
    setOverallProgress(progress);
  };

  const toggleCheckpoint = (checkpointId) => {
    setExpandedCheckpoints(prev => ({
      ...prev,
      [checkpointId]: !prev[checkpointId]
    }));
  };

  const toggleTaskStatus = (checkpointId, taskId) => {
    setProjectData(prevData => {
      const newCheckpoints = prevData.checkpoints.map(checkpoint => {
        if (checkpoint.id === checkpointId) {
          const newTasks = checkpoint.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, status: task.status === "Completed" ? "Not Started" : "Completed" };
            }
            return task;
          });
          return { ...checkpoint, tasks: newTasks };
        }
        return checkpoint;
      });
      return { ...prevData, checkpoints: newCheckpoints };
    });
  };

  const addNewCheckpoint = () => {
    if (newCheckpoint.title && newCheckpoint.percentage > 0) {
      const remainingPercentage = 100 - newCheckpoint.percentage;
      const adjustmentFactor = remainingPercentage / 100;

      setProjectData(prevData => {
        const adjustedCheckpoints = prevData.checkpoints.map(checkpoint => ({
          ...checkpoint,
          percentage: Math.round(checkpoint.percentage * adjustmentFactor)
        }));

        return {
          ...prevData,
          checkpoints: [
            ...adjustedCheckpoints,
            {
              id: Date.now(),
              title: newCheckpoint.title,
              percentage: parseInt(newCheckpoint.percentage),
              tasks: []
            }
          ]
        };
      });

      setNewCheckpoint({ title: '', percentage: 0 });
      setIsNewCheckpointDialogOpen(false);
    }
  };

  const addNewTask = () => {
    if (newTask.title && newTask.checkpointId) {
      setProjectData(prevData => {
        const newCheckpoints = prevData.checkpoints.map(checkpoint => {
          if (checkpoint.id === newTask.checkpointId) {
            return {
              ...checkpoint,
              tasks: [
                ...checkpoint.tasks,
                {
                  id: Date.now(),
                  title: newTask.title,
                  description: newTask.description,
                  status: "Not Started"
                }
              ]
            };
          }
          return checkpoint;
        });
        return { ...prevData, checkpoints: newCheckpoints };
      });

      setNewTask({ title: '', description: '', checkpointId: null });
      setIsNewTaskDialogOpen(false);
    }
  };

  const handleAddMember = () => {
    // In a real application, you would make an API call to add the member
    if (newMemberId && projectData.teamMembers.length < 2) {
      const newMember = { id: Date.now(), name: `Student ${newMemberId}`, role: "Student", email: `student${newMemberId}@university.edu` };
      setProjectData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, newMember]
      }));
      setNewMemberId('');
      setIsAddingMember(false);
      toast({
        title: "Team Member Added",
        description: `${newMember.name} has been added to the project team.`,
      });
    }
  };

  const handlePageStateChange = (newState) => {
    setPageState(newState);
    setIsLocked(newState === 'teamFormation' && !isAdmin);
    toast({
      title: "Project State Changed",
      description: `Project state has been changed to ${newState === 'teamFormation' ? 'Team Formation' : 'Project Work'}.`,
    });
  };

  if (isLocked && pageState === 'teamFormation' && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl text-center max-w-md mx-auto">
          <Lock className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Project Page Locked</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project is in the team formation phase. You can view and edit team members, but other sections are locked.
          </p>
          <Button 
            onClick={() => router.visit(route('dashboard'))}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {isAdmin && (
              <div className="mb-6 flex justify-end">
                <Button
                  onClick={() => handlePageStateChange(pageState === 'teamFormation' ? 'projectWork' : 'teamFormation')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {pageState === 'teamFormation' ? 'Start Project Work' : 'Return to Team Formation'}
                </Button>
              </div>
            )}
            
            <Card className="mb-8 overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{projectData.title}</CardTitle>
                    <CardDescription className="mt-2">{projectData.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                    {projectData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4 mr-2" />
                      <Label>Supervisor</Label>
                    </div>
                    <p className="text-sm font-medium">{projectData.supervisor}</p>
                  </div>
                  {projectData.coSupervisor && (
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <User className="w-4 h-4 mr-2" />
                        <Label>Co-Supervisor</Label>
                      </div>
                      <p className="text-sm font-medium">{projectData.coSupervisor}</p>
                    </div>
                  )}
                  {projectData.company && (
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <User className="w-4 h-4 mr-2" />
                        <Label>Company</Label>
                      </div>
                      <p className="text-sm font-medium">{projectData.company}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <Label>Timeline</Label>
                    </div>
                    <p className="text-sm font-medium">
                      {projectData.startDate} - {projectData.endDate}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Team Members</span>
                    {projectData.teamMembers.length < 2 && pageState === 'teamFormation' && (
                      <Button
                        size="sm"
                        onClick={() => setIsAddingMember(true)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {projectData.teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                        <Avatar>
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {pageState === 'projectWork' && (
              <>
                <div className="space-y-4 mb-8">
                  {projectData.checkpoints.map((checkpoint) => {
                    const isCompleted = checkpoint.tasks.every(task => task.status === "Completed");
                    return (
                      <Card 
                        key={checkpoint.id} 
                        className={`border-0 shadow-md ${isCompleted ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'}`}
                      >
                        <CardHeader className="cursor-pointer" onClick={() => toggleCheckpoint(checkpoint.id)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {expandedCheckpoints[checkpoint.id] ? (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-500" />
                              )}
                              <div>
                                <CardTitle className="text-lg">
                                  {checkpoint.title}
                                  <Badge className="ml-2 bg-gray-100 text-gray-700">
                                    {checkpoint.percentage}% of project
                                  </Badge>
                                </CardTitle>
                              </div>
                            </div>
                            <CheckpointProgress checkpoint={checkpoint} />
                          </div>
                        </CardHeader>
                        {expandedCheckpoints[checkpoint.id] && (
                          <CardContent>
                            <div className="space-y-3">
                              {checkpoint.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                  <Checkbox
                                    checked={task.status === "Completed"}
                                    onCheckedChange={() => toggleTaskStatus(checkpoint.id, task.id)}
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-medium">{task.title}</h3>
                                      <Badge className={statusColors[task.status]}>
                                        {task.status}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      {task.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>

                {/* Resources Section */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Project Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {projectData.links.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                              <link.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <span className="font-medium">{link.title}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              Open <ArrowRight className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Dialog for adding a new team member */}
      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberId" className="text-right">
                Student ID
              </Label>
              <Input
                id="memberId"
                value={newMemberId}
                onChange={(e) => setNewMemberId(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleAddMember}>Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isNewCheckpointDialogOpen} onOpenChange={setIsNewCheckpointDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" /> New Checkpoint
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Checkpoint</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="checkpointTitle">Checkpoint Title</Label>
                        <Input
                          id="checkpointTitle"
                          value={newCheckpoint.title}
                          onChange={(e) => setNewCheckpoint({ ...newCheckpoint, title: e.target.value })}
                          placeholder="Enter checkpoint title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkpointPercentage">Percentage</Label>
                        <Input
                          id="checkpointPercentage"
                          type="number"
                          min="1"
                          max="100"
                          value={newCheckpoint.percentage}
                          onChange={(e) => setNewCheckpoint({ ...newCheckpoint, percentage: e.target.value })}
                          placeholder="Enter percentage"
                        />
                      </div>
                      <Button onClick={addNewCheckpoint}>Add Checkpoint</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" /> New Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="taskTitle">Task Title</Label>
                        <Input
                          id="taskTitle"
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          placeholder="Enter task title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="taskDescription">Description</Label>
                        <Input
                          id="taskDescription"
                          value={newTask.description}
                          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          placeholder="Enter task description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="taskCheckpoint">Checkpoint</Label>
                        <select
                          id="taskCheckpoint"
                          value={newTask.checkpointId || ''}
                          onChange={(e) => setNewTask({ ...newTask, checkpointId: parseInt(e.target.value) })}
                          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700"
                        >
                          <option value="">Select a checkpoint</option>
                          {projectData.checkpoints.map(checkpoint => (
                            <option key={checkpoint.id} value={checkpoint.id}>{checkpoint.title}</option>
                          ))}
                        </select>
                      </div>
                      <Button onClick={addNewTask}>Add Task</Button>
                    </div>
                  </DialogContent>
                </Dialog>
    </div>
  );
}

