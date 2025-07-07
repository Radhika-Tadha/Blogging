import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import BlogDetail from "../Pages/BlogDetail";


export default function BlogCard({ blog, isOwnBlog }) {
    const navigate = useNavigate();

    // const handleBlogDetail = async(e)=>{
    //     navigate("/BlogDetail");
    // }
    const handleDelete = async (e) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this blog?");
        if (!isConfirmed) return;
        try {
            await axios.delete(`http://localhost:8000/api/blog/${blog._id}`, {
                withCredentials: true,
            });

            alert("Blog Deleted");
            navigate("/MyBlogs"); // or wherever you want to redirect
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Failed to delete blog.");
        }
    };

    return (

        <>
            <div className="card" style={{ width: "20rem" }}>
                <img src={`http://localhost:8000/uploads/${blog.image || "dafault.png"}`}
                    alt="BlogImage"
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                    {/* login user show  */}
                    {isOwnBlog && (
                        <div className="dropdown text-end">
                            <button className="btn btn-light btn-sm"
                                type="button" data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ border: "none", fontSize: "20px", lineHeight: "1" }}>
                                ⋮
                            </button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={() => navigate("/edit", { state: { blogToEdit: blog } })}>Edit</button></li>
                                <li><button className="dropdown-item" onClick={handleDelete}>Delete</button></li>
                            </ul>
                        </div>
                    )}

                    {/* blog title  */}
                    <div className="BlogDetail" onClick={() => navigate(`/blog/${blog._id}`)} style={{ cursor: "pointer" }}>

                        <h2 className="card-title">{blog.title || "Untitled"}</h2>
                        <p className="card-text" style={{ fontFamily: "system-ui" }}>{blog.content?.slice(0, 100) || "No content."}</p>
                    </div>

                </div>
            </div >
        </>

    )
}