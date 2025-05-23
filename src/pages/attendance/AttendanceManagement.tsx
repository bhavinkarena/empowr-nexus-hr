
import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HomeIcon,
  UserCheck,
  Download,
  Eye
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Mock attendance data
const attendanceData = [
  {
    id: "1",
    employee: "John Doe",
    date: "2025-04-14",
    status: "Present",
    clockIn: "09:00 AM",
    clockOut: "06:15 PM",
    hours: "9.25",
    workLog: "Completed the quarterly sales report and prepared for tomorrow's client meeting. Helped new team members with onboarding procedures."
  },
  {
    id: "2",
    employee: "Jane Smith",
    date: "2025-04-14",
    status: "Work From Home",
    clockIn: "09:30 AM",
    clockOut: "05:45 PM",
    hours: "8.25",
    workLog: "Worked on the marketing campaign design. Had a video call with the design team regarding the new brand assets."
  },
  {
    id: "3",
    employee: "Robert Johnson",
    date: "2025-04-14",
    status: "Absent",
    clockIn: "-",
    clockOut: "-",
    hours: "0",
    workLog: ""
  },
  {
    id: "4",
    employee: "Emily Davis",
    date: "2025-04-14",
    status: "Present",
    clockIn: "08:45 AM",
    clockOut: "06:00 PM",
    hours: "9.25",
    workLog: "Resolved 5 critical customer support tickets. Updated the knowledge base with new troubleshooting steps."
  },
  {
    id: "5",
    employee: "Michael Wilson",
    date: "2025-04-14",
    status: "Leave",
    clockIn: "-",
    clockOut: "-",
    hours: "0",
    workLog: "On approved annual leave"
  },
];

// Function to get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case "Present":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case "Absent":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "Work From Home":
      return <HomeIcon className="h-4 w-4 text-blue-600" />;
    case "Leave":
      return <Calendar className="h-4 w-4 text-yellow-600" />;
    default:
      return null;
  }
};

// Function to get status badge color
const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Present":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Absent":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "Work From Home":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Leave":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function AttendanceManagement() {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<string>(format(new Date(), 'MMMM'));
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedRecord, setSelectedRecord] = useState<typeof attendanceData[0] | null>(null);
  const [showAttendanceDetail, setShowAttendanceDetail] = useState(false);
  
  // Array of months
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  
  // Generate an array of years (current year and 5 years before)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => (currentYear - 5 + i).toString());

  const handleViewAttendance = (record: typeof attendanceData[0]) => {
    setSelectedRecord(record);
    setShowAttendanceDetail(true);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Button variant="default" className="bg-hr-purple-300 hover:bg-hr-purple-400">
            <UserCheck className="mr-2 h-4 w-4" /> Mark Attendance
          </Button>
        </div>
      </div>
      
      {/* Attendance Detail Modal */}
      <Dialog open={showAttendanceDetail} onOpenChange={setShowAttendanceDetail}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Attendance Details</DialogTitle>
            <DialogDescription>
              Detailed attendance information for {selectedRecord?.employee} on {format(new Date(selectedRecord?.date || Date.now()), "MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employee Name</p>
                  <p className="font-medium">{selectedRecord.employee}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(selectedRecord.status)}
                    <Badge className={getStatusBadgeClass(selectedRecord.status)}>
                      {selectedRecord.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Clock In</p>
                  <p className="font-medium">{selectedRecord.clockIn}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Clock Out</p>
                  <p className="font-medium">{selectedRecord.clockOut}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Working Hours</p>
                  <p className="font-medium">{selectedRecord.hours} hrs</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Daily Work Log</p>
                <div className="bg-gray-50 p-3 rounded-md min-h-[100px]">
                  {selectedRecord.workLog ? (
                    <p>{selectedRecord.workLog}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No work log available for this day</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Present</p>
              <h3 className="text-2xl font-bold">86%</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-hr-green flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Absent</p>
              <h3 className="text-2xl font-bold">5%</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Work From Home</p>
              <h3 className="text-2xl font-bold">6%</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-hr-blue flex items-center justify-center">
              <HomeIcon className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">On Leave</p>
              <h3 className="text-2xl font-bold">3%</h3>
            </div>
            <div className="h-10 w-10 rounded-md bg-hr-yellow flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="daily" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" className="h-9">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance - {format(date, "MMMM d, yyyy")}</CardTitle>
              <CardDescription>
                View and manage daily attendance records for all employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Clock In</TableHead>
                      <TableHead>Clock Out</TableHead>
                      <TableHead>Working Hours</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.employee}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(record.status)}
                            <Badge className={getStatusBadgeClass(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{record.clockIn}</TableCell>
                        <TableCell>{record.clockOut}</TableCell>
                        <TableCell>{record.hours} hrs</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewAttendance(record)}
                              className="flex items-center"
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
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
        
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>Monthly Attendance Report</CardTitle>
                  <CardDescription>
                    View and export monthly attendance summary
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Present Days</TableHead>
                      <TableHead>Absent Days</TableHead>
                      <TableHead>WFH Days</TableHead>
                      <TableHead>Leave Days</TableHead>
                      <TableHead>Working Hours</TableHead>
                      <TableHead>Attendance %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>19</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>176.5 hrs</TableCell>
                      <TableCell>95%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>17</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>167.25 hrs</TableCell>
                      <TableCell>90%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Robert Johnson</TableCell>
                      <TableCell>18</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>160.75 hrs</TableCell>
                      <TableCell>86%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emily Davis</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>182.5 hrs</TableCell>
                      <TableCell>96%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Michael Wilson</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>154.25 hrs</TableCell>
                      <TableCell>82%</TableCell>
                    </TableRow>
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
