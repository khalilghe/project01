import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X, Edit2, Camera } from 'lucide-react';

export function UserDetailsDialog({
  isOpen,
  onClose,
  user,
  isEditing,
  onEdit,
  onSave,
  handleInputChange
}) {
  if (!user) return null;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange({
          target: {
            name: 'profilePhoto',
            value: reader.result
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] p-0 bg-white dark:bg-gray-800">
        <div className="absolute right-4 top-4 z-50">
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="absolute right-12 top-4 z-50 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        )}

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-semibold">Account Setting</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="px-6 border-b">
            <TabsTrigger
              value="profile"
              className="text-sm data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              PROFILE
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="text-sm data-[state=active]:text-blue-500 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              ACADEMIC DETAILS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-6">
            <div className="grid grid-cols-[200px,1fr] gap-8">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user.profilePhoto || `/placeholder.svg?height=128&width=128`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <label htmlFor="profile-photo-upload" className="absolute bottom-0 right-0 text-blue-500 text-sm font-medium cursor-pointer">
                    CHANGE
                    <input
                      id="profile-photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Label className="text-xs text-gray-500 font-medium">NAME</Label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center justify-between mt-1 py-2 border-b">
                      <span>{user.name}</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Label className="text-xs text-gray-500 font-medium">EMAIL</Label>
                  {isEditing ? (
                    <Input
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center justify-between mt-1 py-2 border-b">
                      <span>{user.email}</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Label className="text-xs text-gray-500 font-medium">PHONE</Label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={user.phone || ''}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center justify-between mt-1 py-2 border-b">
                      <span>{user.phone || '+1 234 56 66 777'}</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Label className="text-xs text-gray-500 font-medium">PASSWORD</Label>
                  {isEditing ? (
                    <Input
                      type="password"
                      name="password"
                      value="********"
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center justify-between mt-1 py-2 border-b">
                      <span>********</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="relative">
                    <Label className="text-xs text-gray-500 font-medium">CONFIRM PASSWORD</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value="********"
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                )}

                {isEditing && (
                  <Button
                    onClick={onSave}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6"
                  >
                    SAVE
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Label className="text-xs text-gray-500 font-medium">MARK OF LAST YEAR (/20)</Label>
                {isEditing ? (
                  <Input
                    name="lastYearMark"
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={user.lastYearMark || ''}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center justify-between mt-1 py-2 border-b">
                    <span>{user.lastYearMark ? `${user.lastYearMark}/20` : 'Not provided'}</span>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>

              <div className="relative">
                <Label className="text-xs text-gray-500 font-medium">MASTER 2 SPECIALIZATION</Label>
                {isEditing ? (
                  <Input
                    name="specialization"
                    value={user.specialization || ''}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center justify-between mt-1 py-2 border-b">
                    <span>{user.specialization || 'Not provided'}</span>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {isEditing && (
                  <Button
                    onClick={onSave}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6"
                  >
                    SAVE
                  </Button>
                )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

