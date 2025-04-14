
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { Mail, Phone, MapPin, FileText, Building, Briefcase, Clock, Calendar, Edit, UploadCloud, ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';

// Mock employee data
const EMPLOYEE = {
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

export default function EmployeeProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("personal");
  
  // In a real implementation, we would fetch the employee data based on the ID
  // For now, we'll just use our mock data
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link 
          to="/dashboard/employees"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Directory
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg bg-hr-purple-300 text-white">
                    {EMPLOYEE.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold">{EMPLOYEE.name}</h2>
                <p className="text-muted-foreground mb-2">{EMPLOYEE.designation}</p>
                
                <div className="flex space-x-1 text-xs">
                  <span className="px-2 py-1 bg-hr-green text-green-700 rounded-md">
                    {EMPLOYEE.status}
                  </span>
                  <span className="px-2 py-1 bg-hr-blue text-blue-700 rounded-md">
                    {EMPLOYEE.employmentType}
                  </span>
                </div>
                
                <div className="w-full border-t my-6"></div>
                
                <div className="w-full">
                  <div className="flex items-start mb-4">
                    <Mail className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm">{EMPLOYEE.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Phone className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm">{EMPLOYEE.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Building className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="text-sm">{EMPLOYEE.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <Briefcase className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Employee ID</p>
                      <p className="text-sm">{EMPLOYEE.employeeId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Join Date</p>
                      <p className="text-sm">{EMPLOYEE.joinDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full border-t my-6"></div>
                
                <Button className="w-full bg-hr-purple-300 hover:bg-hr-purple-400">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
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
                      <p>{EMPLOYEE.personalEmail}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Emergency Contact
                      </p>
                      <p>{EMPLOYEE.emergencyContact}</p>
                    </div>
                    
                    <div className="space-y-1 col-span-1 md:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Residential Address
                      </p>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mt-1 mr-2 text-gray-500" />
                        <p>{EMPLOYEE.address}</p>
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
                      <p>{EMPLOYEE.department}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Designation
                      </p>
                      <p>{EMPLOYEE.designation}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Employment Type
                      </p>
                      <p>{EMPLOYEE.employmentType}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Reporting To
                      </p>
                      <p>{EMPLOYEE.reportingTo}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Work Location
                      </p>
                      <p>{EMPLOYEE.workLocation}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Join Date
                      </p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{EMPLOYEE.joinDate}</p>
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
                      <p>{EMPLOYEE.bankName}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Account Number
                      </p>
                      <p>{EMPLOYEE.accountNumber}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        PAN Number
                      </p>
                      <p>{EMPLOYEE.panNumber}</p>
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
                      Employee documents and certificates
                    </CardDescription>
                  </div>
                  <Button variant="outline">
                    <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {EMPLOYEE.documents.map((doc, index) => (
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
