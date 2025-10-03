import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

export default function AdminTrackStatus() {
    const steps = [
        { label: 'Ordered', icon: '📦' },
        { label: 'In Production', icon: '🏭' },
        { label: 'Testing', icon: '🧪' },
        { label: 'Ready for Delivery', icon: '🚚' },
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    return (
        <div className="pt-24 bg-blue-50 scroll-mt-24 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
                    Order Production Tracker
                </h1>

                <div className="bg-gray-50 p-4 rounded-md mb-10 text-sm text-gray-700 space-y-1">
                    <p>
                        Product Name: <span className="font-semibold">Smart Watch</span>
                    </p>
                    <p>
                        Order No: <span className="font-semibold">#1234</span>
                    </p>
                    <p>
                        Requested On: <span className="font-semibold">09-09-2025</span>
                    </p>
                </div>

                {/* Stepper */}
                <div className="relative flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0 px-2 md:px-6 mb-10">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isCurrent = stepNumber === currentStep;

                        return (
                            <div key={step.label} className="flex flex-col items-center relative w-full text-center">
                                <div
                                    className={`w-14 h-14 flex flex-col items-center justify-center rounded-full border-2 text-lg font-medium transition
                    ${isCompleted
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : isCurrent
                                                ? 'bg-white border-indigo-500 text-indigo-600 shadow-lg'
                                                : 'bg-white border-gray-300 text-gray-400'
                                        }`}
                                >
                                    <span className="text-xl">{step.icon}</span>
                                </div>

                                <div
                                    className={`mt-2 text-sm ${isCurrent ? 'text-indigo-600 font-semibold' : 'text-gray-500'
                                        }`}
                                >
                                    {step.label}
                                </div>

                                {index !== steps.length - 1 && (
                                    <>
                                        {/* Line on desktop */}
                                        <div
                                            className={`absolute md:top-7 md:left-1/2 md:right-[-50%] md:h-1 md:w-full hidden md:block ${isCompleted ? 'bg-indigo-600' : 'bg-gray-300'
                                                }`}
                                            style={{
                                                top: '28px',
                                                left: '50%',
                                                height: '2px',
                                                width: '100%',
                                                transform: 'translateX(28px)',
                                                zIndex: 0
                                            }}
                                        ></div>

                                        {/* Line on mobile */}
                                        <div className="block md:hidden h-8 border-l border-gray-300 mt-2" />
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
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
