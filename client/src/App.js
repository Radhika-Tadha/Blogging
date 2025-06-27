// import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar';
import Footer from './component/footer';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/login" element={<Login />} />
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
