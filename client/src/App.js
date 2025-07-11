// import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Navbar from './component/navbar';
import Footer from './component/footer';
// Pages 
import MyBlogs from './Pages/MyBlogs';
import BlogDetail from './Pages/BlogDetail';
import AllBlogs from './Pages/AllBlogs';
import EditWrapper from "./Pages/EditWrapper";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Login from './Pages/login';
import SignUp from './Pages/signup';
import Dashboard from './Pages/dashboard';
import Profile from './Pages/profile';
import EditProfile from './Pages/editProfile';
import CreateBlog from './Pages/CreateBlog';
import ForgotPwd from './Pages/ForgotPwd';
// all Hooks
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    // Validate session via cookie (not localStorage)
    axios.get("http://localhost:8000/api/auth/me", { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setIsLoggedIn(true);
      })

      .catch(err => {
        setUser(null);
        setIsLoggedIn(false);
        
        // 🟡 Only show error on protected pages, skip logging on /login or /ForgotPwd
      const publicRoutes = ["/login", "/signup", "/ForgotPwd"];
      if (!publicRoutes.includes(window.location.pathname)) {
        console.log("Not logged in:", err.response?.data?.message);
      }

      })
      .finally(() => {
        setLoading(false);//check 
      })
  }, []);

  return (
    <div className="App">
      {
        loading ? (
          <div className="text-center mt-5">Checking Login status...</div>
        ) : (
          <Router>
            <div className="App d-flex flex-column min-vh-100">
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
              <main className="flex-grow-1">
                <Routes>

                  <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/profile"
                    element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/edit-profile"
                    element={isLoggedIn ? <EditProfile setUser={setUser} /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/CreateBlog"
                    element={isLoggedIn ? <CreateBlog setUser={setUser} /> : <Navigate to="/login" />}
                  />

                  <Route
                    path="/MyBlogs"
                    element={isLoggedIn ? <MyBlogs setUser={setUser} /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/edit/:id"
                    element={isLoggedIn ? <EditWrapper setUser={setUser} /> : <Navigate to="/login" />}
                  />
                  <Route path="/blog/:id"
                    element={isLoggedIn ? <BlogDetail setUser={setUser} /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/AllBlogs"
                    element={isLoggedIn ? <AllBlogs setUser={setUser} /> : <Navigate to="/login" />}
                  />

                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/about" element={<AboutUs />} />

                  <Route path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
                  />
                  <Route path="/forgot-password"
                    element={<ForgotPwd />}
                  />
                  <Route path="/signup"
                    element={<SignUp />}
                  />
                  <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />

                </Routes>

              </main>
              {/* <AboutUs/> */}
              {/* <ContactUs /> */}
              <Footer />
            </div>
          </Router>
        )}
    </div>
  )
};

export default App;
