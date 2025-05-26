import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Clock, Calendar, FileCheck, DollarSign, Users, Briefcase, Building, Plus, Megaphone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/ui/Loader";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Sample data for charts and visualizations
const leaveData = [
  { name: 'Approved', value: 8 },
  { name: 'Pending', value: 2 },
  { name: 'Rejected', value: 1 },
];

const attendanceData = [
  { month: 'Jan', present: 21, leave: 1, absent: 0 },
  { month: 'Feb', present: 18, leave: 2, absent: 0 },
  { month: 'Mar', present: 20, leave: 1, absent: 1 },
];

// Department data for admin dashboard
const departmentData = [
  { name: 'HR', count: 12 },
  { name: 'IT', count: 24 },
  { name: 'Finance', count: 18 },
  { name: 'Marketing', count: 16 },
  { name: 'Operations', count: 22 },
];

// Weekly attendance data for admin dashboard
const weeklyAttendanceData = [
  { day: 'Mon', present: 96, absent: 4, leave: 8 },
  { day: 'Tue', present: 92, absent: 3, leave: 13 },
  { day: 'Wed', present: 94, absent: 2, leave: 12 },
  { day: 'Thu', present: 90, absent: 5, leave: 15 },
  { day: 'Fri', present: 85, absent: 6, leave: 17 },
];

// Mock announcements data
const mockAnnouncements = [
  {
    id: 1,
    title: "Office Holiday - Christmas Week",
    content: "The office will be closed from December 25th to January 1st. Regular operations will resume on January 2nd, 2025.",
    priority: "high",
    date: "2024-12-20",
    author: "HR Department"
  },
  {
    id: 2,
    title: "New Employee Wellness Program",
    content: "We're excited to announce our new wellness program starting January 2025. This includes gym membership reimbursements and mental health support.",
    priority: "medium",
    date: "2024-12-18",
    author: "HR Department"
  },
  {
    id: 3,
    title: "IT System Maintenance",
    content: "Scheduled maintenance on our internal systems will occur this weekend. Some services may be temporarily unavailable.",
    priority: "low",
    date: "2024-12-15",
    author: "IT Department"
  }
];

const COLORS = ['#9b87f5', '#F2FCE2', '#D3E4FD', '#FEF7CD'];

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement = {
        id: announcements.length + 1,
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        priority: newAnnouncement.priority,
        date: new Date().toISOString().split('T')[0],
        author: user?.fullName || 'Admin'
      };
      
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', priority: 'medium' });
      setShowAnnouncementModal(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-[35vh]">
        <Loader size={48} />
      </div>
    );
  }

  if (user.role === 'employee') {
    return (
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Welcome back, {user.fullName}
          </div>
        </div>

        {/* Announcements Section for Employees */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Megaphone className="h-5 w-5 text-hr-purple-400" />
              <CardTitle>Company Announcements</CardTitle>
            </div>
            <CardDescription>
              Latest updates and announcements from management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-lg">{announcement.title}</h4>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{announcement.content}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>By: {announcement.author}</span>
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-lg bg-hr-purple-100 flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-hr-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Status</p>
                <h3 className="text-2xl font-bold">Present</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-lg bg-hr-green flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Leave Balance</p>
                <h3 className="text-2xl font-bold">12 Days</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-lg bg-hr-blue flex items-center justify-center mr-4">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Performance</p>
                <h3 className="text-2xl font-bold">Good</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-lg bg-hr-yellow flex items-center justify-center mr-4">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Payslip</p>
                <h3 className="text-2xl font-bold">Mar 2025</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Leave Overview</CardTitle>
              <CardDescription>Your leave requests this year</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {leaveData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Your attendance for the last 3 months</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#9b87f5" />
                  <Bar dataKey="leave" stackId="a" fill="#FEC6A1" />
                  <Bar dataKey="absent" stackId="a" fill="#D3E4FD" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, {user?.fullName}
        </div>
      </div>

      {/* Announcements Section for Admin */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Megaphone className="h-5 w-5 text-hr-purple-400" />
              <CardTitle>Company Announcements</CardTitle>
            </div>
            <Dialog open={showAnnouncementModal} onOpenChange={setShowAnnouncementModal}>
              <DialogTrigger asChild>
                <Button className="bg-hr-purple-300 hover:bg-hr-purple-400">
                  <Plus className="mr-2 h-4 w-4" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Create a new announcement that will be visible to all employees.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                      placeholder="Enter announcement title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                      placeholder="Enter announcement content"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAnnouncementModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAnnouncement}>
                      Create Announcement
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Manage company-wide announcements and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-lg">{announcement.title}</h4>
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{announcement.content}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>By: {announcement.author}</span>
                  <span>{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-lg bg-hr-purple-100 flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-hr-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
              <h3 className="text-2xl font-bold">108</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-lg bg-hr-green flex items-center justify-center mr-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Attendance Today</p>
              <h3 className="text-2xl font-bold">93%</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-lg bg-hr-blue flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Leaves</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 rounded-lg bg-hr-yellow flex items-center justify-center mr-4">
              <Briefcase className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Open Positions</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Employee Distribution</CardTitle>
            <CardDescription>
              Employees across different departments
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="count" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Leave Status</CardTitle>
            <CardDescription>
              Overview of current leave requests
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Weekly Attendance</CardTitle>
          <CardDescription>
            Attendance overview for the current week
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyAttendanceData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="present" stackId="a" fill="#9b87f5" />
              <Bar dataKey="absent" stackId="a" fill="#FEC6A1" />
              <Bar dataKey="leave" stackId="a" fill="#D3E4FD" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
