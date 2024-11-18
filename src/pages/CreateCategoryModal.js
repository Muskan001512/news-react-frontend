import React, { useState } from 'react';
import axios from 'axios';

const CreateCategoryModal = ({ show, handleClose, refreshCategories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await axios.post('http://localhost:3000/api/categories/createcategory', { name: categoryName });
      console.log('Category created:', response.data);
      setCategoryName(''); // Clear input field
      handleClose(); // Close the modal
      if (typeof refreshCategories === 'function') {
        refreshCategories(); // Refresh categories in the list
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message); // Set error message from the server
      } else {
        console.error('Error creating category:', error);
        setErrorMessage('This category is already created.');
      }
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Category</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}
              <div className="form-group">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
