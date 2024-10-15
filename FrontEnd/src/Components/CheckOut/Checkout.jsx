import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineClose,AiOutlineLoading } from 'react-icons/ai';
import { RiArrowLeftSLine } from 'react-icons/ri';


const Loading = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <AiOutlineLoading className="text-4xl text-blue-500 animate-spin" />
            <p className="mt-4 text-lg text-gray-600">{message}</p>
        </div>
    );
};


const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCartItems = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            const response = await fetch(`https://aquarium-shop-ltwi.onrender.com/cart?userEmail=${userEmail}`);
            if (!response.ok) throw new Error('Failed to fetch cart items');
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        try {
            await Promise.all(cartItems.map(item => 
                fetch(`https://aquarium-shop-ltwi.onrender.com/cart/remove/${item.id}?userEmail=${encodeURIComponent(userEmail)}`, {
                    method: 'DELETE',
                })
            ));
            navigate('/cart');
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
                fetch(`https://aquarium-shop-ltwi.onrender.com/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userEmail,
                        fishId: item.fish.id,
                        quantity: item.quantity,
                        address,
                    }),
                })
            ));
            handleCancel();
            alert('Order placed successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            {isLoading ? (
                <Loading message="Fetching your cart items..." />
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl font-bold">Checkout</h2>
                        <button onClick={() => navigate('/cart')} className="text-gray-600 hover:text-gray-900 transition duration-300 flex items-center">
                            <RiArrowLeftSLine size={24} />
                            <span className="ml-2">Back to Cart</span>
                        </button>
                    </div>
                    {cartItems.length === 0 ? (
                        <div className="text-center">
                            <AiOutlineShoppingCart size={48} className="mx-auto mb-4" />
                            <p className="text-lg">Your cart is empty.</p>
                            <button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div>
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.id} className="flex justify-between items-center mb-4 border-b pb-4">
                                        <div className="flex items-center">
                                            <img src={item.fish.image} alt={item.fish.title} className="w-12 h-12 object-cover mr-4" />
                                            <div>
                                                <h3 className="font-semibold">{item.fish.title}</h3>
                                                <span>₹{item.fish.price.toFixed(2)} x {item.quantity}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => handleCancel()} className="text-red-500 hover:text-red-700 transition duration-300">
                                            <AiOutlineClose size={20} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4">
                                <label className="block text-lg font-bold mb-2">Address:</label>
                                <input
                                    type="text"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button onClick={handlePlaceOrder} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
                                    Place Order
                                </button>
                                <button onClick={handleCancel} className="text-red-500 hover:text-red-700 transition duration-300">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Checkout;
