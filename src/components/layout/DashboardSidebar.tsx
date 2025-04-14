
import { 
  Users, LayoutDashboard, Calendar, ClipboardCheck, 
  DollarSign, Briefcase, Award, Settings, LogOut 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export function DashboardSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define menu items based on user role
  const mainMenuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      url: '/dashboard',
    },
    {
      title: 'Employees',
      icon: Users,
      url: '/dashboard/employees',
    },
    {
      title: 'Leave Management',
      icon: Calendar,
      url: '/dashboard/leave',
    },
    {
      title: 'Attendance',
      icon: ClipboardCheck,
      url: '/dashboard/attendance',
    },
  ];

  // Admin and HR specific menu items
  const adminMenuItems = user?.role !== 'employee' ? [
    {
      title: 'Payroll',
      icon: DollarSign,
      url: '/dashboard/payroll',
    },
    {
      title: 'Recruitment',
      icon: Briefcase,
      url: '/dashboard/recruitment',
    },
    {
      title: 'Performance',
      icon: Award,
      url: '/dashboard/performance',
    },
  ] : [];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center px-4 py-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-hr-purple-300 flex items-center justify-center">
              <span className="font-bold text-white text-lg">H</span>
            </div>
            <span className="text-xl font-bold">HR Nexus</span>
          </div>
          <div className="ml-auto lg:hidden">
            <SidebarTrigger />
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button 
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center"
                    >
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {adminMenuItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button 
                        onClick={() => navigate(item.url)}
                        className="w-full flex items-center"
                      >
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={() => navigate('/dashboard/settings')}
                    className="w-full flex items-center"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center text-red-500 hover:text-red-600 transition-colors p-2"
          >
            <LogOut size={18} className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
