
import React, { useState } from "react";
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
import { Calendar, Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  {
    id: "4",
    employee: "Emily Brown",
    type: "Earned Leave",
    from: "2025-05-01",
    to: "2025-05-05",
    days: 5,
    reason: "Family vacation",
    status: "Approved",
    appliedOn: "2025-04-20",
  },
  {
    id: "5",
    employee: "Michael Wilson",
    type: "Sick Leave",
    from: "2025-04-25",
    to: "2025-04-26",
    days: 2,
    reason: "Dental surgery",
    status: "Pending",
    appliedOn: "2025-04-22",
  },
  {
    id: "6",
    employee: "Sarah Davis",
    type: "Casual Leave",
    from: "2025-05-10",
    to: "2025-05-11",
    days: 2,
    reason: "Wedding preparation",
    status: "Approved",
    appliedOn: "2025-04-25",
  },
  {
    id: "7",
    employee: "David Lee",
    type: "Work from Home",
    from: "2025-04-30",
    to: "2025-04-30",
    days: 1,
    reason: "Home repairs",
    status: "Pending",
    appliedOn: "2025-04-28",
  },
  {
    id: "8",
    employee: "Lisa Martinez",
    type: "Earned Leave",
    from: "2025-05-15",
    to: "2025-05-20",
    days: 6,
    reason: "International conference",
    status: "Approved",
    appliedOn: "2025-05-01",
  },
  {
    id: "9",
    employee: "Kevin Thompson",
    type: "Sick Leave",
    from: "2025-05-05",
    to: "2025-05-06",
    days: 2,
    reason: "Flu symptoms",
    status: "Pending",
    appliedOn: "2025-05-03",
  },
  {
    id: "10",
    employee: "Amanda White",
    type: "Casual Leave",
    from: "2025-05-12",
    to: "2025-05-13",
    days: 2,
    reason: "Personal errands",
    status: "Approved",
    appliedOn: "2025-05-05",
  }
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function LeaveManagement() {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<typeof leaveRequests[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleViewClick = (leave: typeof leaveRequests[0]) => {
    setSelectedLeave(leave);
    setViewModalOpen(true);
  };

  const filterLeaves = (leaves: typeof leaveRequests) => {
    return leaves.filter(leave => 
      leave.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const paginateLeaves = (leaves: typeof leaveRequests) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return leaves.slice(startIndex, endIndex);
  };

  const generatePaginationRange = (totalPages: number) => {
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  };

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
        
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by employee, type, or reason..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>

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
                    {paginateLeaves(filterLeaves(leaveRequests)).length > 0 ? (
                      paginateLeaves(filterLeaves(leaveRequests)).map((request) => (
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
                              <Button size="sm" variant="outline" onClick={() => handleViewClick(request)}>
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No leave requests found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {filterLeaves(leaveRequests).length > itemsPerPage && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {generatePaginationRange(Math.ceil(filterLeaves(leaveRequests).length / itemsPerPage))
                        .map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => 
                            Math.min(Math.ceil(filterLeaves(leaveRequests).length / itemsPerPage), prev + 1)
                          )}
                          className={currentPage === Math.ceil(filterLeaves(leaveRequests).length / itemsPerPage) 
                            ? "pointer-events-none opacity-50" 
                            : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
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

      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              Detailed information for the selected leave request.
            </DialogDescription>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-3 pt-2">
              <div>
                <span className="block text-muted-foreground text-xs">Employee</span>
                <span className="font-semibold">{selectedLeave.employee}</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="block text-muted-foreground text-xs">Type</span>
                  <span>{selectedLeave.type}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs">Status</span>
                  <Badge
                    className={
                      selectedLeave.status === "Approved"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : selectedLeave.status === "Rejected"
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {selectedLeave.status}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="block text-muted-foreground text-xs">From</span>
                  <span>{formatDate(selectedLeave.from)}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs">To</span>
                  <span>{formatDate(selectedLeave.to)}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs">Days</span>
                  <span>{selectedLeave.days}</span>
                </div>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs">Reason</span>
                <span>{selectedLeave.reason}</span>
              </div>
              <div>
                <span className="block text-muted-foreground text-xs">Applied On</span>
                <span>{formatDate(selectedLeave.appliedOn)}</span>
              </div>
            </div>
          )}
          <DialogClose asChild>
            <Button variant="outline" className="mt-6 w-full">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
