import React, { useState } from 'react';

const AddCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: categoryName }),
            });

            if (!response.ok) {
                throw new Error('Failed to create category');
            }

            const data = await response.json();
            console.log('Category created:', data);
            setCategoryName(''); // Reset the input field
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Category</h2>
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
                required
            />
            <button type="submit">Add Category</button>
        </form>
    );
};

export default AddCategoryForm;
