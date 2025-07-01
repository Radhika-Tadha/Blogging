// import React from "react";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../Assets/p1.jpg';


export default function SignUp(props) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
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
            const res = await axios.post("http://localhost:8000/api/auth/signup", form);
            alert(res.data.message);
            navigate("/login");
        } catch (err) {
            console.error("Signup failed:", err);
            alert(err.response?.data?.message || "Signup failed");
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
                        <div className="col-md-6 bg-white p-4 rounded-end"><br></br>
                            <h3 className="mb-4">Sign Up</h3>
                            <form onSubmit={handleSubmit}><br></br>

                                <div className="mb-3 text-start">
                                    <input type="text" name="name" className="form-control border-0 border-bottom rounded-0 shadow-none" id="name" autoComplete="name" onChange={handleChange} placeholder="Enter Full Name" />
                                </div><br></br>

                                <div className="mb-3 text-start">
                                    <input type="email" name="email" className="form-control border-0 border-bottom rounded-0 shadow-none" id="email" autoComplete="username" onChange={handleChange} placeholder="Enter email" />
                                </div><br></br>

                                <div className="mb-3 text-start">
                                    <input type="password" name="password" className="form-control border-0 border-bottom rounded-0 shadow-none" id="password" autoComplete="current-password" onChange={handleChange} placeholder="Enter password" />

                                </div>

                                <div className="form-check text-start">
                                    <input className="form-check-input" type="checkbox" value="" id="checkChecked" />
                                    <label className="form-check-label" htmlFor="checkChecked">Remember Me</label>
                                </div>
                                <br></br>
                                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                            </form>
                            {/* <p className="mt-3 text-center">
                                Already have an account? <a href="/login" className="text-decoration-none">Go to the Login</a>
                            </p> */}
                        </div>
                    </div>
                </div>

            </>
        </div>
    )
}