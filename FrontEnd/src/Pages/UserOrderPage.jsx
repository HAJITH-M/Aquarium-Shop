import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaFish, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const email = localStorage.getItem('userEmail');

            if (!email) {
                setError('No email found in local storage. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://aquarium-shop-ltwi.onrender.com/orders', {
                    headers: {
                        'useremail': email,
                    },
                });
                setOrders(response.data);
            } catch (err) {
                setError('Failed to retrieve orders');
                console.error('Error details:', err.response ? err.response.data : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
    }

    if (error) {
        return <div className="text-red-500 text-center text-base sm:text-lg md:text-xl mt-4 sm:mt-6 md:mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600 text-sm sm:text-base">No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{order.fish.title}</h3>
                                <FaShoppingCart className="text-blue-500 text-xl sm:text-2xl" />
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                                <p className="flex items-center text-gray-700 text-sm sm:text-base">
                                    <FaFish className="mr-2 text-blue-500" />
                                    Order ID: {order.id}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm sm:text-base">
                                    <span className="mr-2 font-bold">Qty:</span> {order.quantity}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm sm:text-base">
                                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                                    {order.address}
                                </p>
                                <p className="flex items-center text-gray-700 text-sm sm:text-base">
                                    <FaCalendarAlt className="mr-2 text-green-500" />
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;