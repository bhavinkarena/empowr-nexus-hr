
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

// Import our new components
import ProfileSidebar from "@/components/employee/ProfileSidebar";
import ProfilePersonalTab from "@/components/employee/ProfilePersonalTab";
import ProfileJobTab from "@/components/employee/ProfileJobTab";
import ProfileFinancialTab from "@/components/employee/ProfileFinancialTab";
import ProfileDocumentsTab from "@/components/employee/ProfileDocumentsTab";

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
              <ProfileSidebar userData={employeeData} user={user} />
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
              <ProfilePersonalTab userData={employeeData} />
            </TabsContent>
            
            <TabsContent value="job" className="space-y-6">
              <ProfileJobTab userData={employeeData} />
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-6">
              <ProfileFinancialTab userData={employeeData} />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <ProfileDocumentsTab documents={employeeData.documents} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
