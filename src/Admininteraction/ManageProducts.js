import React, { useState } from "react";
import Navbar from "../Components/Navbar";

export default function ManageProducts() {
    const [products, setProducts] = useState([
        { id: 1, name: "CNC Machine", price: "$2500", description: "High precision CNC machine" },
        { id: 2, name: "Laser Printer", price: "$1500", description: "High-speed laser printer" },
        { id: 3, name: "3D Printer", price: "$3500", description: "Professional 3D printing machine" },
        { id: 4, name: "Hydraulic Press", price: "$4500", description: "Heavy-duty hydraulic press" }
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({ name: "", price: "", description: "" });

    const openModal = (product = null) => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
            });
        } else {
            setFormData({ name: "", price: "", description: "" });
        }
        setCurrentProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentProduct(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentProduct) {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === currentProduct.id ? { ...p, ...formData } : p
                )
            );
            alert("Product updated!");
        } else {
            setProducts((prev) => [...prev, { id: Date.now(), ...formData }]);
            alert("Product added!");
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="bg-blue-50 min-h-screen pt-24">
            <Navbar />
            <div className="max-w-7xl mx-auto p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-800">Manage Products</h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        + Add Product
                    </button>
                </div>

                {modalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 animate-fadeIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    {currentProduct ? "Edit Product" : "Add New Product"}
                                </h2>
                                <button
                                    className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                                    onClick={closeModal}
                                    aria-label="Close"
                                >
                                    &times;
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    required
                                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Price"
                                    required
                                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    required
                                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    rows="3"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                    {currentProduct ? "Update Product" : "Add Product"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length === 0 && (
                        <div className="text-center text-gray-500">No products available.</div>
                    )}
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white border rounded-lg shadow-lg p-4 transition-transform duration-200 hover:scale-[1.02] transform"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                                <p className="text-gray-600">{p.description}</p>
                                <p className="mt-1 font-medium text-blue-600">{p.price}</p>
                            </div>
                            <div className="mt-4 space-x-2 flex justify-between items-center">
                                <button
                                    onClick={() => openModal(p)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
