import React, { useState } from "react";
const WelcomePage=()=> {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setSubmittedName(name.trim());
    setName("");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Card */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-300 text-white flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-4xl font-extrabold mb-6 tracking-wide">
            Welcome to Ethiopian Civil Service Commission
          </h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
            alt="Hello Avatar"
            className="w-36 h-36 mb-6 drop-shadow-lg"
          />
          <p className="text-lg opacity-90">We're glad to see you here!</p>
        </div>

        {/* Right Card */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Enter Your Name</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(false); // Clear error on change
              }}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              aria-invalid={error}
              aria-describedby="name-error"
            />
            {error && (
              <p
                id="name-error"
                className="text-red-600 mt-1 text-sm animate-fade-in"
                role="alert"
              >
                Please enter your name.
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Next
            </button>
          </form>
          {submittedName && (
            <p className="mt-6 text-green-600 text-lg font-medium">
              Hello, {submittedName}! 👋
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


export default WelcomePage;

