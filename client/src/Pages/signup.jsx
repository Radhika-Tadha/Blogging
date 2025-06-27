// import React from "react";
import axios from 'axios';
import React, { useState } from 'react'; // ✅ correct
import loginImage from '../Assets/p1.jpg'; // adjust path as needed


export default function SignUp(props) {
    const [form, setForm] = useState({ name: '', email: '', password: '' });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //send POST request to Node.js Backend
            const res = await axios.post("http://localhost:5000/api/auth/signup", form);
            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
        }
    };
    return (
        <div>
            <>
                <div className="container vh-100 d-flex align-items-center justify-content-center">
                    <div className="row shadow-lg" style={{ width: "90%", maxWidth: "1000px", height: "500px" }}>
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
                                    {/* <label htmlFor="email" className="form-label">Email</label> */}
                                    <input type="text" className="form-control border-0 border-bottom rounded-0 shadow-none" value={form.name} id="name" onChange={handleChange} placeholder="Enter Full Name" />
                                </div><br></br>

                                <div className="mb-3 text-start">
                                    {/* <label htmlFor="email" className="form-label">Email</label> */}
                                    <input type="email" className="form-control border-0 border-bottom rounded-0 shadow-none" value={form.email} id="email" onChange={handleChange} placeholder="Enter email" />
                                </div><br></br>

                                <div className="mb-3 text-start">
                                    {/* <label htmlFor="password" className="form-label">Password</label> */}
                                    <input type="password" className="form-control border-0 border-bottom rounded-0 shadow-none" value={form.password} id="password" autoComplete="current-password" onChange={handleChange} placeholder="Enter password" />
                                </div>

                                <div className="form-check text-start">
                                    <input className="form-check-input" type="checkbox" value="" id="checkChecked" />
                                    <label className="form-check-label" htmlFor="checkChecked">Remember Me</label>
                                </div>
                                <br></br>
                                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                            </form>
                            <p className="mt-3 text-center">
                                Already have an account? <a href="/login" className="text-decoration-none">Go to the Login</a>
                            </p>
                        </div>
                    </div>
                </div>

            </>
        </div>
    )
}