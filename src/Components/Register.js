import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const RegisterPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);  // Toggle between Admin and User registration
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); 

    const handleRoleChange = (e) => {
        setIsAdmin(e.target.value === 'admin');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        console.log('User Registered:', formData);

        setSuccess(true);

        setTimeout(() => {
            navigate('/login');  
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Register</h2>

                {/* Role Selection (Admin / User) */}
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        type="button"  // Added type="button" to prevent form submission
                        className={`px-4 py-2 rounded-full w-full ${!isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}
                        onClick={handleRoleChange}
                        value="user"
                    >
                        User
                    </button>
                    <button
                        type="button"  // Added type="button" to prevent form submission
                        className={`px-4 py-2 rounded-full w-full ${isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-blue-500'}`}
                        onClick={handleRoleChange}
                        value="admin"
                    >
                        Admin
                    </button>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-500 text-sm">Registration Successful! Redirecting...</div>}

                    <div>
                        <label htmlFor="email" className="block text-sm pb-1 font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm pb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm pb-1 font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register as {isAdmin ? 'Admin' : 'User'}
                        </button>
                    </div>
                </form>

                {/* Already have an account? Redirect to Login */}
                <div className="mt-4 text-center">
                    <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">
                        Already have an account? Login here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
