import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// --- Navbar Component ---
export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.classList.remove('menu-open');
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  };

  const handleSignOut = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };
  
  const NavLink: React.FC<{ to: string; children: React.ReactNode; className?: string; onClick?: () => void }> = ({ to, children, className, onClick }) => {
    const { pathname } = useLocation();
    const isActive = pathname === to;
    
    return (
        <Link to={to} className={`${className} ${isActive ? 'text-primary-red' : 'text-text-dark'}`} onClick={onClick}>
            {children}
        </Link>
    );
  };

  const baseLinkClasses = "font-medium relative transition-colors duration-300 hover:text-primary-red";
  const mobileLinkClasses = "block px-3 py-2 rounded-md text-base font-medium text-text-dark hover:text-white hover:bg-primary-red";


  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            <img className="h-10 w-auto" src="/photos/usraLogo.png" alt="USRA Logo" />
            <span className="font-bold text-xl text-dark-gray">USRA</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/" className={baseLinkClasses}>Home</NavLink>
              <NavLink to="/events" className={baseLinkClasses}>Events</NavLink>
              <div className="relative group">
                 <button className={`${baseLinkClasses} inline-flex items-center`}>
                    More <i className="fas fa-chevron-down ml-1 text-xs"></i>
                 </button>
                 <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-[12rem] sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-1 bg-white p-2">
                            <Link to="/leadership" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Leadership</Link>
                            <Link to="/workplan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Workplan 2025</Link>
                            <Link to="/medical-fund" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Medical Fund</Link>
                            <Link to="/photos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Photos</Link>
                        </div>
                    </div>
                 </div>
              </div>
              <NavLink to="/#contact" className={baseLinkClasses}>Contact</NavLink>
              {currentUser ? (
                <div className="relative ml-4">
                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2">
                         <div className="w-10 h-10 rounded-full bg-primary-red text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">
                            {currentUser.name.charAt(0).toUpperCase()}
                         </div>
                    </button>
                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5" data-aos="fade-in" data-aos-duration="200">
                            <div className="px-4 py-3 border-b">
                                <p className="text-sm text-gray-900">Signed in as</p>
                                <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                            </div>
                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setIsUserMenuOpen(false)}>Dashboard</Link>
                            <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
              ) : (
                <Link to="/signin" className="ml-4 bg-primary-red text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-dark-red transition-colors">Sign In</Link>
              )}
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="hamburger inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Open main menu</span>
                <div className={`w-6 h-0.5 bg-gray-800 my-1 transition-transform duration-300 ${isOpen ? 'transform rotate-45 translate-y-[6px]' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-gray-800 my-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-gray-800 my-1 transition-transform duration-300 ${isOpen ? 'transform -rotate-45 -translate-y-[6px]' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-white overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen shadow-lg' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={mobileLinkClasses}>Home</NavLink>
          <NavLink to="/events" className={mobileLinkClasses}>Events</NavLink>
          <NavLink to="/leadership" className={mobileLinkClasses}>Leadership</NavLink>
          <NavLink to="/workplan" className={mobileLinkClasses}>Workplan 2025</NavLink>
          <NavLink to="/medical-fund" className={mobileLinkClasses}>Medical Fund</NavLink>
          <NavLink to="/photos" className={mobileLinkClasses}>Photos</NavLink>
          <NavLink to="/#contact" className={mobileLinkClasses}>Contact</NavLink>
           {currentUser ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                  <NavLink to="/dashboard" className={mobileLinkClasses}>Dashboard</NavLink>
                  <button onClick={handleSignOut} className={`${mobileLinkClasses} w-full text-left text-red-600`}>Sign Out</button>
              </div>
            ) : (
              <NavLink to="/signin" className={mobileLinkClasses}>Sign In</NavLink>
            )}
        </div>
      </div>
    </nav>
  );
};

// --- Footer Component ---
export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-gray text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img className="h-10 w-auto" src="/photos/usraLogo.png" alt="USRA Logo" />
              <span className="font-bold text-xl">USRA</span>
            </div>
            <p className="text-gray-300">Developing the future of rugby in Uganda through school sports excellence.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary-yellow"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-300 hover:text-secondary-yellow"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-300 hover:text-secondary-yellow"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div>
            <h3 className="text-secondary-yellow font-semibold tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white">Events</Link></li>
              <li><Link to="/leadership" className="text-gray-300 hover:text-white">Leadership</Link></li>
              <li><Link to="/registration" className="text-gray-300 hover:text-white">Registration</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-secondary-yellow font-semibold tracking-wider uppercase">Downloads</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Tournament Manual</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Registration Form</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">USRA Constitution</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-secondary-yellow font-semibold tracking-wider uppercase">Contact Info</h3>
            <ul className="mt-4 space-y-2 text-gray-300">
                <li className="flex items-start"><i className="fas fa-map-marker-alt mt-1 mr-2"></i> Lugogo Tennis Club, Kampala</li>
                <li className="flex items-start"><i className="fas fa-phone mt-1 mr-2"></i> +256 783 562 222</li>
                <li className="flex items-start"><i className="fas fa-envelope mt-1 mr-2"></i> usrasecretariat@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Uganda Schools Rugby Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};