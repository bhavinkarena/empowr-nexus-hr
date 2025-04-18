
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus } from "lucide-react";

// Mock leave requests
const leaveRequests = [
  {
    id: "1",
    employee: "John Doe",
    type: "Sick Leave",
    from: "2025-04-10",
    to: "2025-04-12",
    days: 3,
    reason: "Not feeling well",
    status: "Approved",
    appliedOn: "2025-04-08",
  },
  {
    id: "2",
    employee: "Jane Smith",
    type: "Casual Leave",
    from: "2025-04-15",
    to: "2025-04-16",
    days: 2,
    reason: "Personal work",
    status: "Pending",
    appliedOn: "2025-04-13",
  },
  {
    id: "3",
    employee: "Robert Johnson",
    type: "Work from Home",
    from: "2025-04-20",
    to: "2025-04-20",
    days: 1,
    reason: "Internet installation at home",
    status: "Pending",
    appliedOn: "2025-04-18",
  },
];

// Function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function LeaveManagement() {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <Button className="bg-hr-purple-300 hover:bg-hr-purple-400">
          <Plus className="mr-2 h-4 w-4" /> Apply for Leave
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Casual Leave</p>
              <h3 className="text-2xl font-bold">8 / 12</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-hr-green flex items-center justify-center">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sick Leave</p>
              <h3 className="text-2xl font-bold">3 / 10</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-hr-blue flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Earned Leave</p>
              <h3 className="text-2xl font-bold">5 / 15</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-hr-yellow flex items-center justify-center">
              <Calendar className="h-5 w-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work From Home</p>
              <h3 className="text-2xl font-bold">2 / 8</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-hr-purple-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-hr-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>
                Manage all leave requests from the team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.employee}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>
                          {formatDate(request.from)} - {formatDate(request.to)}
                        </TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              request.status === "Approved"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : request.status === "Rejected"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {request.status === "Pending" && (
                              <>
                                <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                                  Approve
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>
                Leave requests awaiting approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter((request) => request.status === "Pending")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.employee}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>
                            {formatDate(request.from)} - {formatDate(request.to)}
                          </TableCell>
                          <TableCell>{request.days}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                          <TableCell>{formatDate(request.appliedOn)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive">
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Requests</CardTitle>
              <CardDescription>
                Leave requests that have been approved
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter((request) => request.status === "Approved")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.employee}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>
                            {formatDate(request.from)} - {formatDate(request.to)}
                          </TableCell>
                          <TableCell>{request.days}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                          <TableCell>{formatDate(request.appliedOn)}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Requests</CardTitle>
              <CardDescription>
                Leave requests that have been rejected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter((request) => request.status === "Rejected")
                      .length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No rejected requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      leaveRequests
                        .filter((request) => request.status === "Rejected")
                        .map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.employee}</TableCell>
                            <TableCell>{request.type}</TableCell>
                            <TableCell>
                              {formatDate(request.from)} - {formatDate(request.to)}
                            </TableCell>
                            <TableCell>{request.days}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                            <TableCell>{formatDate(request.appliedOn)}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
