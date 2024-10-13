// Cart.jsx
import React from 'react';

const Cart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleIncrease = (id) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        window.location.reload(); // Refresh the page to update the UI
    };

    const handleDecrease = (id) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        window.location.reload(); // Refresh the page to update the UI
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        window.location.reload(); // Refresh the page to update the UI
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <span>₹{item.price.toFixed(2)} x {item.quantity}</span>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleDecrease(item.id)}
                                        className="text-blue-600 mr-2"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncrease(item.id)}
                                        className="text-blue-600 ml-2"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:underline ml-4"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-semibold">Total: ₹{calculateTotal()}</h3>
                    <button className="mt-4 text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
