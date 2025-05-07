import './navbar.css'
import logo from '/src/assets/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
const navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        navigation('/login');
    }

    return (
        <section className='navSection'>
            <div className='logoDiv'>
                <Link to='/'>
                    <img src={logo} className='logo' alt="logo site tournois" />
                </Link>
            </div>
            <nav>
                <ul className='navbarList'>
                    <li><Link to='/' className='navLink'>Accueil</Link></li>

                    {!isLoggedIn ? (
                        <>
                    <li><Link to='/register' className='navLink'>Inscription</Link></li>
                    <li><Link to='/login' className='navLink'>Connexion</Link></li>
                    </>
                    ) : (
                        <>
                        <button type="button" className="logoutBtn" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </ul>
            </nav>
        </section>
    )
}

export default navbar
