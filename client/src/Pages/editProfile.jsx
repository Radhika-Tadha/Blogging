import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function EditProfile({setUser}) {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone:"",
        dob: "",
        bio: "",
        image: ""
    });

    // Load user data from localStorage
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/auth/me", {
                    withCredentials: true,
                });
                const user = res.data.user;

                setForm({
                    name: user.name || "",
                    email: user.email || "",
                    phone:user.phone || "",
                    dob: user.dob ? user.dob.slice(0, 10) : "",
                    bio: user.bio || "",
                    image: user.image || ""
                });
            } catch (err) {
                console.error("Failed to fetch user", err);
                alert("Please login again.");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

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

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("phone",form.phone);
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
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                });

            if (!res.data.user) {
                throw new Error("No user returned from server");
            }
            
            // ✅ Update parent App state (via props)
            setUser(res.data.user);
        
        alert("Profile updated!");
        navigate("/profile");
    } catch (err) {
        // console.error("Update Faild", err);
        alert("Update failed");
    }
};


return (
    <div className="container mt-4">
        <h3>Edit Your Profile</h3>
        <form onSubmit={handleUpdate}>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control mb-2" placeholder="Full Name" />
            <input type="email" name="email" value={form.email} disabled className="form-control mb-2" />
            <input type="text" name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Mobile No." className="form-control mb-2" />
            <input type="date" name="dob" value={form.dob || ""} onChange={handleChange} className="form-control mb-2" />
            <textarea name="bio" value={form.bio || ""} onChange={handleChange} className="form-control mb-2" placeholder="Short Bio" ></textarea>
            <input type="file" name="image" onChange={handleFileChange} className="form-control mb-2" placeholder="Profile Image URL or file name" />

            <button className="btn btn-primary">Update Profile</button>
        </form>
    </div>
);
}
