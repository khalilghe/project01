import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@inertiajs/inertia-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Sidebar from '@/Components/Sidebar';
import TopBar from '@/Components/TopBar';
import { ProposalStatusDialog } from '@/Components/ProposalsComp/ProposalStatusDialog';
import { DeleteConfirmationDialog } from '@/Components/DeleteConfirmationDialog';
import { ClipboardList } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

// Sample data - replace with actual data from your backend


export default function New() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    field: '',
    type: '',
    duration: '',
    maxStudents: '',
    requirements: '',
    additionalNotes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('proposals.store'));
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 text-gray-900 dark:text-gray-100">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">Submit New Proposal</h1>

            </div>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg text-gray-900 dark:text-gray-100">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={e => setData('title', e.target.value)}
                      required
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={e => setData('description', e.target.value)}
                      required
                      rows={4}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="field">Field</Label>
                      <Select onValueChange={value => setData('field', value)} required>
                        <SelectTrigger className="bg-white dark:bg-gray-700">
                          <SelectValue placeholder="Select a field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer_science">Computer Science</SelectItem>
                          <SelectItem value="electrical_engineering">Electrical Engineering</SelectItem>
                          <SelectItem value="mechanical_engineering">Mechanical Engineering</SelectItem>
                          <SelectItem value="civil_engineering">Civil Engineering</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.field && <p className="text-red-500 text-sm mt-1">{errors.field}</p>}
                    </div>

                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select onValueChange={value => setData('type', value)} required>
                        <SelectTrigger className="bg-white dark:bg-gray-700">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration (in months)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={data.duration}
                        onChange={e => setData('duration', e.target.value)}
                        required
                        min="1"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                      {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                    </div>

                    <div>
                      <Label htmlFor="maxStudents">Maximum Number of Students</Label>
                      <Input
                        id="maxStudents"
                        type="number"
                        value={data.maxStudents}
                        onChange={e => setData('maxStudents', e.target.value)}
                        required
                        min="1"
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                      {errors.maxStudents && <p className="text-red-500 text-sm mt-1">{errors.maxStudents}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                    <Input
                      id="requirements"
                      value={data.requirements}
                      onChange={e => setData('requirements', e.target.value)}
                      placeholder="e.g., Python, Machine Learning, Data Analysis"
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={data.additionalNotes}
                      onChange={e => setData('additionalNotes', e.target.value)}
                      rows={3}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    {errors.additionalNotes && <p className="text-red-500 text-sm mt-1">{errors.additionalNotes}</p>}
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-800">
                      Submit Proposal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>


      <ToastContainer />
    </div>
  );
}

