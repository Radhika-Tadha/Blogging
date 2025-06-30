import React from 'react';
// import USER from '../Assets/user.png';
// import EditProfile from './editProfile';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    // const handleEditProfile = (e) => {
    //     //  e.preventDefault();
    //       navigate("/EditProfile");
    // }
    if (!user) {
        return <h3 className="text-center mt-5">Please login to view profile.</h3>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <h2 className="mb-4"> User Profile</h2>
                <div className="row">
                    <div className="col-md-3 text-center">
                        <img
                            src={`http://localhost:5000/uploads/${user.image}`}
                            alt="Profile"
                            style={{ width: "100px", borderRadius: "50%" }}
                        />

                    </div>
                    <div className="col-md-9">
                        <p><strong>Full Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        {/* Add more fields if your user has like bio, contact, role, etc */}
                    </div>
                </div>
                <button className="btn btn-primary btn-sm position-absolute" onClick={() => navigate("/edit-profile")} style={{ top: '15px', right: '15px' }} > Edit </button>
            </div>
        </div>
    );
}


