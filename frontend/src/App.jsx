import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import RegisterForm from "./componats/RegisterForm";
import User from "./componats/User";
import ProtectedRoute from "./componats/ProtectedRoute";
import LoginForm from "./componats/LoginFrom";


const App = () => {
  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem("isRegistered") === "true"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleRegistration = () => {
    setIsRegistered(true);
    localStorage.setItem("isRegistered", "true");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <User/>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <LoginForm handleLogin={handleLogin} />
            )
          }
        />

        {/* Register route */}
        <Route
          path="/register"
          element={
            isRegistered ? (
              <Navigate to="/login" />
            ) : (
              <RegisterForm handleRegistration={handleRegistration} />
            )
          }
        />

        {/* Protected User route */}
        <Route
          path="/user"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
