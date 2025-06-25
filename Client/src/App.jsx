import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Tournament from './pages/Tournament/Tournament'
import CreateTournament from './pages/CreateTournament/CreateTournament'
import ProtectedRoute from './utils/ProtectedRoute'
import UserProfile from './pages/UserProfile/UserProfile'
import Footer from './components/Footer/Footer'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);


  return (
    <>

      <Router>
        <div className="app">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
            <Route path="/tournament/:id" element={<Tournament isLoggedIn={isLoggedIn} />} />
            <Route path="/tournament/create" element={<ProtectedRoute>  <CreateTournament isLoggedIn={isLoggedIn} />    </ProtectedRoute>} />
            <Route path="/profil/:id" element={<UserProfile />} />
          </Routes>
          <Footer />
        </div>
      </Router>

    </>
  )
}

export default App
