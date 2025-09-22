// Add this inside the Sidebar component instead of the array declarations
const menuConfig = {
  superadmin: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "employees", label: "Employees", icon: "👥" },
    { id: "departments", label: "Departments", icon: "🏢" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Password Settings", icon: "⚙️" },
  ],
  admin: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "employees", label: "Employees", icon: "👥" },
    { id: "departments", label: "Departments", icon: "🏢" },
    { id: "services", label: "Services", icon: "🛠️" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Password Settings", icon: "⚙️" },
  ],
  employee: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "services", label: "Services", icon: "🛠️" },
    { id: "settings", label: "Password Settings", icon: "⚙️" },
  ],
};

// Then get menu items like this:
const getMenuItems = () => {
  if (!user || !user.role) return menuConfig.employee; // default fallback
  return menuConfig[user.role.toLowerCase()] || menuConfig.employee;
};

const menuItems = getMenuItems();
