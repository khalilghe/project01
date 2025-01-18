import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import TopBar from '@/Components/TopBar';
import Sidebar from '@/Components/Sidebar';
import { Search, Plus, MoreHorizontal, Edit, Trash2, ChevronLeft, ChevronRight, Download, Filter, Power, Key, Briefcase, Save } from 'lucide-react';
import { UserDetailsDialog } from '@/components/UserDetailsDialog';

// Enhanced fake user data
const fakeUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', field: 'Computer Science', lastYearMark: 16, currentYear: 3, totalCredits: 120, advisor: 'Dr. Smith', enrollmentDate: '2021-09-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Supervisor', status: 'Active', field: 'Artificial Intelligence', department: 'Computer Science', yearsOfExperience: 8, currentProjects: 3, totalPublications: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Admin', status: 'Inactive', department: 'Student Affairs', yearsOfService: 5, managedSystems: ['Enrollment', 'Grading'] },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Student', status: 'Active', field: 'Electrical Engineering', lastYearMark: 18, currentYear: 2, totalCredits: 80, advisor: 'Prof. Johnson', enrollmentDate: '2022-09-01' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Supervisor', status: 'Active', field: 'Robotics', department: 'Mechanical Engineering', yearsOfExperience: 12, currentProjects: 2, totalPublications: 40 },
];

export default function UserManagement() {
  const [users, setUsers] = useState(fakeUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleDownloadCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Field'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user =>
        [user.name, user.email, user.role, user.status, user.field || ''].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', role: '', status: 'Active' });
    setIsAddUserDialogOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n');
      const headers = rows[0].split(',');

      const newUsers = rows.slice(1).map((row, index) => {
        const values = row.split(',');
        return {
          id: users.length + index + 1,
          name: values[0],
          email: values[1],
          role: values[2],
          status: values[3] || 'Active',
        };
      });

      setUsers([...users, ...newUsers]);
    };

    reader.readAsText(file);
  };

  const handleResetPassword = (userId) => {
    console.log(`Password reset requested for user ${userId}`);
    // You could show a toast notification here
  };

  const handleAssignProject = (userId, projectId) => {
    console.log(`Assigning project ${projectId} to user ${userId}`);
    // Update the user's assigned projects in the state
  };

  const handleBulkAction = (action, selectedUserIds) => {
    switch (action) {
      case 'activate':
        setUsers(users.map(user =>
          selectedUserIds.includes(user.id) ? { ...user, status: 'Active' } : user
        ));
        break;
      case 'deactivate':
        setUsers(users.map(user =>
          selectedUserIds.includes(user.id) ? { ...user, status: 'Inactive' } : user
        ));
        break;
      case 'delete':
        setUsers(users.filter(user => !selectedUserIds.includes(user.id)));
        break;
      default:
        console.log(`Bulk action ${action} not implemented`);
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowClick = useCallback((user, event) => {
    if (event.target.closest('button') || event.target.closest('input[type="checkbox"]')) {
      return;
    }
    setSelectedUserDetails(user);
    setIsDetailsDialogOpen(true);
  }, []);

  const handleEditUser = () => {
    setIsEditing(true);
  };

  const handleSaveUser = () => {
    setUsers(users.map(user =>
      user.id === selectedUserDetails.id ? selectedUserDetails : user
    ));
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUserDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <TopBar />
      <div className="flex">
        <Sidebar userType="admin" />
        <main className="flex-1 p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full bg-white/80 dark:bg-gray-800/80 mt-4 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="flex justify-between items-center mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('activate', selectedUsers)}
                      disabled={selectedUsers.length === 0}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      Activate Selected
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('deactivate', selectedUsers)}
                      disabled={selectedUsers.length === 0}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      Deactivate Selected
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleBulkAction('delete', selectedUsers)}
                      disabled={selectedUsers.length === 0}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete Selected
                    </Button>
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400">
                    {selectedUsers.length} users selected
                  </div>
                </motion.div>
                <motion.div
                  className="flex justify-between items-center p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center space-x-2 flex-1 max-w-md">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                      <Input
                        type="text"
                        placeholder="Search users..."
                        className="pl-8 bg-white dark:bg-gray-700 text-indigo-900 dark:text-indigo-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center bg-white dark:bg-gray-700 text-indigo-900 dark:text-indigo-100">
                          <Filter className="mr-2 h-4 w-4" />
                          Filters
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-gray-800 text-indigo-900 dark:text-indigo-100">
                        <DropdownMenuLabel className="text-indigo-600 dark:text-indigo-400">Filter by Role</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setRoleFilter('all')}>All Roles</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoleFilter('Student')}>Student</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoleFilter('Supervisor')}>Supervisor</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoleFilter('Admin')}>Admin</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-indigo-600 dark:text-indigo-400">Filter by Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter('Active')}>Active</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter('Inactive')}>Inactive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="csvInput"
                    />
                    <Button
                      variant="outline"
                      onClick={handleDownloadCSV}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('csvInput').click()}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Import CSV
                    </Button>
                    <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          <Plus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-800 text-indigo-900 dark:text-indigo-100">
                        <form onSubmit={handleAddUser}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right text-indigo-600 dark:text-indigo-400">
                                Name
                              </Label>
                              <Input
                                id="name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                className="col-span-3 bg-white dark:bg-gray-700 text-indigo-900 dark:text-indigo-100"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right text-indigo-600 dark:text-indigo-400">
                                Email
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                className="col-span-3 bg-white dark:bg-gray-700 text-indigo-900 dark:text-indigo-100"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="role" className="text-right text-indigo-600 dark:text-indigo-400">
                                Role
                              </Label>
                              <Select
                                value={newUser.role}
                                onValueChange={(value) => setNewUser({...newUser, role: value})}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Student">Student</SelectItem>
                                  <SelectItem value="Supervisor">Supervisor</SelectItem>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="status" className="text-right text-indigo-600 dark:text-indigo-400">
                                Status
                              </Label>
                              <Select
                                value={newUser.status}
                                onValueChange={(value) => setNewUser({...newUser, status: value})}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Add User</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
                <motion.div
                  className="rounded-md border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Table className="bg-white dark:bg-gray-800 text-indigo-900 dark:text-indigo-100">
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Checkbox
                            checked={selectAll}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30 cursor-pointer"
                          onClick={(event) => handleRowClick(user, event)}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={() => handleUserSelection(user.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === 'Active'
                                  ? 'bg-green-500 hover:bg-green-600 text-white'
                                  : 'bg-red-500 hover:bg-red-600 text-white'
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-white dark:bg-gray-800 text-indigo-900 dark:text-indigo-100" align="end">
                                <DropdownMenuLabel className="text-indigo-600 dark:text-indigo-400">Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedUserDetails(user);
                                  setIsDetailsDialogOpen(true);
                                }}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                                  <Power className="mr-2 h-4 w-4" />
                                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                                  <Key className="mr-2 h-4 w-4" /> Reset Password
                                </DropdownMenuItem>
                                {(user.role === 'Student' || user.role === 'Supervisor') && (
                                  <DropdownMenuItem onClick={() => handleAssignProject(user.id, null)}>
                                    <Briefcase className="mr-2 h-4 w-4" /> Assign Project
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
                <motion.div
                  className="flex items-center justify-between space-x-2 py-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="text-sm text-indigo-600 dark:text-indigo-400">
                    Showing {Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredUsers.length, currentPage * itemsPerPage)} of {filteredUsers.length} entries
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="bg-white dark:bg-gray-700 text-indigo-900 dark:text-indigo-100"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="bg-white dark:bg-gray-700 text-indigo-900 dark:text-indigo-100"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
            <UserDetailsDialog
              isOpen={isDetailsDialogOpen}
              onClose={() => {
                setIsDetailsDialogOpen(false);
                setIsEditing(false);
              }}
              user={selectedUserDetails}
              isEditing={isEditing}
              onEdit={handleEditUser}
              onSave={handleSaveUser}
              handleInputChange={handleInputChange}
            />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

