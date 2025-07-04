import React from "react";
import { useNavigate } from 'react-router-dom';


export default function BlogCard({ blog }) {
    const navigate = useNavigate();

    return (

        <>
            <div className="card" style={{ width: "20rem" }}>
                <img src={`http://localhost:8000/uploads/${blog.image || "dafault.png"}`}
                    alt="BlogImage"
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                    <h2 className="card-title">{blog.title || "Untitled"}</h2>
                    <p className="card-text">{blog.content?.slice(0, 100) || "No content."}</p>

                    <button className="btn btn-primary btn-sm position-absolute"
                        style={{ top: '15px', right: '15px' }}
                        onClick={() => navigate("/edit", { state: { blogToEdit: blog } })} >
                        Update </button>

                </div>
            </div>
        </>

    )
}