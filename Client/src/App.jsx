import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Tournament from './pages/Tournament/Tournament'

function App() {

      const [isLoggedIn, setIsLoggedIn] = useState(false);
  
          useEffect(() => {
              const token = Cookies.get('token');
              setIsLoggedIn(!!token);
          }, []);
      

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
          <Route path="/tournament/:id" element={<Tournament isLoggedIn={isLoggedIn} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
