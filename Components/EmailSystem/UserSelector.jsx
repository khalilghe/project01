import React, { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample users data - replace with actual data from your backend
const users = [
  { id: 1, name: "John Doe", email: "john@university.edu", role: "Student", year: "3rd" },
  { id: 2, name: "Jane Smith", email: "jane@university.edu", role: "Student", year: "2nd" },
  { id: 3, name: "Dr. Williams", email: "williams@university.edu", role: "Supervisor" },
  // Add more users...
];

const roles = ["All", "Student", "Supervisor", "Admin"];
const years = ["All", "1st", "2nd", "3rd", "4th"];

export function UserSelector({ selectedUsers, onSelectionChange }) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const filteredUsers = users.filter(user => {
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesYear = selectedYear === "All" || user.year === selectedYear;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase());
    return matchesRole && matchesYear && matchesSearch;
  });

  const handleSelect = (user) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      onSelectionChange(selectedUsers.filter(u => u.id !== user.id));
    } else {
      onSelectionChange([...selectedUsers, user]);
    }
  };

  const removeUser = (userId) => {
    onSelectionChange(selectedUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selectedUsers.map(user => (
          <Badge
            key={user.id}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {user.name}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeUser(user.id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-4 mb-4">
        <select
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        
        {selectedRole === "Student" && (
          <select
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>{year} Year</option>
            ))}
          </select>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select users...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Search users..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-72">
                {filteredUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => handleSelect(user)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedUsers.find(u => u.id === user.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email} • {user.role} {user.year ? `(${user.year} Year)` : ''}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

