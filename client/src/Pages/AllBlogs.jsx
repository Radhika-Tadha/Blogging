import BlogCard from "../component/BlogCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllBlogs() {
    const [blogs, setBlogs] = useState([]); //empty array 
    const [currentUser, setCurrentUser] = useState(null);
    // console.log("Fetched Blogs:", res.data);

    useEffect(() => {
        // Load all blogs
        axios.get("http://localhost:8000/api/blog/all",{ withCredentials:true})
            .then(res => setBlogs(res.data.blogs))
            .catch(err => console.error("Error fetching blogs:", err));

        // Load current logged-in user from cookies
        axios.get("http://localhost:8000/api/auth/user", { withCredentials: true })
            .then(res => setCurrentUser(res.data.user))
            .catch(err => console.log("Not logged in",err));

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
                    <h2>All Blogs</h2>
                    <div className="row">
                        {blogs.map(blog => (
                            <div className="col-md-4 col-lg-3 m-4" key={blog._id}>
                                <BlogCard
                                    blog={blog}
                                    isOwnBlog={currentUser && currentUser._id === blog.author._id}
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* <div className="container md-4">
                    <h3>The Feed</h3>
                    <div className="row d-flex gap-3 d-flex align-items-center">
                        {blogs.map((blog) => (
                            <div className="col-md-4 col-lg-3 m-4 " key={blog._id}>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                </div> */}
            </>
        </div >

    )

}   