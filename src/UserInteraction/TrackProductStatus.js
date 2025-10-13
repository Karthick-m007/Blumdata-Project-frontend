// import React, { useState, useEffect } from 'react';
// import UserNavbar from '../Components/UserNavbar';

// export default function TrackProductStatus() {
//     const [productData, setProductData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Define the status steps for tracking
//     const steps = [
//         { id: 'ordered', label: 'Ordered' },
//         { id: 'production', label: 'In Production' },
//         { id: 'testing', label: 'Testing' },
//         { id: 'ready', label: 'Ready for Delivery' },
//     ];

//     // Fetch product data when component mounts
//     useEffect(() => {
//         const fetchProductData = async () => {
//             try {
//                 const response = await fetch('/api/product-status'); // Replace with your actual endpoint
//                 const data = await response.json();

//                 if (response.ok) {
//                     setProductData(data);  // Assuming the response returns product data
//                 } else {
//                     setError('Failed to fetch product status');
//                 }
//             } catch (err) {
//                 setError('Error fetching data');
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchProductData();
//     }, []); // Empty dependency array to run only on mount

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     // Mock product data for demonstration (this will be fetched)
//     const { productName, orderNumber, requestedDate, currentStatus } = productData || {};

//     return (
//         <div className="mt-24">
//             <UserNavbar />
//             <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Track Product Status</h1>
//                 <hr className="mb-6" />

//                 {/* Product Info */}
//                 <div className="bg-gray-50 p-4 rounded-md mb-6">
//                     <p className="text-sm text-gray-600">Product Name: <span className="font-medium text-gray-800">{productName || 'Loading...'}</span></p>
//                     <p className="text-sm text-gray-600">Order No: <span className="font-medium text-gray-800">{orderNumber || 'Loading...'}</span></p>
//                     <p className="text-sm text-gray-600">Requested On: <span className="font-medium text-gray-800">{requestedDate || 'Loading...'}</span></p>
//                 </div>

//                 {/* Status Tracker */}
//                 <div className="flex items-center justify-between gap-2 mt-8 relative">
//                     {steps.map((step, index) => {
//                         const isActive = step.id === currentStatus;
//                         const isCompleted = steps.findIndex(s => s.id === currentStatus) > index;

//                         return (
//                             <div key={step.id} className="flex-1 text-center relative">
//                                 <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center
//                 ${isCompleted ? 'bg-green-500 text-white' : ''}
//                 ${isActive ? 'bg-blue-500 text-white animate-pulse' : ''}
//                 ${!isActive && !isCompleted ? 'bg-gray-300 text-gray-600' : ''}`}
//                                 >
//                                     {isCompleted ? '✔' : index + 1}
//                                 </div>
//                                 <p className={`text-sm mt-2 ${isActive ? 'font-semibold text-blue-600' : 'text-gray-600'}`}>
//                                     {step.label}
//                                 </p>
//                                 {index < steps.length - 1 && (
//                                     <div className="absolute top-4 left-full w-full h-1 bg-gray-300 z-0">
//                                         <div
//                                             className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
//                                             style={{ width: '100%' }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }
