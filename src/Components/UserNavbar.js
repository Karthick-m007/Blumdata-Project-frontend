import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const url = process.env.REACT_APP_BACKEND_URL
    console.log(url)
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Lock scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleOffcanvas = () => setIsOpen(!isOpen);

    const handleMenuItemClick = (path) => {
        navigate(path);
        setIsOpen(false);
    };
    const handleLogout = async () => {
        try {
            const response = await fetch(`${url}logout`, {
                method: 'DELETE',
                credentials: 'include',  
            });

           
            const data = await response.json();
            console.log('Logout response:', data);

            if (response.ok && data.success) {
               
                localStorage.removeItem('user');
                navigate('/');  
            } else {
                console.error('Logout failed:', data.message);
            }
        } catch (err) {
            console.error('Logout error:', err);
        }
    };



    const menuItems = [
        { label: 'Dashboard', path: '/userdashboard' },
        { label: 'My Quotes', path: '/myquotes' },
        { label: 'Payments', path: '/payment' },
        { label: 'Logout', path: '/', onClick: handleLogout },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-indigo-600 shadow-md z-50">
            <div className="container mx-auto px-4 md:px-10 flex items-center justify-between h-14">
                <a
                    href="#"
                    className="text-white font-bold text-xl select-none"
                    onClick={() => handleMenuItemClick('/userdashboard')}
                >
                    Blumdata
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-white font-medium">
                    {menuItems.map(({ label, path, onClick }) => (
                        <li
                            key={path}
                            onClick={onClick || (() => handleMenuItemClick(path))}
                            className="cursor-pointer relative group"
                        >
                            <span>{label}</span>
                            {/* Animated underline */}
                            <span
                                className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                            />
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleOffcanvas}
                    aria-label="Toggle menu"
                    className="md:hidden relative w-8 h-8 focus:outline-none"
                >
                    {/* Hamburger bars */}
                    <span
                        className={`block absolute h-0.5 w-8 bg-white rounded transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 top-3.5' : 'top-2'}`}
                    />
                    <span
                        className={`block absolute h-0.5 w-8 bg-white rounded transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'top-4'}`}
                    />
                    <span
                        className={`block absolute h-0.5 w-8 bg-white rounded transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 top-3.5' : 'top-6'}`}
                    />
                </button>
            </div>

            {/* Mobile Offcanvas Menu */}
            <div
                className={`fixed top-14 right-0 w-64 bg-white h-[calc(100vh-56px)] shadow-lg rounded-l-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ backdropFilter: 'blur(10px)' }}
            >
                <ul className="flex flex-col p-6 space-y-6 text-gray-800 font-semibold">
                    {menuItems.map(({ label, path, onClick }) => (
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

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-25 z-30 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleOffcanvas}
                aria-hidden="true"
            />
        </nav>
    );
}
