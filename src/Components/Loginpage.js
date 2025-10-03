import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection
import { CSSTransition } from 'react-transition-group';

const LoginPage = () => {
    const [isAdmin, setIsAdmin] = useState(false); // Toggle between Admin and User login/register
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register forms
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null); // For displaying errors like wrong credentials
    const navigate = useNavigate();

    // Dummy admin credentials
    const adminCredentials = {
        email: 'admin@admin.com',
        password: 'admin123',
    };

    // Dummy user credentials
    const userCredentials = {
        email: 'user@user.com',
        password: 'user123',
    };

    const handleLoginTypeChange = (e) => {
        setIsAdmin(e.target.value === 'admin');
    };

    const handleFormToggle = () => {
        setIsLogin(!isLogin); 
        setError(null); 
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin && isAdmin) {
            if (
                formData.email === adminCredentials.email &&
                formData.password === adminCredentials.password
            ) {
                localStorage.setItem('isAdminLoggedIn', 'true');
                navigate('/admin'); 
            } else {
                setError('Invalid email or password for Admin!');
            }
        }
        else if (isLogin && !isAdmin) {
            if (
                formData.email === userCredentials.email &&
                formData.password === userCredentials.password
            ) {
                localStorage.setItem('isUserLoggedIn', 'true');
                navigate('/userdashboard');
            } else {
                setError('Invalid email or password for User!');
            }
        }
        else if (!isLogin && !isAdmin) {
            console.log('User Register:', formData);
        } else if (!isLogin && isAdmin) {
            console.log('Admin Register:', formData);
        }
    };

    const handleRedirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded-full w-full ${!isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}
                        onClick={handleLoginTypeChange}
                        value="user"
                    >
                        User
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full w-full ${isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}
                        onClick={handleLoginTypeChange}
                        value="admin"
                    >
                        Admin
                    </button>
                </div>

                {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
                <CSSTransition in={isLogin} timeout={300} classNames="fade" unmountOnExit>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm pb-1 font-medium text-gray-700 ">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm pb-1 font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Login as {isAdmin ? 'Admin' : 'User'}
                            </button>
                        </div>
                    </form>
                </CSSTransition>

                {/* Register Form */}
                <CSSTransition in={!isLogin} timeout={300} classNames="fade" unmountOnExit>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Register as {isAdmin ? 'Admin' : 'User'}
                            </button>
                        </div>
                    </form>
                </CSSTransition>

                {/* Forgot Password Link */}
                <div className="mt-4 text-center text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-800">Forgot Password?</a>
                </div>

                {/* Switch between Login and Register */}
                <div className="mt-4 text-center">
                    <button
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        onClick={handleRedirectToRegister}
                    >
                        {isLogin ? 'Don\'t have an account? Register here' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
