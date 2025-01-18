"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import { EmailEditor } from '@/Components/EmailSystem/EmailEditor';
import { UserSelector } from '@/Components/EmailSystem/UserSelector';
import { EmailTemplates } from '@/Components/EmailSystem/EmailTemplates';
import { EmailScheduler } from '@/Components/EmailSystem/EmailScheduler';
import { EmailPreview } from '@/Components/EmailSystem/EmailPreview';
import { Mail, Clock, Users, LayoutTemplateIcon as Template, Send, Save, Eye, History, Settings, AlertCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import 'quill/dist/quill.snow.css';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Sample email templates
const emailTemplates = [
  {
    id: 1,
    name: "Project Deadline Reminder",
    subject: "Important: Upcoming Project Deadline",
    content: "Dear [Student Name],\n\nThis is a reminder that your project deadline is approaching...",
  },
  {
    id: 2,
    name: "Meeting Schedule",
    subject: "PFE Meeting Schedule",
    content: "Dear [Recipient],\n\nYour PFE meeting has been scheduled for...",
  },
  {
    id: 3,
    name: "Document Submission",
    subject: "Required: Document Submission",
    content: "Dear [Student Name],\n\nPlease submit the following documents...",
  },
];


export default function EmailSystem() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailContent, setEmailContent] = useState({
    subject: '',
    content: '',
    recipients: [],
    scheduledFor: null
  });
  const [isScheduled, setIsScheduled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaveTemplateDialogOpen, setIsSaveTemplateDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  const handleSaveTemplate = () => {
    if (newTemplateName.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a name for the template.",
        variant: "destructive",
      });
      return;
    }

    const newTemplate = {
      id: emailTemplates.length + 1,
      name: newTemplateName,
      subject: emailContent.subject,
      content: emailContent.content,
    };

    // In a real application, you would typically make an API call to save the template
    // For now, we'll just add it to the existing templates array
    emailTemplates.push(newTemplate);

    setNewTemplateName('');
    setIsSaveTemplateDialogOpen(false);

    toast({
      title: "Template Saved",
      description: "Your email template has been saved successfully.",
      variant: "default",
    });
  };

  const handleSend = async (scheduled = false) => {
    try {
      // Here you would typically make an API call to send the email
      toast({
        title: scheduled ? "Email Scheduled" : "Email Sent",
        description: scheduled 
          ? "Your email has been scheduled and will be sent at the specified time." 
          : "Your email has been sent successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEmailContent(prev => ({
      ...prev,
      subject: template.subject,
      content: template.content
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <TopBar />
      <div className="flex">
        <Sidebar userType="admin" />
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email System</h1>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsSaveTemplateDialogOpen(true)}
                  className="bg-white dark:bg-gray-800"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Template
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(true)}
                  className="bg-white dark:bg-gray-800"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  onClick={() => handleSend(isScheduled)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isScheduled ? 'Schedule' : 'Send Now'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-3">
              {/* Main Email Composition Area */}
              <div className="space-y-8">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Compose Email</CardTitle>
                    <CardDescription>Write your email and select recipients</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={emailContent.subject}
                          onChange={(e) => setEmailContent(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Enter email subject"
                          className="mt-1"
                        />
                      </div>
                      <EmailEditor
                        content={emailContent.content}
                        onChange={(content) => setEmailContent(prev => ({ ...prev, content }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recipients</CardTitle>
                    <CardDescription>Select users to receive this email</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserSelector
                      selectedUsers={emailContent.recipients}
                      onSelectionChange={(recipients) => setEmailContent(prev => ({ ...prev, recipients }))}
                    />
                  </CardContent>
                </Card>
              </div>
              </div>

              {/* Sidebar Options */}
              <div className="space-y-8">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Email Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Schedule Email</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Send at a specific time</p>
                      </div>
                      <Switch
                        checked={isScheduled}
                        onCheckedChange={setIsScheduled}
                      />
                    </div>
                    {isScheduled && (
                      <EmailScheduler
                        onSchedule={(date) => setEmailContent(prev => ({ ...prev, scheduledFor: date }))}
                      />
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Use pre-defined templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmailTemplates
                      templates={emailTemplates}
                      onSelect={handleTemplateSelect}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <EmailPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        email={emailContent}
      />
      <Dialog open={isSaveTemplateDialogOpen} onOpenChange={setIsSaveTemplateDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Save as Template</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
              Enter a name for your new email template.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-name" className="text-right text-gray-700 dark:text-gray-300">
                Name
              </Label>
              <Input
                id="template-name"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                className="col-span-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsSaveTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveTemplate}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

