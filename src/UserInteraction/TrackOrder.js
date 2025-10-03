import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/UserNavbar';

export default function TrackOrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    const mockOrders = {
        '12345': { status: 'Shipped', estimatedDelivery: '2025-10-10' },
        '67890': { status: 'Processing', estimatedDelivery: '2025-10-15' },
        '54321': { status: 'Delivered', estimatedDelivery: '2025-09-30' },
    };

    useEffect(() => {
        if (mockOrders[id]) {
            setOrder(mockOrders[id]);
            setError('');
        } else {
            setError('Order not found.');
            setOrder(null);
        }
    }, [id]);

    return (
       <div>
        <Navbar/>
            <section className="mt-24 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold text-blue-900">Order Tracking Details</h3>
                <p className="text-gray-700 mt-2">Order ID: {id}</p>

                {error && <p className="mt-4 text-red-600">{error}</p>}

                {order && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-md">
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery}</p>
                    </div>
                )}
            </section>
       </div>
    );
}
