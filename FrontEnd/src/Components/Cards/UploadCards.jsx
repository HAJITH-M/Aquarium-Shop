import React, { useState, useEffect } from 'react';
import AddCategoryForm from './Categories';

const AddFishDetailsForm = () => {
    const [fishDetails, setFishDetails] = useState({
        image: '',
        title: '',
        description: '',
        price: '',
        link: '',
        categoryId: '',
    });
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFishDetails({ ...fishDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting fish details:', fishDetails); // Debugging log
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/fish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...fishDetails,
                    price: parseFloat(fishDetails.price), // Ensure price is a float
                    categoryId: fishDetails.categoryId ? Number(fishDetails.categoryId) : null, // Ensure categoryId is an integer or null
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create fish details');
            }

            const data = await response.json();
            console.log('Fish details created:', data);
            setFishDetails({ image: '', title: '', description: '', price: '', link: '', categoryId: '' }); // Reset the form
        } catch (error) {
            console.error('Error adding fish details:', error);
        }
    };

    return (
        <>
            <AddCategoryForm onCategoryAdded={fetchCategories} />
            <br />
            <form onSubmit={handleSubmit}>
                <h2>Add Fish Details</h2>
                <input
                    type="text"
                    name="image"
                    value={fishDetails.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required
                />
                <input
                    type="text"
                    name="title"
                    value={fishDetails.title}
                    onChange={handleChange}
                    placeholder="Fish Title"
                    required
                />
                <textarea
                    name="description"
                    value={fishDetails.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={fishDetails.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    name="link"
                    value={fishDetails.link}
                    onChange={handleChange}
                    placeholder="Link"
                />
                <select
                    name="categoryId"
                    value={fishDetails.categoryId}
                    onChange={handleChange}
                    onClick={fetchCategories}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Fish Details</button>
            </form>
        </>
    );
};

export default AddFishDetailsForm;