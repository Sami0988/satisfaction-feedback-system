import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../redux/slices/departmentHeadSlice";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(ThemeContext);

  // ✅ Get services from Redux store
  const { services, loading, error } = useSelector(
    (state) => state.departmentHead
  );

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    service_id: "",
  });

  // ✅ Fetch services once when component mounts
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.service_id) {
      toast.error("Please select a service.");
      return;
    }

    console.log("Submitting Employee Data:", formData);
    toast.success("Employee submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-3xl grid grid-cols-2 gap-6 p-10 rounded-lg ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
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
              : "bg-white text-black placeholder-gray-600 border-gray-300"
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
              : "bg-white text-black placeholder-gray-600 border-gray-300"
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
              : "bg-white text-black placeholder-gray-600 border-gray-300"
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
          className="w-full p-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed border-gray-300"
        />
      </div>

      {/* Service Name (from backend) */}
      <div className="col-span-2">
        <label className="block font-medium mb-1">Service Name</label>
        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ${
            isDarkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="">Select a service</option>

          {loading ? (
            <option disabled>Loading services...</option>
          ) : error ? (
            <option disabled>Error loading services</option>
          ) : services.length > 0 ? (
            services.map((service) => (
              <option key={service.service_id} value={service.service_id}>
                {service.name}
              </option>
            ))
          ) : (
            <option disabled>No services available</option>
          )}
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
  );
};

export default AddEmployee;
