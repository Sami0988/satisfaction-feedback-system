import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import ThemeContext from "../../../context/ThemeContext";

const AddEmployee = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState("addEmployee");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    service_id: "",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch services from API
  useEffect(() => {
    fetch("/api/services") // replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add employee");

      alert("Employee added successfully!");
      setFormData({
        full_name: "",
        email: "",
        password: "",
        service_id: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          user={user}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>

          <form
            onSubmit={handleSubmit}
            className={`max-w-lg p-6 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="mb-4">
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Service</label>
              <select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.service_id} value={service.service_id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Employee
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddEmployee;
