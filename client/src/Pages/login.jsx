// import React from "react";
// import SignUp from ".//signup";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Dashbord from './Pages/dashbord';
import loginImage from '../Assets/p1.jpg'; // adjust path as needed


export default function Login({setIsLoggedIn}) {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //send POST request to Node.js Backend
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            // Optional: Save token if backend returns it
            localStorage.setItem("token", res.data.token);
            alert(res.data.message);
            setIsLoggedIn(true); // Update navbar
            navigate("/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            alert(err.response?.data?.message || "Login failed");
        }
    };
    return (
        <div>
            <>
                <div className="container vh-100 d-flex align-items-center justify-content-center">
                    <div className="row shadow-lg" style={{ width: "90%", maxWidth: "900px", height: "500px" }}>
                        {/* LEFT SIDE - IMAGE */}
                        <div className="col-md-6 d-none d-md-block p-0">
                            <img
                                src={loginImage}
                                alt="Login Visual"
                                className="img-fluid h-100 w-100"
                                style={{ objectFit: "cover", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
                            />
                        </div>

                        {/* RIGHT SIDE - FORM */}<br></br>
                        <div className="col-md-6 bg-white p-5 rounded-end"><br></br>
                            <h3 className="mb-4">Login</h3>
                            <form onSubmit={handleSubmit}>     <br></br>
                                <div className="mb- text-start">
                                    <input type="email"
                                        name="email"
                                        className="form-control border-0 border-bottom rounded-0 shadow-none"
                                        onChange={handleChange}
                                        id="email"
                                        placeholder="Enter email" />
                                </div><br></br>

                                <div className="mb-3 text-start">
                                    <input type="password"
                                        name="password"
                                        className="form-control border-0 border-bottom rounded-0 shadow-none"
                                        onChange={handleChange}
                                        id="password"
                                        autoComplete="current-password"
                                        placeholder="Enter password" />
                                </div><br></br>

                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            <p className="mt-3 text-center">
                                Does't have any account? <a href="/signup" className="text-decoration-none">Sign Up here</a>
                            </p>
                        </div>
                    </div>
                </div>

            </>
        </div>
    )
}