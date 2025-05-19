
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, Building, Briefcase, Calendar, Edit } from "lucide-react";
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

const ProfileSidebar = ({ userData, user }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  return (
    <div className="flex flex-col items-center text-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback className="text-lg bg-hr-purple-300 text-white">
          {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <h2 className="text-2xl font-bold">{user?.fullName || userData.name}</h2>
      <p className="text-muted-foreground mb-2">{userData.designation}</p>
      
      <div className="flex space-x-1 text-xs">
        <span className="px-2 py-1 bg-hr-green text-green-700 rounded-md">
          {userData.status}
        </span>
        <span className="px-2 py-1 bg-hr-blue text-blue-700 rounded-md">
          {userData.employmentType}
        </span>
      </div>
      
      <div className="w-full border-t my-6"></div>
      
      <div className="w-full">
        <div className="flex items-start mb-4">
          <Mail className="h-4 w-4 mt-1 mr-2 text-gray-500" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm">{user?.email || userData.email}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <Phone className="h-4 w-4 mt-1 mr-2 text-gray-500" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm">{userData.phone}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <Building className="h-4 w-4 mt-1 mr-2 text-gray-500" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Department</p>
            <p className="text-sm">{userData.department}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <Briefcase className="h-4 w-4 mt-1 mr-2 text-gray-500" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Employee ID</p>
            <p className="text-sm">{userData.employeeId}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-4 w-4 mt-1 mr-2 text-gray-500" />
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Join Date</p>
            <p className="text-sm">{userData.joinDate}</p>
          </div>
        </div>
      </div>
      
      <div className="w-full border-t my-6"></div>
      
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-hr-purple-300 hover:bg-hr-purple-400">
            <Edit className="mr-2 h-4 w-4" /> Update Info
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Profile Information</DialogTitle>
            <DialogDescription>
              Make changes to your profile information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder={userData.phone}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Personal Email</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder={userData.personalEmail}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Emergency Contact</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder={userData.emergencyContact}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Address</label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder={userData.address}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-hr-purple-300 hover:bg-hr-purple-400"
              onClick={() => {
                // Here you would handle the update logic
                setIsUpdateModalOpen(false);
                toast({
                  title: "Profile Updated",
                  description: "Your profile information has been updated successfully.",
                });
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSidebar;
