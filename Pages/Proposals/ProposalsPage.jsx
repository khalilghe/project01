"use client"

import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import { Search, ListFilter, ChevronLeft, ChevronRight } from 'lucide-react';
import { PropositionTable } from '@/Components/ProposalsComp/PropositionTable';
import { PreferenceList } from '@/Components/ProposalsComp/PreferenceList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - replace with actual data from your backend
const propositions = [
  {
    id: 1,
    title: "AI-Powered Healthcare System",
    description: "Development of an intelligent system for early disease detection using machine learning algorithms and patient data analysis.",
    field: "Computer Science",
    proposedBy: "Dr. Smith (Faculty)",
    type: "Research",
    requirements: ["Machine Learning", "Python", "Healthcare Domain Knowledge"],
    duration: "6 months",
    maxStudents: 2,
    status: "Open",
  },
  {
    id: 2,
    title: "Smart City Traffic Management",
    description: "Implementation of IoT-based traffic management system for reducing congestion in urban areas.",
    field: "IoT",
    proposedBy: "TechCorp Inc.",
    type: "Industry",
    requirements: ["IoT", "Data Analysis", "Embedded Systems"],
    duration: "8 months",
    maxStudents: 3,
    status: "Open",
  },
  // Add more propositions...
];

export default function ProposalsPage({ auth }) {
  const [preferences, setPreferences] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPreferenceListOpen, setIsPreferenceListOpen] = useState(false);
  const [fieldFilter, setFieldFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredPropositions = propositions.filter(prop =>
    (prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.proposedBy.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (fieldFilter === 'all' || prop.field === fieldFilter) &&
    (typeFilter === 'all' || prop.type === typeFilter)
  );

  const handleAddPreference = (proposition) => {
    if (preferences.length >= 10) {
      alert("You can only select up to 10 preferences");
      return;
    }
    if (!preferences.find(p => p.id === proposition.id)) {
      setPreferences([...preferences, proposition]);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'propositions' && destination.droppableId === 'preferences') {
      const proposition = filteredPropositions[source.index];
      handleAddPreference(proposition);
    } else if (source.droppableId === 'preferences' && destination.droppableId === 'preferences') {
      const newPreferences = Array.from(preferences);
      const [reorderedItem] = newPreferences.splice(source.index, 1);
      newPreferences.splice(destination.index, 0, reorderedItem);
      setPreferences(newPreferences);
    }
  };

  const uniqueFields = [...new Set(propositions.map(prop => prop.field))];
  const uniqueTypes = [...new Set(propositions.map(prop => prop.type))];

  const isStudent = auth.user.role === 'student';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopBar user={auth.user} />
      <div className="flex">
        <Sidebar userType={auth.user.role} />
        <DragDropContext onDragEnd={onDragEnd}>
          <main className="flex-1 overflow-hidden p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">PFE Propositions</h1>
                {isStudent && (
                  <Button 
                    onClick={() => setIsPreferenceListOpen(!isPreferenceListOpen)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isPreferenceListOpen ? (
                      <>
                        <ChevronRight className="mr-2 h-4 w-4" />
                        Hide Preferences
                      </>
                    ) : (
                      <>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Show Preferences
                      </>
                    )}
                    <Badge variant="secondary" className="ml-2 bg-blue-700 text-white">
                      {preferences.length}/10
                    </Badge>
                  </Button>
                )}
              </div>

              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-700 dark:text-gray-200">Search and Filter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="text"
                        placeholder="Search propositions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <Select value={fieldFilter} onValueChange={setFieldFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        {uniqueFields.map(field => (
                          <SelectItem key={field} value={field}>{field}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-8 h-[calc(100vh-300px)]">
                <Card className="bg-white dark:bg-gray-800 flex-1 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-700 dark:text-gray-200">Available Propositions</CardTitle>
                  </CardHeader>
                  <CardContent className="h-full overflow-auto">
                    <Droppable droppableId="propositions">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          <PropositionTable
                            propositions={filteredPropositions}
                            onAddPreference={handleAddPreference}
                            isStudent={isStudent}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>

                <AnimatePresence>
                  {isStudent && isPreferenceListOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "384px", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-96"
                    >
                      <Card className="bg-white dark:bg-gray-800 h-full">
                        <CardHeader>
                          <CardTitle className="text-xl text-gray-700 dark:text-gray-200">
                            Your Preferences
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-80px)] overflow-hidden">
                          <PreferenceList
                            preferences={preferences}
                            setPreferences={setPreferences}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </main>
        </DragDropContext>
      </div>
    </div>
  );
}

