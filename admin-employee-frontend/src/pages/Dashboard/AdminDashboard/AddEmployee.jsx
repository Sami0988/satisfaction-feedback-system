import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeAndService,
  fetchDepartmentData,
} from "../../../redux/slices/departmentHeadSlice";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();

  // Fetch services from Redux
  const services = useSelector((state) => state.departmentHead.services || []);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    service_id: "",
  });

  useEffect(() => {
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.service_id) {
      return toast.error("Full name and service are required.");
    }

    try {
      const payload = {
        employee: {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          role: "staff",
        },
        service: {
          service_id: formData.service_id, // send only selected service id
        },
      };

      await dispatch(addEmployeeAndService(payload)).unwrap();
      toast.success("Employee added successfully!");

      // Reset form
      setFormData({ full_name: "", email: "", phone: "", service_id: "" });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(`Failed to add employee: ${message}`);
    }
  };

  return (
    <div
      className={`flex items-center justify-center p-6 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-3xl grid grid-cols-2 gap-6 p-10 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="col-span-2 text-2xl font-bold mb-4 text-center">
          Add New Employee
        </h2>

        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-300"
                : "bg-gray-100 text-black placeholder-gray-600"
            }`}
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email (optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-300"
                : "bg-gray-100 text-black placeholder-gray-600"
            }`}
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone (optional)</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-300"
                : "bg-gray-100 text-black placeholder-gray-600"
            }`}
            placeholder="Enter phone number"
          />
        </div>

        {/* Role (fixed) */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <input
            type="text"
            name="role"
            value="staff"
            readOnly
            className="w-full p-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Service Name (dropdown from backend) */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Service Name</label>
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.service_id} value={service.service_id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
