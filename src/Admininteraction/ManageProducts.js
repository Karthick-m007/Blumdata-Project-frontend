import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CustomAlert from "../Components/CustomAlert ";  // Import the CustomAlert component

export default function ManageProducts() {
    const url = process.env.REACT_APP_BACKEND_URL;  // backend URL
    console.log(url);

    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: null // Image is initially null
    });
    const [imagePreview, setImagePreview] = useState(null);  // State to store image preview URL

    const [alert, setAlert] = useState(null); // State for managing the custom alert

    // Fetch products with session support (cookie sent automatically)
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${url}getproducts`, {
                method: "GET",
                credentials: "include",  // Important: ensures cookies (session) are included
            });

            const data = await response.json();
            if (data.success) {
                setProducts(data.product);
            } else {
                console.error("Failed to fetch products:", data.message);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                image: null // Don't retain the old image when editing
            });
            // Check if product has an image and set the preview
            if (product.product_image?.filepath) {
                setImagePreview(`${url}uploads/${product.product_image.filename}`);
            } else {
                setImagePreview(null); // No image preview if no image
            }
        } else {
            setFormData({ name: "", price: "", description: "", image: null });
            setImagePreview(null); // Reset image preview when adding new product
        }
        setCurrentProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentProduct(null);
        setFormData({ name: "", price: "", description: "", image: null });
        setImagePreview(null); // Clear preview when modal closes
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));
        const fileURL = URL.createObjectURL(file);
        setImagePreview(fileURL); // Set preview for the selected image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("description", formData.description);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            let response;
            if (currentProduct) {
                // Update existing product
                response = await fetch(`${url}updateproduct/${currentProduct.manageProduct_id}`, {
                    method: "PUT",
                    body: formDataToSend,
                    credentials: "include", // Include session cookie
                });
            } else {
                // Add new product
                response = await fetch(`${url}addnewProduct`, {
                    method: "POST",
                    body: formDataToSend,
                    credentials: "include", // Include session cookie
                });
            }

            const data = await response.json();
            if (data.success) {
                setAlert({ type: "success", message: currentProduct ? "Product updated!" : "Product added!" });
                fetchProducts(); // Refresh product list
                closeModal();
            } else {
                setAlert({ type: "error", message: data.message || "Something went wrong." });
            }
        } catch (err) {
            console.error("Error submitting product:", err);
            setAlert({ type: "error", message: "Error submitting product. Please try again later." });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`${url}deleteproduct/${id}`, {
                    method: "DELETE",
                    credentials: "include", // Include session cookie
                });
                const data = await response.json();
                if (data.success) {
                    setAlert({ type: "success", message: "Product deleted!" });
                    fetchProducts(); // Refresh product list
                } else {
                    setAlert({ type: "error", message: data.message || "Failed to delete product." });
                }
            } catch (err) {
                console.error("Error deleting product:", err);
                setAlert({ type: "error", message: "Error deleting product. Please try again later." });
            }
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

                {/* Show Custom Alert */}
                {alert && (
                    <CustomAlert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                {modalOpen && (
                    <>
                        {/* Apply light blur effect on the background */}
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={closeModal} />

                        <div
                            className="fixed inset-0 flex items-center justify-center z-50"
                            onClick={(e) => e.stopPropagation()}
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

                                    {/* Show image preview if available */}
                                    <div className="w-full">
                                        {imagePreview && (
                                            <div className="mb-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="Image preview"
                                                    className="w-48 h-auto rounded-md"
                                                />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleFileChange}
                                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        {currentProduct ? "Update Product" : "Add Product"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length === 0 && (
                        <div className="text-center text-gray-500">No products available.</div>
                    )}
                    {products.map((p) => (
                        <div
                            key={p.manageProduct_id}
                            className="bg-white border rounded-lg shadow-lg p-4 transition-transform duration-200 hover:scale-[1.02] transform"
                        >
                            <div>
                                {p.product_image?.filepath && (
                                    <img
                                        src={`${url}uploads/${p.product_image.filename}`}  // Correct path to the image
                                        alt="Product"
                                        className="mt-2 w-full h-48 object-cover rounded-md"
                                    />
                                )}

                                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                                <p className="text-gray-600">{p.description}</p>
                                <p className="mt-1 font-medium text-blue-600">{p.price}</p>
                            </div>
                            <div className="mt-4 space-x-2 flex justify-between items-center">
                                <button
                                    onClick={() => openModal(p)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(p.manageProduct_id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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
