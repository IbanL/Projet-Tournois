import './navbar.css'
import logo from '/src/assets/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useState } from 'react'
const navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigation = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleMenuLink = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('id');
        setIsLoggedIn(false);
        toggleMenu();
        navigation('/login');
    }

    return (
        <section className='navSection'>
            <div className='logoDiv'>
                <Link to='/' onClick={toggleMenuLink}>
                    <img src={logo} className='logo' alt="logo site tournois" />
                </Link>
            </div>
            <nav>
                <div className='burgerDiv' onClick={toggleMenu}>
                    <div className="burger">
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                    </div>
                </div>
                <ul className='navbarList'>


                    <li><Link to='/' className='navLink' onClick={toggleMenu}>Accueil</Link></li>

                    {!isLoggedIn ? (
                        <>
                            <li><Link to='/register' className='navLink' onClick={toggleMenu}>Inscription</Link></li>
                            <li><Link to='/login' className='navLink' onClick={toggleMenu}>Connexion</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to={`/profil/${Cookies.get('id')}`} className='navLink' onClick={toggleMenu}>Profil</Link></li>
                            <button type="button" className="logoutBtn" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </ul>
            </nav>
            <style jsx="true">{`
            @media screen and (max-width: 600px) {
            .navbarList{
                display : ${isMenuOpen ? 'flex' : 'none'};
                flex-direction: column;
                list-style: none;
                height: 95vh;
                width: 50vw;
                text-align: center;
                background-color: #302e44;
                margin-right: 10px;
                gap: 20px;
                margin-top: 0px;
                margin-bottom: 0px;
            }
                .line1{
                    transform: ${isMenuOpen ? 'rotate(45deg)' : 'rotate(0)'};
                }
                .line2{
                    transform: ${isMenuOpen ? 'translateX(-100%)' : 'translateX(0)'};
                    opacity: ${isMenuOpen ? 0 : 1};
                }
                .line3{
                    transform: ${isMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                }
            }
            
            `}
            </style>
        </section>
    )
}

export default navbar
