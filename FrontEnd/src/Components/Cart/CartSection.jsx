import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete, AiOutlineLoading } from 'react-icons/ai';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); 

    const fetchCartItems = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            const response = await fetch(`https://aquarium-shop-ltwi.onrender.com/cart?userEmail=${userEmail}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            setCartItems(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setIsLoading(false);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.fish.price * item.quantity, 0).toFixed(2);
    };

    const handleIncrease = async (id) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            const response = await fetch(`https://aquarium-shop-ltwi.onrender.com/cart/${id}?userEmail=${userEmail}`, {
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
            const response = await fetch(`https://aquarium-shop-ltwi.onrender.com/cart/decrease/${id}?userEmail=${userEmail}`, {
                method: 'PATCH',
            });
            if (!response.ok) throw new Error('Failed to update quantity');
            fetchCartItems();
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const handleRemoveItem = async (id) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            const response = await fetch(`https://aquarium-shop-ltwi.onrender.com/cart/remove/${id}?userEmail=${encodeURIComponent(userEmail)}`, {
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

    const handleCheckout = () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            alert('Please log in to proceed to checkout.');
            return;
        }
        navigate('/checkout'); // Navigate to checkout page
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {isLoading ? (
 <div className="flex flex-col justify-center items-center h-screen">
 <AiOutlineLoading className="text-4xl text-blue-500 animate-spin" />
 <p className="mt-4 text-lg text-gray-600">Loading...</p>
</div>
            ) : cartItems.length === 0 ? (
                <p className="text-lg text-gray-500">Your cart is empty, go back to Home and add some items to your cart.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems
                            .sort((a, b) => a.fish.title.localeCompare(b.fish.title)) // Sort by title
                            .map((item) => (
                                <li key={item.id} className="flex justify-between mb-4 border-b border-gray-200 pb-4">
                                    <div className="flex items-center">
                                        <img src={item.fish.image} alt={item.fish.title} className="w-20 h-20 object-cover mr-4" />
                                        <div>
                                            <h3 className="font-semibold">{item.fish.title}</h3>
                                            <span className="text-lg text-gray-500">₹{item.fish.price.toFixed(2)} x {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleDecrease(item.id)}
                                            className="text-blue-600 mr-2"
                                        >
                                            <AiOutlineMinus />
                                        </button>
                                        <span className="text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(item.id)}
                                            className="text-blue-600 ml-2"
                                        >
                                            <AiOutlinePlus />
                                        </button>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:underline ml-4"
                                        >
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                    <h3 className="text-lg font-semibold">Total: ₹{calculateTotal()}</h3>
                    <button
                        onClick={handleCheckout} // Navigate to Checkout
                        className="mt-4 text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;