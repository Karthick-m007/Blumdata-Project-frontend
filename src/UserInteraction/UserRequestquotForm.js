import React, { useEffect, useState } from 'react';
import UserNavbar from '../Components/UserNavbar';
import { useNavigate } from 'react-router-dom';

// Import toastify components & CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserRequestquotForm() {
    const url = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        product: '',
        quantity: '',
        delivery: '',
        message: '',
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(`${url}getproductsdropdown`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.getproduct);
                } else {
                    console.error('Failed to fetch products');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [url]);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
        if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Enter valid 10-digit number';
        if (!form.product) newErrors.product = 'Please select a product';
        if (!form.quantity) newErrors.quantity = 'Quantity is required';
        else if (form.quantity <= 0) newErrors.quantity = 'Enter a valid quantity';
        return newErrors;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/[^0-9]/g, '');
            if (numericValue.length <= 10) {
                setForm(prev => ({ ...prev, [name]: numericValue }));
            }
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the errors in the form');
            return;
        }

        fetch(`${url}requestquote`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                phonenumber: form.phone,
                product: form.product,
                quantity: form.quantity,
                delivery: form.delivery,
                message: form.message,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success('Quote requested successfully!');
                    setForm({
                        name: '',
                        email: '',
                        phone: '',
                        product: '',
                        quantity: '',
                        delivery: '',
                        message: '',
                    });
                    setErrors({});
                } else {
                    toast.error('Failed to send the quote request.');
                }
            })
            .catch(err => {
                console.error('Error in the frontend request quote user', err);
                toast.error('An error occurred. Please try again.');
            });
    };

    return (
        <div className="min-h-screen scroll-mt-24 bg-blue-50">
            <UserNavbar />
            <div className="pt-28 pb-16 px-6">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg px-8 py-6">
                    <h2 className="text-2xl font-semibold text-blue-800 text-center mb-2">Request a Quote</h2>
                    <p className="text-sm font-medium text-center text-gray-600 mb-6">
                        Fill out the form below to get a personalized quote for your needs.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-800 mb-1">Your Name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                    placeholder="Enter your name"
                                    type="text"
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-800 mb-1">Your Email</label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Phone & Product */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-gray-800 mb-1">Phone Number</label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                    placeholder="Enter your phone number"
                                    type="tel"
                                />
                                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-800 mb-1">Select Product</label>
                                <select
                                    name="product"
                                    value={form.product}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                >
                                    <option value="">Choose a product</option>
                                    {loading ? (
                                        <option disabled>Loading products...</option>
                                    ) : (
                                        products.map(product => (
                                            <option key={product._id} value={product.name}>
                                                {product.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                                {errors.product && <p className="text-red-600 text-sm mt-1">{errors.product}</p>}
                            </div>
                        </div>

                        {/* Quantity & Delivery */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-gray-800 mb-1">Quantity</label>
                                <input
                                    name="quantity"
                                    value={form.quantity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                    type="number"
                                    min="1"
                                    placeholder="Enter quantity"
                                />
                                {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-800 mb-1">Preferred Delivery Date (Optional)</label>
                                <input
                                    name="delivery"
                                    value={form.delivery}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                    type="date"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="mt-4">
                            <label className="block text-gray-800 mb-1">Your Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                rows="4"
                                placeholder="Enter your message"
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full sm:w-auto py-2 px-6 rounded-lg transition text-white
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                            >
                                Request Quote
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Container to show toasts */}
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}
