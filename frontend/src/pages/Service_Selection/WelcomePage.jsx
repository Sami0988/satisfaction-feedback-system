import React, { useState } from "react";

const WelcomePage=()=> {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState(null);
 const [error, setError] = useState(false);


const handleSubmit = (e) => {
  e.preventDefault();

  const trimmedName = name.trim();

  // Validation: check if name is too short or contains numbers
  const hasNumbers = /\d/.test(trimmedName);
  if (trimmedName.length < 3 || hasNumbers) {
    setError(true);
    return;
  }

  setError(false);
  setSubmittedName(trimmedName);
  setName("");
};



  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* ✅ Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')", // Your local image path
        }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* ✅ Foreground Content */}
      <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Card */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-300 text-white flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-4xl font-extrabold mb-6 tracking-wide">
            Welcome to Ethiopian Civil Service Commission
          </h2>
<img
  src="https://thumbs.dreamstime.com/b/cheerful-cartoon-man-dark-hair-beard-colorful-shirt-waving-hello-full-body-vector-illustration-friendly-man-378936847.jpg"
  alt="Welcome Avatar"
  className="w-48 h-auto mb-6 drop-shadow-lg"
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
             Next
            </button>
            {error && (
  <p className="mt-4 text-red-600 font-medium">
    Please enter a valid name.
  </p>
)}

          </form>
          {submittedName && (
  <p className="mt-6 text-green-600 text-lg font-medium">
    Hello, {submittedName}! Welcome to FCSC 👋
  </p>
          )}
        </div>
      </div>
    </div>
  );
}


export default WelcomePage;
