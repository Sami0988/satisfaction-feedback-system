export const getDashboardPath = (user) => {
  if (!user) return "/";

  // Force password change if flagged
  if (user.force_password_change || user.password === "1234") {
    return "/password-settings";
  }

  // Role-based redirect
  const role = user.role; // just use the string from backend
  switch (role) {
    case "Super Admin":
      return "/superadmin/dashboard";
    case "Department Admin":
      return "/admin/dashboard";
    case "staff": // your employee/staff role
      return "/employee/dashboard";
    default:
      return "/";
  }
};
