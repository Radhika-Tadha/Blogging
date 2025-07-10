
import React from 'react';
// import home1 from "../Assets/home3.jpg";
import img1 from "../Assets/home22.jpeg";
import img2 from "../Assets/home11.jpg";
import img3 from "../Assets/home3.jpg";

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



  if (!user) {
    return <h3 className="text-center mt-5">Unauthorized. Please login.</h3>;
  }

  return (
    <>
      <style>{`
    .hover-img:hover{
    transform: scale(1.05);
    transition: transform 0.4s ease;
    }
    `
      }</style>
      <div className="container-fluid px-2 mt-5">
        <div className="row gx-3 gy-4 justify-content-center">
          {[img1, img2, img3].map((imgSrc, index) => (
            <div key={index} className="img col-12 col-md-4">
              <img
                src={imgSrc}
                alt={`Image ${index + 1}`}
                className="img-fluid hover-img"
                style={{
                  height: "600px",
                  objectFit: "cover",
                  width: "100%",
                }}></img>
            </div>
          ))}
        </div>
      </div>

      {/* Blog section */}


      <div className="container mt-5">
        <h2 className="mb-4">My Blog </h2>
        <button type='submit' className='btn btn-danger' onClick={() => { navigate("/AllBlogs") }}>All Blogs</button>

        {/* <div className="card">
          <div className="card-body">
            <h5 className="card-title">Dashboard Overview</h5>
            <p className="card-text">This is your user dashboard where you can see recent activity or personal info.</p>
            <ul>
              <li>Email: {user.email}</li>
              <li>User ID: {user._id}</li>
            </ul>
          </div>
        </div> */}
      </div>
    </>
  );
}
