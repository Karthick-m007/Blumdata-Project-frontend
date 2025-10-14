import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [showActivity, setShowActivity] = useState(true);
    const [showNotifications, setShowNotifications] = useState(true);

    // Data for stats cards with minimal background and attractive text colors
    const stats = [
        { label: 'Total Orders', value: 120, text: 'text-indigo-600', animation: 'transform scale-105 hover:scale-110 hover:shadow-xl' },
        { label: 'Pending Payments', value: 5, text: 'text-yellow-600', animation: 'transform scale-105 hover:scale-110 hover:shadow-xl' },
        { label: 'Active Users', value: 300, text: 'text-teal-600', animation: 'transform scale-105 hover:scale-110 hover:shadow-xl' },
        { label: 'Products Available', value: 50, text: 'text-pink-600', animation: 'transform scale-105 hover:scale-110 hover:shadow-xl' },
    ];

    const actions = [
        { label: 'Manage Products', path: '/manageproduct', text: 'text-indigo-800', animation: 'transform scale-105 hover:scale-110 hover:bg-indigo-100' },
        { label: 'View Orders', path: '/ordersadmin', text: 'text-green-800', animation: 'transform scale-105 hover:scale-110 hover:bg-green-100' },
        { label: 'Manage Quotes', path: '/quotmanage', text: 'text-purple-800', animation: 'transform scale-105 hover:scale-110 hover:bg-purple-100' },
    ];

    const activities = [
        { text: 'Order #120 - Status: Processing', time: '10 mins ago' },
        { text: 'Quote Request #5 - Status: Pending', time: '2 hours ago' },
        { text: 'New Product "Smart Switch" added', time: 'Yesterday' },
    ];

    const notifications = ['5 Pending Quotes', '3 Products Out of Stock'];

    return (
        <div className="min-h-screen bg-gray-50">
            
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-wide">
                        Welcome to Your Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg max-w-xl mx-auto">
                        Overview of your platform’s stats and quick access actions.
                    </p>
                </header>

                {/* Stats Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map(({ label, value, text, animation }) => (
                        <div
                            key={label}
                            className={`${animation} shadow-md rounded-xl p-8 flex flex-col items-center cursor-default transition`}
                            aria-label={`${label}: ${value}`}
                        >
                            <p className={`${text} text-lg font-semibold tracking-wide`}>{label}</p>
                            <p className={`mt-3 text-4xl font-extrabold ${text} hover:text-indigo-800 transition duration-300 ease-in-out`}>{value}</p>
                        </div>
                    ))}
                </section>

                {/* Quick Actions */}
                <section className="mb-20 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8 tracking-tight">
                        Quick Actions
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {actions.map(({ label, path, text, animation }) => (
                            <Link
                                key={label}
                                to={path}
                                className={`${text} ${animation} font-semibold px-8 py-3 rounded-full shadow-sm transition transform focus:outline-none focus:ring-2 focus:ring-offset-1`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="max-w-3xl mx-auto mb-20">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">Recent Activity</h3>
                        <button
                            onClick={() => setShowActivity(!showActivity)}
                            className="text-gray-600 hover:underline font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                            aria-label={showActivity ? 'Hide Recent Activity' : 'Show Recent Activity'}
                        >
                            {showActivity ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {showActivity && (
                        <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-md">
                            {activities.map(({ text, time }, i) => (
                                <li
                                    key={i}
                                    className="flex justify-between px-8 py-5 text-gray-700 text-base font-medium hover:bg-gray-50 transition rounded-md"
                                >
                                    <span>{text}</span>
                                    <time className="text-gray-400 italic">{time}</time>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Notifications */}
                <section className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">Notifications</h3>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="text-gray-600 hover:underline font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
                            aria-label={showNotifications ? 'Hide Notifications' : 'Show Notifications'}
                        >
                            {showNotifications ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {showNotifications && (
                        <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                            {notifications.map((note, i) => (
                                <li
                                    key={i}
                                    className="px-8 py-5 text-gray-800 font-semibold text-center text-lg hover:bg-gray-50 rounded-md transition"
                                >
                                    {note}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </div>
    );
}
