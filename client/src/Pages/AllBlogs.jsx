import BlogCard from "../component/BlogCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../component/LoadingSpinner"; // adjust path

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function AllBlogs() {
    const query = useQuery();
    const searchTerm = query.get("search") || "";
    const [blogs, setBlogs] = useState([]); //empty array 
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {

            try {
                setLoading(true);
                const url = searchTerm
                    ? `http://localhost:8000/api/blog?search=${searchTerm}`
                    : `http://localhost:8000/api/blog/all`;
                const res = await axios.get(url, { withCredentials: true });

                // console.log(searchTerm);
                setBlogs(res.data.blogs || res.data);

                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            }
        };

        if (!currentUser) {
            // Load current logged-in user from cookies
            axios.get("http://localhost:8000/api/auth/user", { withCredentials: true })
                .then(res => setCurrentUser(res.data.user))
                .catch(err => console.log("Not logged in", err));
        }
        fetchBlogs();
    }, [searchTerm]);

    if (!Array.isArray(blogs) || blogs.length === 0) {
        return (
            <h3 className="text-center mt-5">
                {searchTerm ? "No blogs found for your search." : "No blogs available. Please create one!"}
            </h3>
        );
    }
    return (
        <div>
            <>
                <div className="container mt-4">
                    {loading ? (
                        <LoadingSpinner />
                    ) : blogs.length === 0 ? (
                        <h3 className="text-center mt-5">
                            {searchTerm
                                ? "No blogs found for your search."
                                : "No blog available.please create one!"}
                        </h3>
                    ) : (
                        <>
                            <h3 className="text-start" style={{ color: "#BB5A3A" }}>All Blogs</h3>
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
                        </>
                    )}
                </div>
            </>
        </div >
    );
}  
