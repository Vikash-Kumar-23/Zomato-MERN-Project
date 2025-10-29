import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/common.css';

const CreateFood = () => {
  const [video, setVideo] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !video) {
      alert('Please provide a food name and a video file');
      return;
    }
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('video', video);
      formData.append('name', name);
      formData.append('description', description);

      const res = await axios.post('http://localhost:3000/api/food', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('Food item created successfully');
      setVideo(null);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating food item:', error);
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        alert('Unauthorized: only food partners can create food. Please log in.');
      } else if (status === 400) {
        alert(error?.response?.data?.message || 'Bad request');
      } else if (status === 413) {
        alert('File too large. Max size is 100MB');
      } else {
        alert('Failed to create food item.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Food Item</h2>
        <div className="form-group">
          <label htmlFor="video">Video File</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter food item name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter food description"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="auth-button" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Add Food Item'}
        </button>
      </form>
    </div>
  );
};

export default CreateFood;