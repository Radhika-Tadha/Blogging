import React from 'react';
// import './Navbar.css'; // optional for styling
import { Link } from 'react-router-dom';


export default function Footer(props) {
    return (
        <div>
            <>

                <footer className="bg-dark text-white text-center text-lg-start mt-auto py-3">
                    <div className="container p-4">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase">My Website</h5>
                                <p>
                                    This is a simple footer using Bootstrap. You can add any content like contact info, links, or copyright.
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Links</h5>
                                <ul className="list-unstyled mb-0">
                                    <li><a href="#" className="text-white">Home</a></li>
                                    <li><a href="#" className="text-white">About</a></li>
                                    <li><a href="#" className="text-white">Contact</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Social</h5>
                                <ul className="list-unstyled mb-0">
                                    <li><a href="#" className="text-white">Facebook</a></li>
                                    <li><a href="#" className="text-white">Twitter</a></li>
                                    <li><a href="#" className="text-white">Instagram</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2025 MyWebsite. All Rights Reserved.
                    </div>
                </footer>


            </>
        </div >
    )
}