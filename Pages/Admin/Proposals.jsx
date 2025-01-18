"use client"

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Draggable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from 'lucide-react';
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';

const initialPropositions = [
  // ... (Your initial propositions data here)
];


function PendingProposalsPopup({ isOpen, onClose, pendingPropositions, onStatusChange, onProposalClick }) {
  // ... (Your PendingProposalsPopup component here)
}

function ProposalDetailsDialog({ proposal, isOpen, onClose, onStatusChange }) {
  // ... (Your ProposalDetailsDialog component here)
}

function PropositionTable({ propositions, onAddPreference, isStudent }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Field</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Proposed By</TableHead>
          <TableHead>Status</TableHead>
          {isStudent && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {propositions.map((proposition, index) => (
          <Draggable key={proposition.id} draggableId={proposition.id.toString()} index={index}>
            {(provided, snapshot) => (
              <TableRow
                ref={provided.innerRef}
                {...provided.draggableProps}
                className={`${snapshot.isDragging ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              >
                <TableCell {...provided.dragHandleProps}>{proposition.title}</TableCell>
                <TableCell>{proposition.field}</TableCell>
                <TableCell>{proposition.type}</TableCell>
                <TableCell>{proposition.proposedBy}</TableCell>
                <TableCell>
                  <Badge className={
                    proposition.status === 'Open'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }>
                    {proposition.status}
                  </Badge>
                </TableCell>
                {isStudent && (
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center space-x-1"
                      onClick={() => onAddPreference(proposition)}
                    >
                      <Plus size={16} />
                      <span>Add</span>
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            )}
          </Draggable>
        ))}
      </TableBody>
    </Table>
  );
}

export default function AdminProposalsPage({ auth }) {
  const [propositions, setPropositions] = useState(initialPropositions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPendingPopupOpen, setIsPendingPopupOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filterField, setFilterField] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('submissionDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const pendingPropositions = propositions.filter(prop => prop.status === "Pending");
  const acceptedPropositions = propositions.filter(prop => prop.status !== "Pending");

  const filteredAcceptedPropositions = acceptedPropositions.filter(prop =>
    (prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.proposedBy.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterField === 'all' || prop.field === filterField) &&
    (filterType === 'all' || prop.type === filterType)
  ).sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleStatusChange = (id, newStatus) => {
    setPropositions(propositions.map(prop =>
      prop.id === id ? { ...prop, status: newStatus } : prop
    ));
  };

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
  };

  const uniqueFields = [...new Set(propositions.map(prop => prop.field))];
  const uniqueTypes = [...new Set(propositions.map(prop => prop.type))];

  const onDragEnd = (result) => {
    // Implement drag and drop logic here if needed
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <TopBar user={auth.user} />
      <div className="flex">
        <Sidebar userType="admin" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">PFE Propositions Management</h1>

            <div className="mb-6 flex justify-between items-center">
              <Button
                onClick={() => setIsPendingPopupOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Pending Proposals ({pendingPropositions.length})
              </Button>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search proposals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <Select value={filterField} onValueChange={setFilterField}>
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
                <Select value={filterType} onValueChange={setFilterType}>
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
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submissionDate">Submission Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="field">Field</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </Button>
              </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="propositions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <PropositionTable
                      propositions={filteredAcceptedPropositions}
                      onAddPreference={() => { }} // Implement this function if needed
                      isStudent={false}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </main>
      </div>

      <PendingProposalsPopup
        isOpen={isPendingPopupOpen}
        onClose={() => setIsPendingPopupOpen(false)}
        pendingPropositions={pendingPropositions}
        onStatusChange={handleStatusChange}
        onProposalClick={handleProposalClick}
      />

      <ProposalDetailsDialog
        proposal={selectedProposal}
        isOpen={!!selectedProposal}
        onClose={() => setSelectedProposal(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

