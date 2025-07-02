// import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Navbar from './component/navbar';
import Footer from './component/footer';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import Dashboard from './Pages/dashboard';
import Profile from './Pages/profile';
import EditProfile from './Pages/editProfile';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
axios.defaults.withCredentials = true;


function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        console.log("Not logged in:", err.response?.data?.message);

      });
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} /
          >
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

              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} /> */}


            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
