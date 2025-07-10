import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import BlogCard from "../component/BlogCard";

// import BlogCard from "../component/BlogCard";

export default function BlogDetail({ handleDelete, isOwnBlog }) {
    const [likes, setLikes] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState('');
    const [submittedComment, setSubmittedComment] = useState("");


    const handleSend = () => {
        if (comment.trim() !== "") {
            setSubmittedComment(comment);
            setComment(""); // Clear input
        }
    };

    const handleLike = () => {
        setLikes(likes + 1); // or toggle later
    };



    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/blog/${id}`)
            .then((res) => setBlog(res.data.blog))
            .catch((err) => console.error("Error loading blog:", err));

        axios.get(`http://localhost:8000/api/auth/user`)
            .then((res) => setUser(res.data.user))
            .catch((err) => console.error("Erroe Loadding user:", err));
    }, [id]);

    if (!blog) return <h4 className="text-center mt-5">Loading blog...</h4>;

    const imageUrl = user?.image
        ? `http://localhost:8000/uploads/${user.image}` // ✅ Adjust based on your multer storage path
        : null;


    // return...................................................
    return (
        <>
            <style>{`
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
        `}</style>

            <div className="container mt-5" style={{ maxWidth: "60%" }}>
                <div className=" row ">
                    <div className="col-sm-8 mr-2">
                        <h2 className="text-start">{blog.title}</h2>
                        <p className="text-muted  text-start">
                            By {blog.author?.name || "Unknown Author"} | {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })} </p>

                        {/* {isOwnBlog && (
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
                        )} */}

                        {blog.image && (
                            <img src={`http://localhost:8000/uploads/${blog.image}`}
                                alt="blog"
                                className="img-fluid my-3 mb-4"
                                style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }} />
                        )}

                        <p className="mt-3 text-start">{blog.content}</p>

                        {/* comment section */}
                        <div className="comment-section">
                            <label className="form-control border-0 border-bottom rounded-0 shadow-none text-start" name="comment">Comments</label><br></br>
                            <div className="input-group">
                                <input type="text" className="form-control p-3" id="comment" name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comments"
                                    style={{ width: "90%" }} />

                                <span className="input-group-text bg-white" onClick={handleSend}>
                                    <i className="bi bi-send" style={{ cursor: "pointer" }}></i>
                                </span>
                            </div>
                            <div className="row">
                                <div className="comment-show mt-2 col-sm-1 d-flex align-items-center gap-2">
                                    {user?.image && (
                                        <img
                                            src={`http://localhost:8000/uploads/${user.image}`}
                                            alt="Profile"
                                            className="rounded-circle"
                                            width="30"
                                            height="30"
                                            style={{ objectFit: "cover" }}
                                        />
                                    )}
                                </div>
                                <div className="col-sm-6 mt-3 d-grid text-start">
                                    {user?.name && (
                                        <div className="comment-name">
                                            <h6 className="mb-0">{user.name}</h6>
                                        </div>
                                    )}
                                    <p>{submittedComment ? submittedComment : "Nothing to Preview"}</p>
                                    <div className="d-flex align-items-center gap-2">
                                        <button className="btn btn-sm btn-outline-danger" onClick={handleLike}>
                                            ❤️ Like
                                        </button>
                                        <span className="text-muted" style={{ fontSize: "0.9rem" }}>{likes} likes</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="profile-container col-sm-4 mt-5 p-2">
                        <div className="container mt-5 p-3" style={{ width: "90%", height: "600px", backgroundColor: "#F1E7E7" }}>
                            {user?.image && (
                                <img
                                    src={`http://localhost:8000/uploads/${user.image}`}
                                    alt="Profile"
                                    className="mt-5"
                                    width="200"
                                    height="200"
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                            <div className="hello text-start mt-4">
                                <h3>Hi, thanks for <br /> stopping by! </h3>
                            </div>
                            <div className="para text-start mt-3">
                                <p>I'm passionate about sharing knowledge and ideas through writing.
                                    This blog is a space where I express thoughts, tutorials, or personal stories to inspire and inform readers like you.</p>
                            </div>
                            <div className="redemore text-start">
                                <button type="submit" className="btn custom-readmore" onClick={() => navigate("/about")} > Read More</button>
                            </div>
                        </div>

                    </div>
                </div><br></br>

            </div >
        </>
    );
}
