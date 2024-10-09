// src/views/ManageCategoriesView.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { categoriesData, addCategory, deleteCategory } from '../utils/data';

const ManageCategoriesView = ({ user }) => {
  const [categories, setCategories] = useState([...categoriesData]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      addCategory(newCategory);
      setCategories([...categoriesData]);
      alert('Category added successfully');
      setNewCategory('');
    } else {
      alert('Category already exists or is invalid');
    }
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(category);
      setCategories([...categoriesData]);
      alert('Category deleted successfully');
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>Manage Categories</CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory}>
            <Input
              name="category"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="mb-4"
            />
            <Button type="submit" className="w-full">
              Add Category
            </Button>
          </form>
          <h3 className="mt-6 mb-2 font-semibold">Existing Categories</h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className="flex justify-between items-center mb-2"
              >
                {category}
                <Button
                  onClick={() => handleDeleteCategory(category)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCategoriesView;
