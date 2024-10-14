import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState(''); // State for address input
    const navigate = useNavigate();

    const fetchCartItems = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            const response = await fetch(`http://localhost:4000/cart?userEmail=${userEmail}`);
            if (!response.ok) throw new Error('Failed to fetch cart items');
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleCancel = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            await Promise.all(cartItems.map(item => 
                fetch(`http://localhost:4000/cart/remove/${item.id}?userEmail=${encodeURIComponent(userEmail)}`, {
                    method: 'DELETE',
                })
            ));
            navigate('/cart'); // Redirect to cart after cancellation
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const handlePlaceOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        if (!address) {
            alert('Please enter your address to place the order.');
            return;
        }

        try {
            await Promise.all(cartItems.map(item =>
                fetch(`http://localhost:4000/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userEmail,
                        fishId: item.fish.id,
                        quantity: item.quantity,
                        address, // Include address in the order
                    }),
                })
            ));
            handleCancel(); // Clear cart after placing the order
            alert('Order placed successfully!');
            navigate('/'); // Redirect to home or order confirmation page
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty, go back to Home and add some items to your cart.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id} className="flex justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold">{item.fish.title}</h3>
                                    <span>₹{item.fish.price.toFixed(2)} x {item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-2 p-2 border rounded"
                        required
                    />
                    <button onClick={handlePlaceOrder} className="mt-4 text-white bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2">
                        Place Order
                    </button>
                    <button onClick={handleCancel} className="mt-2 text-red-500 hover:underline ml-4">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
