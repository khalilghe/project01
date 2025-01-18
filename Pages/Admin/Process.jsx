import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import { Lock, Unlock, FileText, Users, GraduationCap, CheckCircle, XCircle, ChevronRight, ChevronLeft, Download, UserPlus, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Inertia } from '@inertiajs/inertia';

export default function ProcessManagement({ auth }) {
  // Remove this line:
  // const navigate = useNavigate();
  const [isAssignmentReviewOpen, setIsAssignmentReviewOpen] = useState(false);
  const [isJuryAssignOpen, setIsJuryAssignOpen] = useState(false);
  const [isGraduationScheduleOpen, setIsGraduationScheduleOpen] = useState(false);

  const handleReviewAssignments = () => {
    setIsAssignmentReviewOpen(true);
  };

  const handleAssignmentReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Student,Teacher,Project,Average Mark\n" +
      "John Doe,Dr. Smith,AI Project,85\n" +
      "Jane Smith,Prof. Johnson,IoT Solution,92\n" +
      "Bob Brown,Dr. Williams,Machine Learning App,78";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assignment_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleJuryAssign = () => {
    setIsJuryAssignOpen(true);
  };

  const handleGraduationSchedule = () => {
    setIsGraduationScheduleOpen(true);
  };

  const handleReviewProposals = () => {
    Inertia.visit('/admin/proposals');
  };

  const handleGenerateProposalReport = () => {
    const excelContent = "data:application/vnd.ms-excel,Title,Description,Field,Type,Proposed By,Status\n" +
      "AI-Powered Healthcare System,Development of an intelligent system for early disease detection,Computer Science,Research,Dr. Smith,Pending\n" +
      "Smart City Traffic Management,Implementation of IoT-based traffic management system,IoT,Industry,TechCorp Inc.,Approved\n" +
      "Renewable Energy Optimization,Machine learning algorithms for optimizing renewable energy distribution,Environmental Engineering,Research,Prof. Johnson,Under Review";
    
    const encodedUri = encodeURI(excelContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "proposal_report.xls");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <TopBar user={auth.user} />
      <div className="flex">
        <Sidebar userType="admin" />
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-700 dark:text-indigo-300">Process Management</CardTitle>
                <CardDescription>Manage different aspects of the PFE process</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="proposals" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-indigo-100 dark:bg-indigo-900/50">
                    <TabsTrigger value="proposals" className="data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800">Proposals</TabsTrigger>
                    <TabsTrigger value="assignments" className="data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800">Assignments</TabsTrigger>
                    <TabsTrigger value="graduation" className="data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-800">Graduation</TabsTrigger>
                  </TabsList>
                  <TabsContent value="proposals">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-indigo-600 dark:text-indigo-400">Proposal Management</CardTitle>
                        <CardDescription>Manage and review submitted proposals</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button onClick={handleReviewProposals} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">Review Proposals</Button>
                          <Button onClick={handleGenerateProposalReport} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">Generate Proposal Report</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="assignments">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-indigo-600 dark:text-indigo-400">Project Assignments</CardTitle>
                        <CardDescription>Manage student-project assignments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">Auto-Assign Projects</Button>
                          <Button onClick={handleReviewAssignments} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">Review Assignments</Button>
                          <Button onClick={handleAssignmentReport} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">Generate Assignment Report</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="graduation">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-indigo-600 dark:text-indigo-400">Graduation Process</CardTitle>
                        <CardDescription>Manage the graduation process for students</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button onClick={handleJuryAssign} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Assign Jury
                          </Button>
                          <Button onClick={handleGraduationSchedule} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors">
                            <Calendar className="mr-2 h-4 w-4" />
                            Graduation Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>

      <Dialog open={isAssignmentReviewOpen} onOpenChange={setIsAssignmentReviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Review Assignments</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Average Mark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>Dr. Smith</TableCell>
                <TableCell>AI Project</TableCell>
                <TableCell>85</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Prof. Johnson</TableCell>
                <TableCell>IoT Solution</TableCell>
                <TableCell>92</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Brown</TableCell>
                <TableCell>Dr. Williams</TableCell>
                <TableCell>Machine Learning App</TableCell>
                <TableCell>78</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog open={isJuryAssignOpen} onOpenChange={setIsJuryAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Jury</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Jury assignment functionality to be implemented here.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isGraduationScheduleOpen} onOpenChange={setIsGraduationScheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Graduation Schedule</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Graduation scheduling functionality to be implemented here.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

