import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useSelector } from "react-redux";

const AddEmployee = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const admin = useSelector((state) => state.auth.user); // logged-in admin

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    service_id: "",
    service_name: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      alert("Employee added successfully!");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        service_id: "",
        service_name: "",
        category: "",
        description: "",
      });
      const payload = {
        ...formData,
        created_by: admin?.id || admin?.userId || "unknown", // send admin id
      };
      console.log("Submitted Data:", payload);
    } catch (error) {
      alert(error.message);
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
        className={`w-full max-w-5xl grid grid-cols-2 gap-6 p-10 rounded-lg shadow-lg ${
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

        {/* Email (optional) */}
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

        {/* Phone (optional) */}
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

        {/* Role Dropdown */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Service Name */}
        <div>
          <label className="block font-medium mb-1">Service Name</label>
          <input
            type="text"
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-300"
                : "bg-gray-100 text-black placeholder-gray-600"
            }`}
            placeholder="Enter service name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-300"
                : "bg-gray-100 text-black placeholder-gray-600"
            }`}
            placeholder="Enter category"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-300"
                : "bg-gray-100 text-black placeholder-gray-600"
            }`}
            placeholder="Enter description"
          ></textarea>
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
