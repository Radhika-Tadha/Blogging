import BlogCard from "../component/BlogCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllBlogs() {
    const [blogs, setBlog] = useState([]); //empty array 
    // console.log("Fetched Blogs:", res.data);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/blog/my-blogs", {
                    withCredentials: true,
                });

                console.log("Fetched Blogs:", res.data);
                setBlog(res.data.blogs);

            } catch (err) {
                console.error("Fetch Blog failed", err.response?.data || err.message);
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
                <div className="container md-4">
                    <h3>My Blogs</h3>
                    <div className="row d-flex gap-3 d-flex align-items-center">
                        {blogs.map((blog) => (
                            <div className="col-md-4 col-lg-3 m-4 " key={blog._id}>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </div >

    )

}   