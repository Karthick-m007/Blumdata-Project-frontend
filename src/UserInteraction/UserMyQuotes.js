import React, { useEffect } from 'react';
import Navbar from '../Components/UserNavbar';
import { useNavigate } from 'react-router-dom';

export default function UserMyQuotes() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();

    // For demo: quotes data
    const quotes = [
        {
            id: 1,
            product: '3D Printer',
            requestedOn: '05-09-2025',
            status: 'Pending',
        },
        {
            id: 2,
            product: 'CNC Machine',
            requestedOn: '05-09-2025',
            status: 'In Production',
        },
        {
            id: 3,
            product: 'Laser Cutter',
            requestedOn: '05-09-2025',
            status: 'Ready for Delivery',
        },
    ];

    return (
        <div className="bg-blue-50 py-24 scroll-m-0">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
                <div className="text-center mb-6 ">
                    <h1 className="text-3xl font-bold text-blue-800">My Quotes</h1>
                    <p className="text-gray-600 mt-2">View all your requested quotes and their current status.</p>
                </div>

                <hr className="border-gray-300 mb-6" />

                <div>
                    {quotes.map(({ id, product, requestedOn, status }) => (
                        <div key={id} className="flex justify-between items-center p-4 border-b border-gray-300">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{product}</h2>
                                <p className="text-sm text-gray-500">
                                    Requested on: <span className="font-semibold">{requestedOn}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <h4 className="text-sm text-gray-700">
                                    Status: <span className="text-yellow-600 font-semibold">{status}</span>
                                </h4>
                                <button
                                    onClick={() => navigate(`/quote/${id}`)}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                <div className="text-center mt-6">
                    <h3 className="text-xl font-semibold text-gray-500">You have not requested any quotes yet.</h3>
                </div>

                <hr className="my-6 border-gray-300" />

                <div className="flex justify-between mx-auto max-w-xs mt-6">
                    <button className="w-1/2 px-2 py-1 bg-green-600 me-3 text-white rounded-lg hover:bg-green-700" onClick={() => { navigate('/requestquote')}}>
                        Add New Quote
                    </button>
                    <button className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => { navigate('/productlist') }}>View Products</button>
                </div>
            </div>
        </div>
    );
}
