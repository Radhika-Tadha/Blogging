import React, { useEffect,useState } from "react";
import aboutus from "../Assets/p3.jpg";
import axios from "axios";

export default function AboutUs() {
        const [user, setUser] = useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/auth/user`)
            .then((res) => setUser(res.data.user))
            .catch((err) => console.error("Erroe Loadding user:", err));
    },[]);
    return (
        <>
            <style>{`
                .overlap-box {
                    position: absolute;
                    top: 320px;
                    right: 450px;
                    transform: translateX(20%);
                    z-index: 2;
                    }
                .relative-row {
                    position: relative;
                }
                .about-img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
            `}</style>
            <div className="container mt-5 mb-5 p-5" style={{  background: "#F1E7E7"}}>
                <div className="text-center mb-4">
                    <h2>About Us</h2>
                    <p className="text-muted">Learn more about our blog and team</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8 ml-3" style={{ zIndex: 1 }}>
                        <div className="p-5 shadow rounded bg-light text-start">
                            <h4>Hey! <br/>{` I am ${user?.name|| "Guest"} Thanks for stopping by!`}</h4>
                            <p>
                                Welcome to our blog platform! This project is a full-stack blogging website<br />
                                where users can share their thoughts, write articles, and engage 
                                with a <br />creative community.
                                It has built using the <strong>MERN stack</strong> MongoDB, Express.js,<br />React.js, and Node.js
                                along with Bootstrap <br />for styling. Our goal is to make it clean, responsive, and simple to use.<br />
                                You can create an account, write blog posts, upload images, edit your profile,<br />
                                and manage your blogs securely with JWT authentication and <br />cookie-based sessions.
                            </p>
                            <p>
                                Feel free to explore, connect, and share your ideas!
                            </p>
                            <p className="text-muted fst-italic">— The Blog Team</p>
                        </div>
                    </div>
                    <div className="img-cont col-md-3 overlap-box" style={{ zIndex: 2 }}>
                        <img src={aboutus}
                            alt="img"
                            height="280px"
                            width="280px"
                        ></img>
                    </div>
                </div>

            </div>
        </>
    );
}
