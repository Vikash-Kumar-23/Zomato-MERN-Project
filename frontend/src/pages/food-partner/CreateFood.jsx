import React from 'react';
import '../../styles/common.css'; // Import common styles

const CreateFood = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Create Food Item</h2>
        <div className="form-group">
          <label htmlFor="foodName">Food Name</label>
          <input type="text" id="foodName" name="foodName" placeholder="Enter food item name" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Enter food description" rows="3"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" placeholder="Enter price" />
        </div>
        <button type="submit" className="auth-button">Add Food Item</button>
      </form>
    </div>
  );
};

export default CreateFood;