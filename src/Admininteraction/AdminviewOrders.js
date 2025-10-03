import React from 'react';
import Navbar from '../Components/Navbar';

export default function ViewOrders() {
    const orders = [
        { id: 101, customer: 'Alice', status: 'Shipped', total: '$150', contact: '123-456-7890', paymentStatus: 'Paid', orderDate: '2023-09-01' },
        { id: 102, customer: 'Bob', status: 'Processing', total: '$75', contact: '234-567-8901', paymentStatus: 'Pending', orderDate: '2023-09-02' },
        { id: 103, customer: 'Charlie', status: 'Delivered', total: '$200', contact: '345-678-9012', paymentStatus: 'Failed', orderDate: '2023-09-03' },
        { id: 104, customer: 'David', status: 'Shipped', total: '$120', contact: '456-789-0123', paymentStatus: 'Refunded', orderDate: '2023-09-04' },
        { id: 105, customer: 'Eva', status: 'Delivered', total: '$220', contact: '567-890-1234', paymentStatus: 'In Progress', orderDate: '2023-09-05' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Shipped':
                return 'bg-green-500 text-white';
            case 'Processing':
                return 'bg-yellow-500 text-white';
            case 'Delivered':
                return 'bg-blue-500 text-white';
            case 'Pending':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getPaymentBadge = (paymentStatus) => {
        switch (paymentStatus) {
            case 'Paid':
                return 'bg-green-500 text-white'; // Successful payment
            case 'Pending':
                return 'bg-yellow-500 text-white'; // Payment is still pending
            case 'Failed':
                return 'bg-red-500 text-white'; // Failed payment
            case 'Refunded':
                return 'bg-blue-500 text-white'; // Refunded payment
            case 'In Progress':
                return 'bg-purple-500 text-white'; // Payment being processed
            default:
                return 'bg-gray-500 text-white'; // Unknown or default state
        }
    };

    return (
        <div className="bg-blue-50 pt-20 min-h-screen">
            <Navbar />
            <div className="p-8 bg-blue-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-blue-800">Orders</h1>

                {/* Wrap the table in a scrollable container */}
                <div className="overflow-x-auto rounded shadow-md bg-white">
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
                            {orders.map(({ id, customer, status, total, contact, paymentStatus, orderDate }) => (
                                <tr key={id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-4 px-6">{id}</td>
                                    <td className="py-4 px-6">{customer}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(status)}`}>
                                            {status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{total}</td>
                                    <td className="py-4 px-6">{contact}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(paymentStatus)}`}>
                                            {paymentStatus}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{orderDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
