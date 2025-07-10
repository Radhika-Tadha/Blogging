import React from "react";
import axios from "axios";
import Default from "../Assets/default.png";
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
            <style>{`
        .custom-border {
            // border: 0.1px solid #180A0A; 
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

        .card-hover:hover {
            color: #BB5A3A;
            cursor: pointer;
            }
        
        `
            }</style>
            <div className="card custom-border rounded-0" style={{ width: "19rem" }}>
                <img src={blog.image ? `http://localhost:8000/uploads/${blog.image}` : Default}
                    alt="BlogImage"
                    className="card-img-top rounded-0"
                    style={{ objectFit: "cover", height: "230px" }}
                    onError={(e) => { e.target.src = Default; }}
                />
                <div className="card-body card-hover">
                    {/* login user show  */}
                    <div className="row">
                        <div className="text-start col-sm-6">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </div>
                        {isOwnBlog && (
                            <div className="dropdown text-end col-sm-6">
                                <button className="btn btn-light btn-sm"
                                    type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ border: "none", fontSize: "20px", lineHeight: "1" }}>
                                    ⋮
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={() => navigate(`/edit/${blog._id}`, { state: { blogToEdit: blog } })}>Edit</button></li>
                                    <li><button className="dropdown-item" onClick={handleDelete}>Delete</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* blog title  */}
                    <div className="BlogDetail" onClick={() => navigate(`/blog/${blog._id}`)} style={{ cursor: "pointer" }}>

                        <h3 className="card-title">{blog.title || "Untitled"}</h3>
                        <p className="card-text" style={{ fontFamily: "system-ui" }}>{blog.content?.slice(0, 100) || "No content."}..</p>
                    </div>

                </div>
            </div >
        </>

    )
}