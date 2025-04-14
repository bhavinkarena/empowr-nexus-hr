
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
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Clock, Users, Calendar, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Mock data for charts
const departmentData = [
  { name: "Engineering", count: 42 },
  { name: "Sales", count: 28 },
  { name: "Marketing", count: 18 },
  { name: "HR", count: 8 },
  { name: "Finance", count: 12 },
];

const attendanceData = [
  { day: 'Mon', present: 85, absent: 10, leave: 5 },
  { day: 'Tue', present: 88, absent: 7, leave: 5 },
  { day: 'Wed', present: 90, absent: 5, leave: 5 },
  { day: 'Thu', present: 87, absent: 8, leave: 5 },
  { day: 'Fri', present: 82, absent: 10, leave: 8 },
];

const COLORS = ['#9b87f5', '#F2FCE2', '#D3E4FD', '#FEF7CD'];

const leaveData = [
  { name: 'Approved', value: 28 },
  { name: 'Pending', value: 12 },
  { name: 'Rejected', value: 5 },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, {user?.fullName}
        </div>
      </div>

      {/* Stats overview */}
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
      
      {/* Charts */}
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
                <Tooltip />
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
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Weekly Attendance Chart */}
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
              data={attendanceData}
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
              <Tooltip />
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
