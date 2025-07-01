import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function EditProfile() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        dob: "",
        bio: "",
        image: ""
    });

    // Load user data from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                dob: user.dob ? user.dob.slice(0, 10) : "",
                bio: user.bio || ""
            });
        }
    }, []);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle file input
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("dob", form.dob);
        formData.append("bio", form.bio);
        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await axios.put(
                "http://localhost:8000/api/user/update-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            if (!res.data.user) {
                throw new Error("No user returned from server");
            }
            // alert("Profile updated!");

            const updated = await axios.get("http://localhost:8000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("000", updated);

            //Update localStorage with fresh data
            localStorage.setItem("user", JSON.stringify(updated.data.user));

            //Redirect to profile
            alert("Profile updated!");
            console.log("Fetched user:", res.data.user);


            navigate("/profile"); // Optional: redirect to profile page

        } catch (err) {
            console.error("Update Faild", err);
            alert("Update failed");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Edit Your Profile</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control mb-2" placeholder="Full Name" />
                <input type="email" name="email" value={form.email} disabled className="form-control mb-2" />
                <input type="date" name="dob" value={form.dob || ""} onChange={handleChange} className="form-control mb-2" />
                <textarea name="bio" value={form.bio || ""} onChange={handleChange} className="form-control mb-2" placeholder="Short Bio" ></textarea>
                <input type="file" name="image" onChange={handleFileChange} className="form-control mb-2" placeholder="Profile Image URL or file name" />

                <button className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
}
