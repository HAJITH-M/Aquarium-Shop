// Checkout.jsx
import React from 'react';

const Checkout = () => {
    // Assuming items are stored in local storage, you might want to manage the cart state more robustly
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const handleCheckout = () => {
        // Logic to handle the checkout process (e.g., payment processing)
        alert('Proceeding to payment...');
    };

    return (
        <div className="checkout-container">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold">Items:</h3>
                    <ul className="mb-4">
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between mb-2">
                                <span>{item.title}</span>
                                <span>₹{item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-semibold">Total: ₹{calculateTotal()}</h3>
                    <button
                        onClick={handleCheckout}
                        className="mt-4 text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
