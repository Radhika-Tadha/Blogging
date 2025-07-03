import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CreateBlog() {

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null,
    });



    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = new FormData();
        blogData.append("title", formData.title);
        blogData.append("content", formData.content);
        if (formData.image) {
            blogData.append("image", formData.image)
        }

        try {
            const res = await axios.post("http://localhost:8000/api/blog/create", blogData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.success) {
                alert("Blog Created!");
            } else {
                alert("Failed to create blog");
            }
        } catch (err) {
            alert("Failed to create", err);
            console.error("Blog create error:", err.response?.data || err.message);
        }
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div><>
            <div className="container">
                <div className="container mt-5" style={{ maxWidth: "600px" }}>
                    <h3 className="mb-4">📝 Create New Blog</h3>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3 text-start">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" name="title" placeholder="Enter blog title" onChange={handleChange} required />
                        </div>

                        <div className="mb-3 text-start">
                            <label className="form-label">Content</label>
                            <textarea className="form-control" name="content" rows="5" placeholder="Write your blog here..." onChange={handleChange} required ></textarea>
                        </div>

                        <div className="mb-3 text-start">
                            <label className="form-label">Image (optional)</label>
                            <input type="file" className="form-control" name="image" onChange={handleChange} />
                        </div>

                        <button className="btn btn-success">🚀 Publish Blog</button>
                    </form>
                </div>

            </div>
        </></div>
    )
}