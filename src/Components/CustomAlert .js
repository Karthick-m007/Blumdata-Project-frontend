import React, { useState, useEffect } from "react";

const CustomAlert = ({ type = "info", message, duration = 3000, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!show) return;

        const timer = setTimeout(() => {
            setShow(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [show, duration, onClose]);

    if (!show) return null;

    const alertClasses = {
        success: "bg-green-200 text-green-800",
        error: "bg-red-200 text-red-800",
        info: "bg-blue-200 text-blue-800",
    }[type] || "bg-gray-200 text-gray-800";

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg ${alertClasses}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="flex justify-between items-center">
                <span className="font-semibold">{message}</span>
                <button
                    onClick={() => setShow(false)}
                    className="ml-4 text-lg font-bold text-gray-500 hover:text-gray-800"
                    aria-label="Close alert"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;
