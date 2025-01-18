import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from 'lucide-react';

const teamData = [
  { id: 1, name: "Alice Johnson", role: "Project Manager", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Bob Smith", role: "Lead Developer", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Carol Williams", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "David Brown", role: "Data Scientist", avatar: "https://i.pravatar.cc/150?img=4" },
];

export default function TeamMembers() {
  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamData.map((member) => (
            <div key={member.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600">
          <Plus className="w-4 h-4 mr-2" /> Add Team Member
        </Button>
      </CardFooter>
    </Card>
  );
}

