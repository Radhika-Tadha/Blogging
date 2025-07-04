import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import USER from '../Assets/user.png';
import axios from 'axios';


export default function Navbar({ isLoggedIn, setIsLoggedIn, user, setUser }) {
    // const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/logout", {}, {
                withCredentials: true
            });
            setIsLoggedIn(false);
            setUser(null);
            // navigate("/login");
            window.location.href = "/login";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <>
                <style>{`
    .navbar-brand{
      font-family: Georgia, serif;
      color:blue;
    }
  `}</style>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Blogger.com</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/">Trending</Link></li>
                                        <li><Link className="dropdown-item" to="/">File Industry</Link></li>
                                        <li><Link className="dropdown-item" to="/">Funny</Link></li>
                                        <li><Link className="dropdown-item" to="/">Business</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/">ContactUs</Link>
                                </li>

                            </ul>
                            <form className="d-flex" role="search">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                </div>
                                <ul className="navbar-nav ms-2">
                                    {!isLoggedIn ? (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Login">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Signup">Signup</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            {/* Profile */}
                                            <li className="nav-item ms-2">
                                                <span className="border border-light rounded-circle d-inline-block overflow-hidden" style={{ width: '40px', height: '40px' }} role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <img
                                                        src={`http://localhost:8000/uploads/${user?.image || "default.png"}`}
                                                        alt="User"
                                                        className="img-fluid w-100 h-100"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </span>
                                                <ul className="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <a className="dropdown-item" href="/profile"><i className="bi bi-person-circle"> </i> Profile</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/CreateBlog"> <i className="bi bi-journal-plus"> </i> New Blog</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/AllBlogs"> <i className="bi bi-journal-plus"> </i> My Blog</a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right text-danger"> </i> Logout </button>
                                                    </li>
                                                </ul>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </form>
                        </div>
                    </div>
                </nav>
            </>
        </div >
    )
}

