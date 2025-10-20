import React from 'react';
import '../styles/common.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contactName, phone, address, email, password, confirmPassword } = e.target.elements;
    try {
      const response = await axios.post('http://localhost:3000/api/auth/foodpartner/register', {
        name: name.value,
        contactName: contactName.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      },{
        withCredentials: true,
      });
      if (response.status === 201) {
        alert('Food partner registered successfully');
        navigate('/create-food');
      }
    } catch (error) {
      alert(error.response.data.message || 'Registration failed');
    }
  };
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Food Partner Register</h2>
        <div className="form-group">
          <label htmlFor="name">Restaurant Name</label>
          <input type="text" id="name" name="name" placeholder="Enter restaurant name" />
        </div>
        <div className="form-group">
          <label htmlFor="contactName">Contact Person Name</label>
          <input type="text" id="contactName" name="contactName" placeholder="Enter contact person name" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter phone number" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Restaurant Address</label>
          <textarea id="address" name="address" placeholder="Enter restaurant address" rows="3"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" />
        </div>
        <button type="submit" className="auth-button">Register</button>
        <p className="switch-link">
          Already have an account? <a href="/foodpartner/login">Login</a>
        </p>
        <p className="switch-link">
          Register as a normal user? <a href="/user/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default FoodPartnerRegister;