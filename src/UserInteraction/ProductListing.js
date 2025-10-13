import React, { useEffect, useState } from 'react';
import UserNavbar from '../Components/UserNavbar';
import { useNavigate } from 'react-router-dom';

export default function ProductListing() {
    const url = process.env.REACT_APP_BACKEND_URL
    console.log(url)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(true); // State to track loading state
    const [error, setError] = useState(null); // State to track errors

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${url}getproducts`); // Update with your backend URL
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.product); // Assuming the API response has a 'product' field
                } else {
                    setError('Failed to load products');
                }
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on the search term
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
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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

                {loading ? (
                    <div className="text-center text-blue-600">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-600">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white border rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col"
                                >
                                    <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">
                                        <img
                                            src={`${url}uploads/${p.product_image.filename}`} // Update to point to your backend image path
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
                )}
            </div>
        </div>
    );
}
