import React, { useEffect, useState } from 'react'; // added useState
import { useNavigate } from 'react-router-dom'; // added useNavigate
import UserNavbar from '../Components/UserNavbar';
import ProductListing from './ProductListing';

export default function UserDashboard() {
  const [orderId, setOrderId] = useState(''); // added orderId state
  const navigate = useNavigate(); // added navigate

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTrack = () => {
    if (!orderId.trim()) {
      alert('Please enter a valid Order ID');
      return;
    }
    // Navigate to the order tracking details page
    navigate(`/trackorder/${orderId.trim()}`);
  };

  const products = [
    {
      name: 'Smart Switch',
      price: 45,
      img: 'https://images.unsplash.com/photo-1580906854484-00502f4d2b2a?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Smart Plug',
      price: 35,
      img: 'https://images.unsplash.com/photo-1618401479284-211db46b1c31?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Smart Bulb',
      price: 25,
      img: 'https://images.unsplash.com/photo-1504198458649-3128b932f49b?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 scroll-mt-24">
      <UserNavbar />

      <div className="pt-20 pb-10 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-blue-900">Welcome to Your Dashboard</h1>
          <p className="text-gray-700 max-w-md mx-auto mt-3">
            View products, request quotes, and track your orders.
          </p>
        </section>

        <ProductListing />

        {/* Track Orders */}
        {/* <section className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-900">Track Your Orders</h3>
          <p className="text-gray-700 mt-2">Enter your order ID to track its status.</p>
          <div className="mt-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter Order ID"
            />
            <button
              onClick={handleTrack}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Track Order
            </button>
          </div>
        </section> */}
      </div>
    </div>
  );
}
