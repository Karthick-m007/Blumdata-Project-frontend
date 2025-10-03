import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in or not on every render
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);  // If there’s a user, set loggedIn to true, otherwise false.
    }, [isLoggedIn]); // recheck if the login state has changed

    const toggleOffcanvas = () => setIsOpen(!isOpen);

    const handleMenuItemClick = (path) => {
        navigate(path);
        setIsOpen(false);  // Close the menu on click
    };

    const handleLogin = () => {
        // Dummy login function, adjust this logic when backend API is available
        localStorage.setItem('user', JSON.stringify({ username: 'admin' }));
        setIsLoggedIn(true);
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-indigo-600 shadow-md z-50">
            <div className="container mx-auto px-4 md:px-10 flex items-center justify-between h-14">
                <a
                    href="#"
                    className="text-white font-bold text-xl select-none"
                    onClick={() => handleMenuItemClick('/')}
                >
                    Blumdata
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-white font-medium">
                    {[
                        { label: 'Dashboard', path: '/admin' },
                        { label: 'Manage Products', path: '/manageproduct' },
                        { label: 'Manage Quotes', path: '/quotmanage' },
                        { label: 'Track Orders', path: '/admintrack' },
                        { label: 'Payments', path: '/paymentverify' },
                        { label: isLoggedIn ? 'Logout' : 'Login', path: isLoggedIn ? '/' : '/login', onClick: isLoggedIn ? handleLogout : handleLogin },
                    ].map(({ label, path, onClick }) => (
                        <li
                            key={path}
                            onClick={onClick || (() => handleMenuItemClick(path))}
                            className="cursor-pointer relative group"
                        >
                            <span>{label}</span>
                            <span
                                className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                            />
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle button */}
                <button
                    onClick={toggleOffcanvas}
                    aria-label="Toggle menu"
                    className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Offcanvas Menu */}
            <div
                className={`fixed top-14 right-0 w-64 bg-white h-full shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <ul className="flex flex-col p-6 space-y-6 text-gray-800 font-semibold">
                    {[
                        { label: '📊 Dashboard', path: '/' },
                        { label: '📦 Manage Products', path: '/manageproduct' },
                        { label: '📊 Track Orders', path: '/admintrack' },
                        { label: '💳 Payments', path: '/paymentverify' },
                        { label: isLoggedIn ? '🚪 Logout' : '🔑 Login', path: isLoggedIn ? '/' : '/login', onClick: isLoggedIn ? handleLogout : handleLogin },
                    ].map(({ label, path, onClick }) => (
                        <li
                            key={path}
                            onClick={onClick || (() => handleMenuItemClick(path))}
                            className="cursor-pointer hover:text-indigo-600 transition-colors"
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay for when menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-25 z-30"
                    onClick={toggleOffcanvas}
                    aria-hidden="true"
                />
            )}
        </nav>
    );
}
