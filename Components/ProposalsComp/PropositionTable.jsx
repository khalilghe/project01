import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Draggable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';

export function PropositionTable({ propositions, onAddPreference, isStudent }) {
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

