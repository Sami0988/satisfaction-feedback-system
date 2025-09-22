import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux"

const Sidebar = ({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();


  const navigate = useNavigate();
  //const dispatch = useDispatch();

const handleLogout = () => {
  console.log("Logging out...");
  // Clear redux state
  //dispatch(logout());
  dispatch(logoutUser()); // clears auth + localStorage
  navigate("/"); // go to login page
};
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "employees", label: "Employees", icon: "👥" },
    { id: "services", label: "Services", icon: "🛠️" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "settings", label: "Password Settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed md:relative w-64 flex-shrink-0 min-h-screen ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1
            className={`text-lg font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Admin Panel
          </h1>
          <button onClick={toggleSidebar} className="md:hidden p-1 rounded-md">
            ✕
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                  className={`w-full flex items-center p-2 rounded-lg transition-colors text-sm ${
                    activeSection === item.id
                      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                      : `hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`
                  }`}
                >
                  <span className="mr-3 text-base">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center p-2 rounded-lg text-sm ${
              isDarkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">🔒</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
