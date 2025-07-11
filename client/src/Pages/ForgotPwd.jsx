import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function ForgotPwd() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("http://localhost:8000/api/user/forgot-password",
                {
                    email,
                    password,
                });
            alert(res.data.message);
            // setMessage(res.data.message);
            navigate("/login");
        } catch (err) {
            // setMessage("Something went wrong","err.response?.data?.message || );
            console.error("Something went wrong", err.response?.data || err.message);
        }

    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="row g-3 shadow-lg p-3"
                    style={{ width: "80%", maxWidth: "500px", height: "300px", backgroundColor: "#fff" }}>
                    <form className="form" onSubmit={handleSubmit} >
                        <div className="col-12 text-start">

                            <label className="form-label text-start">Email</label>
                            <input
                                type="email"
                                id="inputemail"
                                className="form-control border-0 border-bottom rounded-0 shadow-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />

                            <label htmlFor="inputPassword6" className="form-label">New Password</label>
                            <div className="d-flex">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="inputPassword6"
                                className="form-control border-0 border-bottom rounded-0 shadow-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    right: "10px",
                                    cursor: "pointer",
                                    color: "#333"
                                }}
                            ></i>
                            </div>
                            <small id="passwordHelpInline" className="form-text text-muted">
                                Must be 6 characters long *
                            </small><br></br>
                            <button className="btn btn-danger col-12 p-2 mt-3" type="submit">Reset Password</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}