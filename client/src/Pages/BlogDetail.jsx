import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import BlogCard from "../component/BlogCard";

export default function BlogDetail() {
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
        <div className="container mt-5" style={{ maxWidth: "80%" }}>
            <div className=" row">
                <div className="col-sm-8">
                    <h2 className="text-start">{blog.title}</h2>
                    <p className="text-muted  text-start">
                        By {blog.author?.name || "Unknown Author"} | {new Date(blog.createdAt).toLocaleDateString()} </p>

                    {blog.image && (
                        <img src={`http://localhost:8000/uploads/${blog.image}`}
                            alt="blog"
                            className="img-fluid my-3"
                            style={{ maxHeight: "500px", objectFit: "cover", width: "90%" }} />
                    )}

                    <p>{blog.content}</p>
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
                            </div>

                        </div>
                    </div>
                </div>
            </div><br></br>
            {/* <div className="profile-container col-sm-4">
                {user?.image && (
  <img
    src={`http://localhost:8000/uploads/${user.image}`}
    alt="Profile"
    className="rounded-circle"
    width="50"
    height="50"
    style={{ objectFit: "cover" }}
  />
)}

            </div> */}
        </div>
    );
}
