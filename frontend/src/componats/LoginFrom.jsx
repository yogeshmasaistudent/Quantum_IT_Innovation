import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });

    try {
      const response = await fetch("http://localhost:3030/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      
      localStorage.setItem("token", data.token);
      handleLogin(); 
      navigate("/user"); 
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-500">
      <div className="w-full max-w-md space-y-4 p-8">
        <div className="bg-slate-800 rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 pl-10 bg-slate-700 border border-slate-600 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 pl-10 bg-slate-700 border border-slate-600 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-teal-400 text-white font-bold rounded hover:bg-teal-500 transition duration-300"
            >
              LOGIN
            </button>
          </form>
          <div className="text-center text-gray-400">
            <p>Not registered yet?</p>
            <Link to="/register" className="text-teal-400 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
