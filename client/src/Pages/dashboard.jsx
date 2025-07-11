
import React from 'react';
// import home1 from "../Assets/home3.jpg";
import BlogCard from "../component/BlogCard";
import img1 from "../Assets/home22.jpeg";
import img2 from "../Assets/home11.jpg";
import img3 from "../Assets/home3.jpg";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [blogs, setBlog] = useState([]); //empty array
  const [currentUser, setCurrentUser] = useState(null);
  const contactRef = useRef(null);
  const location = useLocation();



  useEffect(() => {
    // for contact page
    if (location.hash === "#contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }



    const fetchBlog = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blog/my-blogs", {
          withCredentials: true,
        });
        // console.log("blog.author:", blogs.author);
        // console.log("Fetched Blogs:", res.data);
        setBlog(res.data.blogs);

      } catch (err) {
        console.error("Fetch Blog failed", err.response?.data || err.message);
      }
      try {
        const userRes = await axios.get("http://localhost:8000/api/auth/user", {
          withCredentials: true,
        });
        setCurrentUser(userRes.data.user);
        // console.log("Current User:", userRes.data.user);
      } catch (err) {
        console.error("User fetch failed:", err.response?.data || err.message);
      }
    };
    fetchBlog();

  }, [location]);

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return <h3 className="text-center mt-5">Please check your blog created.</h3>;
  }

  return (
    <>
      <style>{`
    .hover-img:hover{
    transform: scale(1.05);
    transition: transform 0.4s ease;
    }
    .custom-readmore {
           border: 1px solid #bb5a3a;
           color: #bb5a3a;
           background-color: transparent;
           border-radius: 0;
           padding: 8px 20px;
           transition: background-color 0.3s ease, color 0.3s ease;
        }
      .custom-readmore:hover {
           background-color: #bb5a3a;
           color: #ffff;
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

      <div className="container mt-4">
        <h3 className='fw-bold'>My Blog</h3>
        <div className="container mt-5 text-end">
          <button type='submit' className='btn custom-readmore rounded-0' onClick={() => { navigate("/MyBlogs") }}>See More</button>
        </div>
        <div className="row d-flex gap-3 d-flex align-items-center">
          {blogs.map((blog) => (
            <div className="col-md-4 col-lg-3 m-4 " key={blog._id}>
              <BlogCard blog={blog}
                isOwnBlog={currentUser && currentUser._id === (blog.author?._id || blog.author._id)}
              />
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
