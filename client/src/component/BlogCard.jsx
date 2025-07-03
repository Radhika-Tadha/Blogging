import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";


export default function BlogCard() {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/blog/my-blogs", {
                    headers: {
                        withCredentials: true,
                    },
                });
                console.log("Fetched Blog:", res.data.blog);
                setBlog(res.data.blog);
            } catch (err) {
                console.error("Fetch Blog failed", err.response?.data || err.message);
            }
        };
        fetchBlog();

    }, []);
    if (!blog) {
        return <h3 className="text-center mt-5">Please check your blog created.</h3>;
    }
    const imageUrl = blog.image
        ? `http://localhost:8000/uploads/${blog.image}` 
        : null ;

    return (
        <div>
            <>
                <div className="card" style="width: 18rem;">
                    <img src={imageUrl} alt="BlogImage" className="card-img-top" style={{ objectFit: "cover" }} />
                    <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
                        <p className="card-text">{blog.content}</p>
                        
                        <button className="btn btn-primary btn-sm position-absolute" style={{ top: '15px', right: '15px' }} > Update </button>

                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            </>
        </div>

    )
}