import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function AdminTrackStatus() {
    const { id } = useParams();
    const steps = [
        { label: 'Ordered', icon: '📦' },
        { label: 'In Production', icon: '🏭' },
        { label: 'Testing', icon: '🧪' },
        { label: 'Ready for Delivery', icon: '🚚' },
        { label: 'Completed', icon: '✔️' }
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [orderDetails, setOrderDetails] = useState({});
    const url = process.env.REACT_APP_BACKEND_URL;

    // Fetch order details when the component loads or when the id changes
    const fetchOrderDetails = () => {
        fetch(`${url}requestquote-getitems`, { method: 'GET', credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                const order = data.product.find(item => item._id === id);
                if (order) {
                    setOrderDetails(order);
                    setCurrentStep(steps.findIndex(step => step.label === order.trackingStatus) + 1);
                }
            })
            .catch(err => console.error('Error fetching order details', err));
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    // Update the order status on the backend
    const updateStatus = (newStep) => {
        const newStatus = steps[newStep - 1].label;
        fetch(`${url}update-tracking-status/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCurrentStep(newStep);
                    fetchOrderDetails(); // Refresh order details after status update
                } else {
                    console.error('Error updating status:', data.message);
                }
            })
            .catch(err => console.error('Error updating status', err));
    };

    // Handle the "Next" button click
    const handleNext = () => {
        if (currentStep < steps.length) {
            const newStep = currentStep + 1;
            updateStatus(newStep);
        }
    };

    // Handle the "Previous" button click
    const handlePrevious = () => {
        if (currentStep > 1) {
            const newStep = currentStep - 1;
            updateStatus(newStep);
        }
    };

    return (
        <div className="pt-24 bg-blue-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
                    Order Production Tracker
                </h1>

                {/* Order Details */}
                <div className="mb-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-blue-700">Order #{id}</h2>
                    <p className="mt-2 text-gray-600">Current Status: {steps[currentStep - 1].label}</p>
                    <p className="mt-4 text-gray-500">{orderDetails.message || "No message yet"}</p>
                </div>

                {/* Stepper with Neat Horizontal Line */}
                <div className="relative flex flex-col md:flex-row items-center justify-between mt-8 px-6 gap-6 md:gap-10 mb-10">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isCurrent = stepNumber === currentStep;

                        return (
                            <div key={step.label} className="flex flex-col items-center relative text-center w-full">
                                <div
                                    className={`w-16 h-16 flex items-center justify-center rounded-full border-4 text-lg font-medium transition-all duration-300
                                        ${isCompleted
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : isCurrent
                                                ? 'bg-white border-indigo-500 text-indigo-600 shadow-lg'
                                                : 'bg-white border-gray-300 text-gray-400'
                                        }`}
                                >
                                    <span className="text-2xl">{step.icon}</span>
                                </div>
                                <div
                                    className={`mt-2 text-sm ${isCurrent ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}
                                >
                                    {step.label}
                                </div>

                                {/* Progress Line */}
                                {index !== steps.length - 1 && (
                                    <>
                                        {/* Line on desktop */}
                                        <div
                                            className={`absolute top-7 w-full h-1 transition-all duration-300 ${isCompleted ? 'bg-indigo-600' : 'bg-gray-300'} hidden md:block`}
                                            style={{
                                                top: '28px',
                                                left: '50%',
                                                height: '2px',
                                                width: '100%',
                                                transform: 'translateX(28px)',
                                                zIndex: 0
                                            }}
                                        />

                                        {/* Line on mobile */}
                                        <div className="block md:hidden h-8 border-l border-gray-300 mt-2" />
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentStep === steps.length}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {currentStep === steps.length ? 'Completed' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}
