import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);  // Reset success message on new form submission
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        let isValid = true;

        // Validation logic
        if (formData.name.trim() === "") {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (formData.email.trim() === "") {
            newErrors.email = 'Email is required';
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Invalid email format';
                isValid = false;
            }
        }

        if (formData.password.trim() === "") {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (formData.confirmPassword.trim() === "") {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        if (!isValid) {
            setError(newErrors);
            return;
        }

        try {
            const response = await fetch(`${url}register`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: 'user' // Always register as user
                })
            });

            const data = await response.json();

            if (!data.success) {
                // Handle error response from the backend
                if (data.message === "Email already exists") {
                    newErrors.email = "This email is already registered";
                    setError(newErrors);
                } else {
                    alert(data.message || 'Registration failed');
                }
                return;
            }

            // Handle success here (e.g., redirect to the login page)
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Register</h2>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {success && <div className="text-green-500 text-sm">Registration Successful! Redirecting...</div>}

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm pb-1 font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {error.name && <div className="text-red-500 text-sm">{error.name}</div>}
                    </div>

                    {/* Email Field */}
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
                        {error.email && <div className="text-red-500 text-sm">{error.email}</div>}
                    </div>

                    {/* Password Field */}
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
                        {error.password && <div className="text-red-500 text-sm">{error.password}</div>}
                    </div>

                    {/* Confirm Password Field */}
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
                        {error.confirmPassword && <div className="text-red-500 text-sm">{error.confirmPassword}</div>}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register as User
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
