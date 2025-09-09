// Demo users for login
export const demoUsers = {
  admin: {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    department: "Management",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  employee: {
    id: 2,
    name: "Employee User",
    email: "employee@example.com",
    password: "employee123",
    role: "employee",
    department: "Operations",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  employee: {
    id: 3,
    name: "Super Admin User",
    email: "super@gmail.com",
    password: "12345",
    role: "superadmin",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
};

// Demo data for admin dashboard
export const adminDashboardData = {
  stats: [
    { title: "Total Users", value: 152, icon: "👥", change: "+12%" },
    { title: "Pending Requests", value: 23, icon: "📋", change: "-5%" },
    { title: "Completed Tasks", value: 89, icon: "✅", change: "+18%" },
    { title: "System Health", value: "100%", icon: "❤️", change: "0%" },
  ],
  recentActivities: [
    {
      id: 1,
      time: "2 hours ago",
      description: "New user registration: John Doe",
    },
    {
      id: 2,
      time: "5 hours ago",
      description: "System backup completed successfully",
    },
    { id: 3, time: "1 day ago", description: "Performance report generated" },
  ],
};

// Demo data for employee dashboard
export const employeeDashboardData = {
  stats: [
    { title: "Assigned Tasks", value: 15, icon: "📝", change: "+3" },
    { title: "Completed", value: 8, icon: "✅", change: "+2" },
    { title: "Pending", value: 7, icon: "⏳", change: "+1" },
    { title: "Performance", value: "87%", icon: "📊", change: "+5%" },
  ],
  tasks: [
    {
      id: 1,
      title: "Project Analysis",
      due: "Tomorrow",
      status: "in-progress",
    },
    { id: 2, title: "Client Meeting", due: "Today", status: "completed" },
    { id: 3, title: "Report Submission", due: "In 3 days", status: "pending" },
  ],
};
