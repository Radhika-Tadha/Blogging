// import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar';
import Footer from './component/footer';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import Dashboard from './Pages/dashboard';
import Profile from './Pages/profile';
import EditProfile from './Pages/editProfile';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);
  return (
    <div className="App">
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <main className="flex-grow-1">
            <Routes>
              <Route
                path="/dashboard"
                element={getToken() ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />

              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<SignUp />} />

            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
