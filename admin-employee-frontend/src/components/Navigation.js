import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/AuthSlice"

const Navigation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-xl font-semibold">
              Satisfaction Feedback System
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-indigo-100">Welcome, {user?.name}</span>
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={user?.avatar}
              alt=""
            />
            <button
              onClick={handleLogout}
              className="text-indigo-100 hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
