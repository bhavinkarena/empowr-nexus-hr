
import { useState, useEffect } from "react";
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

// Employee Pages
import MyProfile from "./pages/employee/MyProfile";
import MyLeaves from "./pages/employee/MyLeaves";
import MyAttendance from "./pages/employee/MyAttendance";

// Providers
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

// Main loader wrapper
function AppWithLoader() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hr-purple-300"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* HR and Admin Routes */}
          <Route path="employees" element={<EmployeeDirectory />} />
          <Route path="employees/:id" element={<EmployeeProfile />} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          
          {/* Employee Routes */}
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="my-leaves" element={<MyLeaves />} />
          <Route path="my-attendance" element={<MyAttendance />} />
          <Route path="my-documents" element={<NotFound />} /> {/* Placeholder for future implementation */}
          <Route path="my-payslips" element={<NotFound />} /> {/* Placeholder for future implementation */}
          <Route path="my-performance" element={<NotFound />} /> {/* Placeholder for future implementation */}
          <Route path="help-desk" element={<NotFound />} /> {/* Placeholder for future implementation */}
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrap with providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppWithLoader />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

