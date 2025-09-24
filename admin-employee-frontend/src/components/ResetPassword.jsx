import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/index";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Password rules
  const passwordRules = [
    { id: 1, text: "At least 6 characters", test: (p) => p.length >= 6 },
    { id: 2, text: "At least 1 number", test: (p) => /\d/.test(p) },
    {
      id: 3,
      text: "At least 1 special character (!@#$%^&*)",
      test: (p) => /[!@#$%^&*]/.test(p),
    },
    {
      id: 4,
      text: "At least 1 uppercase letter",
      test: (p) => /[A-Z]/.test(p),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check which rules are failed
    const failedRules = passwordRules.filter(
      (rule) => !rule.test(form.password)
    );
    if (failedRules.length > 0) {
      setErrors({ password: "Password does not meet all requirements" });
      return;
    }

    // Confirm password match
    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await API.post(`/reset/password/${token}`, {
        password: form.password,
        password_confirmation: form.confirmPassword, // Laravel expects this
      });

      toast.success(response.data.message || "Password reset successfully!");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.password?.join(", ") ||
        "Reset failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg space-y-1">
            <p className="text-gray-700 font-medium">Password must contain:</p>
            {passwordRules.map((rule) => (
              <p
                key={rule.id}
                className={`text-sm flex items-center ${
                  rule.test(form.password) ? "text-green-600" : "text-gray-500"
                }`}
              >
                {rule.test(form.password) ? (
                  <span className="mr-2">✔</span>
                ) : (
                  <span className="mr-2">✖</span>
                )}
                {rule.text}
              </p>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
