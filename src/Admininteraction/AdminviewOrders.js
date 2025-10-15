import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

export default function ViewOrders() {
    const url = process.env.REACT_APP_BACKEND_URL;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${url}quotations`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.statusText}`);
                }

                const data = await response.json();

                if (data.success) {
                    setOrders(data.quotations);
                } else {
                    throw new Error(data.message || 'Failed to load orders');
                }
            } catch (error) {
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Shipped':
                return 'bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold';
            case 'Processing':
                return 'bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold';
            case 'Delivered':
                return 'bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold';
            case 'Pending':
                return 'bg-red-200 text-red-800 px-4 py-2 rounded-full text-sm font-semibold';
            default:
                return 'bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold';
        }
    };

    const getPaymentBadge = (paymentStatus) => {
        switch (paymentStatus) {
            case 'Paid':
                return 'bg-green-200 text-green-800 ms-2 p-1 md:px-4 md:py-2 rounded-full text-sm font-semibold';
            case 'Pending':
                return 'bg-yellow-200 text-yellow-800 ms-2 p-1 md:px-4 md:py-2 rounded-full text-sm font-semibold';
            case 'Failed':
                return 'bg-red-200 text-red-800 ms-2 p-1 md:px-4 md:py-2 rounded-full text-sm font-semibold';
            case 'Refunded':
                return 'bg-blue-200 text-blue-800 ms-2 p-1 md:px-4 md:py-2 rounded-full text-sm font-semibold';
            case 'In Progress':
                return 'bg-purple-200 text-purple-800 ms-2 p-1 md:px-4 md:py-2 rounded-full text-sm font-semibold';
            default:
                return 'bg-gray-200 text-gray-800 ms-2 p-1 md:px-4 md:py-2 rounded-full text-sm font-semibold';
        }
    };

    if (loading) {
        return <div className="text-center py-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-6 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-blue-50 pt-20 min-h-screen">
            <Navbar />
            <div className="p-8 bg-blue-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-blue-800">Orders</h1>

                {orders.length === 0 && (
                    <div className="text-center text-gray-500 py-6">No orders available.</div>
                )}

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto rounded shadow-md bg-white">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-blue-100 text-white">
                                <th className="py-3 px-6 text-blue-800 text-left">Order ID</th>
                                <th className="py-3 px-6 text-blue-800 text-left">Customer</th>
                                <th className="py-3 px-6 text-blue-800 text-left">Status</th>
                                <th className="py-3 px-6 text-blue-800 text-left">Total</th>
                                <th className="py-3 px-6 text-blue-800 text-left">Contact Number</th>
                                <th className="py-3 px-6 text-blue-800 text-left">Payment Status</th>
                                <th className="py-3 px-6 text-blue-800 text-left">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.requestQuote_id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                    <td className="py-4 px-6">{order.requestQuote_id}</td>
                                    <td className="py-4 px-6">{order.name}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{order.total || "$0"}</td>
                                    <td className="py-4 px-6">{order.phonenumber}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(order.paymentStatus)}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards View */}
                <div className="lg:hidden mt-6 space-y-4">
                    {orders.map((order) => (
                        <div key={order.requestQuote_id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-blue-800">Order #{order.requestQuote_id}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-700">Customer: {order.name}</p>
                            <p className="text-gray-700">Total: {order.total || "$0"}</p>
                            <p className="text-gray-700">Contact: {order.phonenumber}</p>
                            <p className="text-gray-700">Payment Status:
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(order.paymentStatus)}`}>
                                    {order.paymentStatus}
                                </span>
                            </p>
                            <p className="text-gray-700">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
