import React, { useState } from "react";
import { User, Calendar, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Spinner } from "@chakra-ui/react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); 

    try {
      const response = await axios.post(
        "https://quantum-it-innovation-1.onrender.com/register",
        {
          name,
          dateOfBirth,
          email,
          password,
        }
      );

      console.log("Registration successful", response.data);
      setLoading(false); 
      navigate("/login"); 
    } catch (err) {
      console.error("Registration failed", err);
      setError("Registration failed. Please try again."); 
      setLoading(false); 
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
          {error && <div className="text-red-500 text-center">{error}</div>}{" "}
          {/* Error message */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 pl-10 bg-slate-700 border border-slate-600 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <div className="relative">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="w-full px-3 py-2 pl-10 bg-slate-700 border border-slate-600 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 pl-10 bg-slate-700 border border-slate-600 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
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
              className="w-full py-2 px-4 bg-teal-400 text-white font-bold rounded hover:bg-teal-500 transition duration-300 disabled:opacity-50"
              disabled={loading} 
            >
              {loading ? <Spinner size="sm" /> : "REGISTER"}{" "}
          
            </button>
          </form>
          <div className="text-center text-gray-400">
            <p>Already registered?</p>
            <Link to="/login" className="text-teal-400 hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
