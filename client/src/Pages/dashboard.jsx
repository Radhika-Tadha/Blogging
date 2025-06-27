// src/Pages/UserDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <h3 className="text-center mt-5">Unauthorized. Please login.</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user.name || user.email}!</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Dashboard Overview</h5>
          <p className="card-text">This is your user dashboard where you can see recent activity or personal info.</p>
          <ul>
            <li>Email: {user.email}</li>
            <li>User ID: {user._id || '123456'}</li>
          </ul>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
