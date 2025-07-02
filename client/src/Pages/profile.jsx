import React from 'react';
import USER from '../Assets/user.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);



    useEffect(() => {
        const fetchUser = async () => {
            // const token = localStorage.getItem("token");
            // console.log("Token:",token);
            try {
                const res = await axios.get("http://localhost:8000/api/auth/me", {
                    headers: {
                        // Authorization: `Bearer ${token}`,
                          withCredentials: true,
                    },
                });
                console.log("Fetched user:",res.data.user);

                // localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data.user);
                // navigate("/profile");
            } catch (err) {
                console.error("Fetch user failed", err.response?.data ||err.message);
            }
        };

        fetchUser();
    }, []);
    
    if (!user) {
        return <h3 className="text-center mt-5">Please login to view profile.</h3>;
    }
    const imageUrl = user.image
        ? `http://localhost:8000/uploads/${user.image}` // ✅ Adjust based on your multer storage path
        : USER;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <div className="text-center">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="rounded-circle"
                        width="120"
                        height="120"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <h3 className="text-center mt-3">{user.name}</h3>
                <p className="text-center text-muted">{user.email}</p>
                <p><strong>Date of Birth:</strong> {user.dob || "Not Provided"}</p>
                <p><strong>Bio:</strong> {user.bio || "No bio yet."}</p>
                <button className="btn btn-primary btn-sm position-absolute" onClick={() => navigate("/edit-profile")} style={{ top: '15px', right: '15px' }} > Edit </button>
            </div>
        </div>

    );
}


