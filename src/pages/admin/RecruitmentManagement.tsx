
import { PlusCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RecruitmentManagement = () => {
  const jobApplications = [
    {
      id: 1,
      position: "Senior Developer",
      department: "Engineering",
      applicantName: "Alice Johnson",
      status: "In Review",
      appliedDate: "2025-03-15",
    },
    {
      id: 2,
      position: "HR Manager",
      department: "Human Resources",
      applicantName: "Bob Wilson",
      status: "Scheduled",
      appliedDate: "2025-03-14",
    },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Recruitment Management</h1>
        <div className="flex gap-4">
          <Input 
            type="search" 
            placeholder="Search applications..." 
            className="w-64"
          />
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Job Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>{application.department}</TableCell>
                  <TableCell>{application.applicantName}</TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      application.status === 'In Review' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {application.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Schedule</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentManagement;
