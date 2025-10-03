import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/UserNavbar';

// SVG Icons for the stepper
const CheckIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CurrentStepIcon = () => (
    <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center">
        <div className="w-3 h-3 bg-indigo-600 rounded-full" />
    </div>
);

const UpcomingStepIcon = () => (
    <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">
        {/* Empty circle */}
    </div>
);

export default function QuoteDetails() {
    const { id } = useParams();
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        // Replace with your API call here
        const mockData = {
            1: {
                id: 1,
                product: '3D Printer',
                quantity: 2,
                status: 'Pending',
                requestedOn: '05-09-2025',
                stages: ['Requested', 'Pending', 'In Production', 'Testing', 'Ready for Delivery'],
            },
            2: {
                id: 2,
                product: 'CNC Machine',
                quantity: 1,
                status: 'In Production',
                requestedOn: '05-09-2025',
                stages: ['Requested', 'Pending', 'In Production', 'Testing', 'Ready for Delivery'],
            },
            3: {
                id: 3,
                product: 'Laser Cutter',
                quantity: 5,
                status: 'Ready for Delivery',
                requestedOn: '05-09-2025',
                stages: ['Requested', 'Pending', 'In Production', 'Testing', 'Ready for Delivery'],
            },
        };

        setQuote(mockData[id] || null);
    }, [id]);

    if (!quote)
        return (
            <div className="min-h-screen bg-blue-50">
                <Navbar />
                <div className="pt-24 px-6 text-center text-gray-700">Quote not found.</div>
            </div>
        );

    const currentStageIndex = quote.stages.findIndex((stage) => stage === quote.status);

    return (
        <div className="min-h-screen bg-blue-50 pt-24">
            <Navbar />
            <div className="pt-16 px-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 space-y-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Quote Details — #{quote.id}</h2>

                <div className="space-y-2 text-gray-700 text-lg">
                    <p>
                        <strong>Product:</strong> {quote.product}
                    </p>
                    <p>
                        <strong>Quantity:</strong> {quote.quantity}
                    </p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span className="text-indigo-700 font-semibold">{quote.status}</span>
                    </p>
                    <p>
                        <strong>Requested On:</strong> {quote.requestedOn}
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-5 text-gray-800">Production / Delivery Stages</h3>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        {quote.stages.map((stage, idx) => {
                            const isCompleted = idx < currentStageIndex;
                            const isCurrent = idx === currentStageIndex;

                            return (
                                <div key={stage} className="flex flex-col items-center w-20 md:w-24">
                                    <div>
                                        {isCompleted ? (
                                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                                                <CheckIcon />
                                            </div>
                                        ) : isCurrent ? (
                                            <CurrentStepIcon />
                                        ) : (
                                            <UpcomingStepIcon />
                                        )}
                                    </div>
                                    <span
                                        className={`mt-3 text-center text-sm font-medium
                    ${isCompleted ? 'text-gray-900' : isCurrent ? 'text-indigo-600' : 'text-gray-400'}`}
                                    >
                                        {stage}
                                    </span>

                                    {/* Render connecting line except for last step */}
                                    {idx !== quote.stages.length - 1 && (
                                        <div
                                            className={`w-full h-1.5 mt-3 rounded-full ${isCompleted ? 'bg-indigo-600' : 'bg-gray-300'
                                                }`}
                                            style={{ position: 'absolute', top: '35px', left: 'calc(100% + 8px)', zIndex: -1 }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
