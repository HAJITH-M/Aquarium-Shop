import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaTimes, FaSearch } from 'react-icons/fa';

const CategorySwipeCards = () => {
    const [categories, setCategories] = useState([]);
    const [fishDetails, setFishDetails] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleAddToCart = async (product) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            return navigate('/login');
        }
    
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    fishId: product.id,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add to cart: ${errorData.error || response.statusText}`);
            }
    
            const cartItem = await response.json();
            console.log('Cart updated:', cartItem);
            toast.success(`${product.title} added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Error adding to cart. Please try again.');
        }
    };

    const handleBuyNow = (product) => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            navigate(`/fish/${product.id}`);
        } else {
            navigate('/login');
        }
    };

    const fetchFishDetails = async () => {
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/fish');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const groupedFish = {};
            data.forEach(fish => {
                if (!groupedFish[fish.categoryId]) {
                    groupedFish[fish.categoryId] = [];
                }
                groupedFish[fish.categoryId].push(fish);
            });
            setFishDetails(groupedFish);
        } catch (error) {
            console.error('Error fetching fish details:', error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCategories(), fetchFishDetails()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedCard]);

    const truncateDescription = (description, lines = 3) => {
        const words = description.split(' ');
        const truncated = words.slice(0, lines * 1).join(' ');
        return truncated + (words.length > lines * 1 ? '...' : '');
    };

    const renderStructuredDescription = (description) => {
        if (!description) return null;

        const sections = [
            { title: "Features", content: description.split("Features:")[1]?.split("Care Instructions:")[0] || "" },
            { title: "Care Instructions", content: description.split("Care Instructions:")[1]?.split("Why Choose Albino Oscar Fish?")[0] || "" },
            { title: "Why Choose Albino Oscar Fish?", content: description.split("Why Choose Albino Oscar Fish?")[1] || "" }
        ];

        return (
            <div className="space-y-4">
                {sections.map((section, index) => (
                    section.content && (
                        <div key={index}>
                            <h4 className="text-lg font-bold mb-2">{section.title}</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                {section.content.split("\n").filter(item => item.trim() !== "").map((item, idx) => (
                                    <li key={idx} dangerouslySetInnerHTML={{__html: item.replace(/(\w+):/g, '<strong>$1:</strong>')}} />
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        );
    };

    const SkeletonLoader = () => (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-md h-full flex flex-col">
                        <div className="w-full h-48 bg-gray-300"></div>
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0 md:space-x-6">
                                <div className="h-10 bg-gray-200 rounded w-full md:w-1/2"></div>
                                <div className="h-10 bg-gray-200 rounded w-full md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const filteredFishDetails = Object.keys(fishDetails).reduce((acc, categoryId) => {
        acc[categoryId] = fishDetails[categoryId].filter(fish =>
            fish.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return acc;
    }, {});

    const hasResults = Object.values(filteredFishDetails).some(category => category.length > 0);

    return (
        <div className="px-2 md:px-8 mx-auto">
            <ToastContainer />
            <div className="mb-6 relative">
                <div className="flex justify-center mb-6">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search fish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>
            {loading ? (
                <SkeletonLoader />
            ) : hasResults ? (
                categories.map(category => {
                    const categoryFish = filteredFishDetails[category.id] || [];
                    if (categoryFish.length === 0) return null;

                    return (
                        <div key={category.id} className="mb-6">
                            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                {categoryFish.map((card) => (
                                    <div key={card.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-md h-full flex flex-col">
                                        <img src={card.image} alt={card.title} className="w-full  object-cover" />
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="text-lg leading-6 font-bold text-gray-900">{card.title}</h3>
                                            <p className="text-gray-600 mt-1 text-sm cursor-pointer flex-grow" onClick={() => setSelectedCard(card)}>
                                                {truncateDescription(card.description)}
                                            </p>
                                            <div className="flex flex-col  space-y-4 justify-end ">
                                                <span className="text-xl font-extrabold text-gray-900">₹{card.price.toFixed(2)}</span>
                                                <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0 md:space-x-6">
                                                    <button
                                                        onClick={() => handleAddToCart(card)}
                                                        className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    <button
                                                        onClick={() => handleBuyNow(card)}
                                                        className="text-white bg-teal-600 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
                                                    >
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-600">No results found for "{searchTerm}". Please try a different search term.</p>
                </div>
            )}
            {selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">{selectedCard.title}</h3>
                            <button onClick={() => setSelectedCard(null)} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {renderStructuredDescription(selectedCard.description)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategorySwipeCards;