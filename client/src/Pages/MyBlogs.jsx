import BlogCard from "../component/BlogCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBlogs() {
    const [blogs, setBlog] = useState([]); //empty array
    const [currentUser, setCurrentUser] = useState(null);

    // console.log("Fetched Blogs:", res.data);

    useEffect(() => {
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

    }, []);

    if (!Array.isArray(blogs) || blogs.length === 0) {
        return <h3 className="text-center mt-5">Please check your blog created.</h3>;
    }
    // const imageUrl = blog.image
    //     ? `http://localhost:8000/uploads/${blog.image}`
    //     : "dafault.png";
    return (
        <div>
            <>
                <div className="container mt-4">
                    <h3>The Feed</h3>
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
        </div >

    )

}   