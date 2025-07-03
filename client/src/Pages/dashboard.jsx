
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    // Fetch user from cookie-authenticated backend
    axios.get("http://localhost:8000/api/auth/me", {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data.user);
    })
    .catch(err => {
      console.error("User fetch failed:", err);
      navigate("/login");
    });
  }, [navigate]);

  // const handleLogout = async() => {
  //   try {
  //     await axios.post("http://localhost:8000/api/auth/logout", {}, {
  //       withCredentials: true // ✅ send cookie to allow clearing it
  //     });
  //     setUser(null);
  //   navigate("/login");
  //    } catch (err) {
  //     console.error("Logout failed:", err);
  //     alert("Logout failed");
  //   }
  // };

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
            <li>User ID: {user._id}</li>
          </ul>
          {/* <button className="btn btn-danger mt-3" onClick={handleLogout}> */}
            {/* Logout */}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
}
