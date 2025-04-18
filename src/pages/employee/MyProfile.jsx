import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, FileText, Building, Briefcase, Clock, Calendar, Edit, UploadCloud } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast"

// Mock employee data - in a real app, this would be fetched from an API
const EMPLOYEE_DATA = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  designation: "Software Engineer",
  employeeId: "EMP-001",
  joinDate: "March 15, 2022",
  status: "Active",
  reportingTo: "Jane Smith (Engineering Lead)",
  workLocation: "San Francisco, CA",
  employmentType: "Full-time",
  address: "123 Main St, San Francisco, CA 94105",
  personalEmail: "john.personal@example.com",
  emergencyContact: "Jane Doe - +1 (555) 987-6543",
  bankName: "First National Bank",
  accountNumber: "XXXXXXXX1234",
  panNumber: "ABCDE1234F",
  documents: [
    { name: "Resume", url: "#", date: "March 10, 2022" },
    { name: "ID Proof", url: "#", date: "March 12, 2022" },
    { name: "Joining Letter", url: "#", date: "March 15, 2022" }
  ]
};

export default function MyProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  // In a real implementation, we would fetch employee data based on the user's ID
  // For now, we'll just use our mock data
  const employeeData = EMPLOYEE_DATA;
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg bg-hr-purple-300 text-white">
                    {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold">{user?.fullName || employeeData.name}</h2>
                <p className="text-muted-foreground mb-2">{employeeData.designation}</p>
                
                <div className="flex space-x-1 text-xs">
                  <span className="px-2 py-1 bg-hr-green text-green-700 rounded-md">
                    {employeeData.status}
                  </span>
                  <span className="px-2 py-1 bg-hr-blue text-blue-700 rounded-md">
                    {employeeData.employmentType}
                  </span>
                </div>
                
                <div className="w-full border-t my-6"></div>
                
                <div className="w-full">
                  <div className="flex items-start mb-4">
                    <Mail className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm">{user?.email || employeeData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Phone className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm">{employeeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Building className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="text-sm">{employeeData.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Briefcase className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Employee ID</p>
                      <p className="text-sm">{employeeData.employeeId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Join Date</p>
                      <p className="text-sm">{employeeData.joinDate}</p>
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
                            placeholder={employeeData.phone}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Personal Email</label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder={employeeData.personalEmail}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Emergency Contact</label>
                          <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder={employeeData.emergencyContact}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Address</label>
                          <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder={employeeData.address}
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
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area with tabs */}
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="job">Job</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Personal contact details and information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Personal Email
                      </p>
                      <p>{employeeData.personalEmail}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Emergency Contact
                      </p>
                      <p>{employeeData.emergencyContact}</p>
                    </div>
                    
                    <div className="space-y-1 col-span-1 md:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Residential Address
                      </p>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                        <p>{employeeData.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="job" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Information</CardTitle>
                  <CardDescription>
                    Employment details and job information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Department
                      </p>
                      <p>{employeeData.department}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Designation
                      </p>
                      <p>{employeeData.designation}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Employment Type
                      </p>
                      <p>{employeeData.employmentType}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Reporting To
                      </p>
                      <p>{employeeData.reportingTo}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Work Location
                      </p>
                      <p>{employeeData.workLocation}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Join Date
                      </p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{employeeData.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                  <CardDescription>
                    Banking and financial details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Bank Name
                      </p>
                      <p>{employeeData.bankName}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Account Number
                      </p>
                      <p>{employeeData.accountNumber}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        PAN Number
                      </p>
                      <p>{employeeData.panNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Your documents and certificates
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employeeData.documents.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-hr-purple-300" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
