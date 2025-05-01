
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import EmployeeDirectory from "./pages/employees/EmployeeDirectory";
import EmployeeProfile from "./pages/employees/EmployeeProfile";
import LeaveManagement from "./pages/leave/LeaveManagement";
import AttendanceManagement from "./pages/attendance/AttendanceManagement";
import DepartmentDirectory from "./pages/departments/DepartmentDirectory";
import DesignationDirectory from "./pages/designations/DesignationDirectory";

// Admin Pages
import PayrollManagement from "./pages/admin/PayrollManagement";
import RecruitmentManagement from "./pages/admin/RecruitmentManagement";
import PerformanceManagement from "./pages/admin/PerformanceManagement";
import HolidayManagement from "./pages/admin/HolidayManagement";
import JobManagement from "./pages/admin/JobManagement";

// Employee Pages
import MyProfile from "./pages/employee/MyProfile";
import MyLeaves from "./pages/employee/MyLeaves";
import MyAttendance from "./pages/employee/MyAttendance";
import MyDocuments from "./pages/employee/MyDocuments";
import PayslipList from "./pages/payroll/PayslipList";
import PerformanceDashboard from "./pages/performance/PerformanceDashboard";

// Providers
import { AuthProvider } from "./context/AuthContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              
              {/* HR and Admin Routes */}
              <Route path="employees" element={<EmployeeDirectory />} />
              <Route path="employees/:id" element={<EmployeeProfile />} />
              <Route path="departments" element={<DepartmentDirectory />} />
              <Route path="designations" element={<DesignationDirectory />} />
              <Route path="leave" element={<LeaveManagement />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              <Route path="payroll" element={<PayrollManagement />} />
              <Route path="recruitment" element={<RecruitmentManagement />} />
              <Route path="jobs" element={<JobManagement />} />
              <Route path="performance" element={<PerformanceManagement />} />
              <Route path="holidays" element={<HolidayManagement />} />
              
              {/* Employee Routes */}
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="my-leaves" element={<MyLeaves />} />
              <Route path="my-attendance" element={<MyAttendance />} />
              <Route path="my-documents" element={<MyDocuments />} />
              <Route path="my-payslips" element={<PayslipList />} />
              <Route path="my-performance" element={<PerformanceDashboard />} />
              <Route path="help-desk" element={<NotFound />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
