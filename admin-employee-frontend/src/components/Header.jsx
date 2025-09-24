import { useContext, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";

const Header = ({ user, toggleSidebar, isSidebarOpen }) => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    console.log("User data in Header:", user);
  }, [user]);

  // normalize role string: lowercase, remove spaces and non-alphanumeric chars
  const normalize = (s) =>
    s
      ? s
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
      : "";

  const getDashboardTitle = (role) => {
    const r = normalize(role);
    if (!r) return "Dashboard";

    if (r.includes("super") && r.includes("admin"))
      return "Super Admin Dashboard";
    if (r.includes("department") && r.includes("admin"))
      return "Department Head Dashboard";
    if (r.includes("employee") || r.includes("staff"))
      return "Employee Dashboard";
    if (r.includes("admin")) return "Admin Dashboard";
    return "Dashboard";
  };

  // prefer name fields that exist in your payload
  const displayName =
    user?.name || user?.full_name || user?.fullName || user?.email || "User";

  return (
    <header
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm py-3 px-4 border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md md:hidden"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>

          <h1
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {getDashboardTitle(user?.role)}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-full ${
              isDarkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-yellow-400"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {displayName}
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="relative group">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
                alt="Profile"
              />

              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50`}
              >
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Profile
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Settings
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
