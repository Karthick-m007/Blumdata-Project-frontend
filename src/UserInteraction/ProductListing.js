import React, { useEffect, useState } from 'react';
import UserNavbar from '../Components/UserNavbar';
import { useNavigate } from 'react-router-dom';
import image1 from "../images/3d-printed-david-bust-3d-printer_23-2152014110.jpg"
import image2 from "../images/cnc-milling-machine.webp"
import image3 from "../images/cutting-2.jpeg.webp"

export default function ProductListing() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Updated products array with image URLs
    const products = [
        {
            id: 1,
            name: "3D Printer",
            description: "High precision industrial 3D printer",
            price: "$1000",
            image:image1,
        },
        {
            id: 2,
            name: "CNC Machine",
            description: "Computer-controlled cutting machine",
            price: "$2500",
            image: image2,
        },
        {
            id: 3,
            name: "Laser Cutter",
            description: "Precision laser cutting equipment",
            price: "Contact Sales",
            image: image3,
        },
    ];

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-blue-50">
            <UserNavbar />
            <div className="mt-10 px-6 md:px-24 py-8">
                {/* Search Bar */}
                <form
                    className="flex items-center max-w-xl mx-auto mb-10"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            placeholder="Search products..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        Search
                    </button>
                </form>

                {/* Product Grid */}
                <h1 className="text-2xl text-blue-800 font-medium mb-6 text-center">Available Products</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white border rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col"
                            >
                                <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">
                                    <img
                                        src={p.image} // Display product image
                                        alt={p.name}
                                        className="object-contain w-full h-full"
                                    />
                                </div>

                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{p.name}</h2>
                                <p className="text-blue-600 font-medium mb-2">{p.price}</p>
                                <p className="text-gray-600 flex-grow mb-4">{p.description}</p>

                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded mt-auto"
                                    onClick={() => navigate('/requestquote')}
                                >
                                    Request Quote
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 col-span-full text-center">No products found for "{searchTerm}"</p>
                    )}
                </div>
            </div>
        </div>
    );
}
