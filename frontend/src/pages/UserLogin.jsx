import React from 'react';
import '../styles/common.css';

const UserLogin = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>User Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="auth-button">Login</button>
        <p className="switch-link">
          Don't have an account? <a href="/user/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;