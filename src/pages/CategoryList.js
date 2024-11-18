import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import CreateCategoryModal from './CreateCategoryModal'; // Import the modal component

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories/allcategories'); // Use the correct endpoint
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to refresh categories
  const refreshCategories = async () => {
    await fetchCategories();
  };

  return (
    <div>
      <Navbar />
      <h2>Categories</h2>
      <li className="nav-item text-end create-btncat">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create Category</button>
      </li>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}> {/* Use category._id as the key */}
              <th scope="row">{index + 1}</th>
              <td>{category.name}</td> {/* Render category name */}
              <td>
                <Link to={`/category/${category.name}`}>View</Link> {/* Use category._id in the link */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the modal */}
      <CreateCategoryModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        refreshCategories={refreshCategories} // Pass the refresh function
      />
    </div>
  );
};

export default CategoryList;
