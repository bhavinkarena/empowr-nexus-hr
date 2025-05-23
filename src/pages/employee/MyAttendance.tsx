
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

// Mock attendance data
const ATTENDANCE_DATA = [
  { date: "2025-04-01", status: "Present", clockIn: "09:05", clockOut: "18:10" },
  { date: "2025-04-02", status: "Present", clockIn: "08:55", clockOut: "17:45" },
  { date: "2025-04-03", status: "Present", clockIn: "09:00", clockOut: "18:00" },
  { date: "2025-04-04", status: "Present", clockIn: "08:50", clockOut: "18:15" },
  { date: "2025-04-05", status: "Weekend", clockIn: null, clockOut: null },
  { date: "2025-04-06", status: "Weekend", clockIn: null, clockOut: null },
  { date: "2025-04-07", status: "Present", clockIn: "09:10", clockOut: "18:05" },
  { date: "2025-04-08", status: "Present", clockIn: "09:00", clockOut: "18:00" },
  { date: "2025-04-09", status: "Late", clockIn: "09:45", clockOut: "18:30" },
  { date: "2025-04-10", status: "Present", clockIn: "08:55", clockOut: "17:45" },
  { date: "2025-04-11", status: "Absent", clockIn: null, clockOut: null },
  { date: "2025-04-12", status: "Weekend", clockIn: null, clockOut: null },
  { date: "2025-04-13", status: "Weekend", clockIn: null, clockOut: null },
  { date: "2025-04-14", status: "Present", clockIn: "09:05", clockOut: "18:00" },
  { date: "2025-04-15", status: "Present", clockIn: "09:00", clockOut: "18:00" }
];

// Mock summary data
const SUMMARY = {
  present: 11,
  absent: 1, 
  late: 1,
  leaves: 0,
  workingDays: 13
};

export default function MyAttendance() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [workLog, setWorkLog] = useState<string>("");
  const [showWorkLogDialog, setShowWorkLogDialog] = useState(false);
  
  // Check if today is a working day (for clock in/out demonstration)
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  
  const handleClockIn = () => {
    const now = new Date();
    const formattedTime = format(now, "HH:mm");
    setClockInTime(formattedTime);
    setClockedIn(true);
    
    toast({
      title: "Clocked In",
      description: `You have clocked in at ${formattedTime}.`,
    });
  };
  
  const handleClockOutClick = () => {
    setShowWorkLogDialog(true);
  };
  
  const handleClockOut = (skipLog: boolean = false) => {
    const now = new Date();
    const formattedTime = format(now, "HH:mm");
    
    setShowWorkLogDialog(false);
    
    toast({
      title: "Clocked Out",
      description: `You have clocked out at ${formattedTime}. Total hours: ${calculateHours(clockInTime || "09:00", formattedTime)}.`,
    });
    
    if (!skipLog && workLog.trim()) {
      toast({
        title: "Work Log Submitted",
        description: "Your work log has been submitted successfully.",
      });
    }
    
    setClockedIn(false);
    setClockInTime(null);
    setWorkLog("");
  };
  
  const calculateHours = (startTime: string, endTime: string) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const diffMinutes = endMinutes - startMinutes;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };
  
  const goPreviousMonth = () => {
    setSelectedMonth(prev => subMonths(prev, 1));
  };
  
  const goNextMonth = () => {
    setSelectedMonth(prev => addMonths(prev, 1));
  };
  
  // Get all days in the selected month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth)
  });
  
  // Filter attendance data for selected month
  const filteredAttendance = ATTENDANCE_DATA.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= startOfMonth(selectedMonth) && 
           recordDate <= endOfMonth(selectedMonth);
  });

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">My Attendance</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Today's Status</CardTitle>
          <CardDescription>
            {format(new Date(), "EEEE, MMMM do, yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col space-y-3">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="text-2xl font-bold flex items-center">
                  <Badge className={isWeekend ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"}>
                    {isWeekend ? "Weekend" : clockedIn ? "Working" : "Not Clocked In"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">Current Location</div>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Office HQ</span>
                </div>
              </div>
              
              {!isWeekend && (
                clockedIn ? (
                  <Button onClick={handleClockOutClick} variant="destructive">
                    <Clock className="mr-2 h-4 w-4" />
                    Clock Out
                  </Button>
                ) : (
                  <Button onClick={handleClockIn} className="bg-hr-purple-300 hover:bg-hr-purple-400">
                    <Clock className="mr-2 h-4 w-4" />
                    Clock In
                  </Button>
                )
              )}
            </div>
          </div>
          
          {clockedIn && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Clock In Time</div>
                  <div className="text-lg font-medium">{clockInTime}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Working Hours</div>
                  <div className="text-lg font-medium">In progress...</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Expected Clock Out</div>
                  <div className="text-lg font-medium">18:00</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Work Log Dialog */}
      <Dialog open={showWorkLogDialog} onOpenChange={setShowWorkLogDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Daily Work Log</DialogTitle>
            <DialogDescription>
              Enter your work summary for today. This is optional and you can skip it.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Enter your work summary for today..."
              value={workLog}
              onChange={(e) => setWorkLog(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => handleClockOut(true)}
            >
              Skip & Clock Out
            </Button>
            <Button 
              onClick={() => handleClockOut(false)}
              className="bg-hr-purple-300 hover:bg-hr-purple-400"
            >
              Submit & Clock Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SUMMARY.present} days</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SUMMARY.absent} days</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{SUMMARY.late} days</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((SUMMARY.present / SUMMARY.workingDays) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Attendance Record</CardTitle>
            <CardDescription>
              Your attendance history for {format(selectedMonth, "MMMM yyyy")}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goPreviousMonth}>
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              {format(selectedMonth, "MMM yyyy")}
            </Button>
            <Button variant="outline" size="sm" onClick={goNextMonth}>
              Next
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showCalendar && (
            <div className="flex justify-center mb-6">
              <Calendar
                mode="single"
                selected={selectedMonth}
                onSelect={(date) => {
                  setSelectedMonth(date || new Date());
                  setShowCalendar(false);
                }}
                className="rounded-md border"
              />
            </div>
          )}
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Working Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record, index) => {
                    const recordDate = new Date(record.date);
                    return (
                      <TableRow key={index}>
                        <TableCell>{format(recordDate, "MMM dd, yyyy")}</TableCell>
                        <TableCell>{format(recordDate, "EEEE")}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              record.status === "Present" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              record.status === "Absent" ? "bg-red-100 text-red-800 hover:bg-red-100" : 
                              record.status === "Late" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                              "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.clockIn || "--:--"}</TableCell>
                        <TableCell>{record.clockOut || "--:--"}</TableCell>
                        <TableCell>
                          {record.clockIn && record.clockOut ? 
                            calculateHours(record.clockIn, record.clockOut) : 
                            "--"}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No attendance records found for this month
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
