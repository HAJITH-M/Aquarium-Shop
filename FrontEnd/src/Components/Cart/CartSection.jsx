import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    
    const fetchCartItems = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            const response = await fetch(`http://localhost:4000/cart?userEmail=${userEmail}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.fish.price * item.quantity, 0).toFixed(2);
    };

    const handleIncrease = async (id) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;
    
        try {
            const response = await fetch(`http://localhost:4000/cart/${id}?userEmail=${userEmail}`, {
                method: 'PATCH',
            });
            if (!response.ok) throw new Error('Failed to update quantity');
            fetchCartItems();
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };
    
    const handleDecrease = async (id) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;
    
        try {
            const response = await fetch(`http://localhost:4000/cart/decrease/${id}?userEmail=${userEmail}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to update quantity');
            fetchCartItems();
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };


    const handleRemoveItem = async (id) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            console.error('User email is missing');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:4000/cart/remove/${id}?userEmail=${encodeURIComponent(userEmail)}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(`Failed to remove item from cart: ${errorData.error || 'Unknown error'}`);
            }
    
            fetchCartItems(); // Refresh cart items after removal
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    
    
    
    
    

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems
                            .sort((a, b) => a.fish.title.localeCompare(b.fish.title)) // Sort by title
                            .map((item) => (
                                <li key={item.id} className="flex justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold">{item.fish.title}</h3>
                                        <span>₹{item.fish.price.toFixed(2)} x {item.quantity}</span>
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
