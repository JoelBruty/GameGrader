import React, { useState } from 'react';
import axios from 'axios';

function CreateReview({ userId, gameId }) {
  // const [formData, setFormData] = useState({ gameId: '', reviewText: '', rating: '' });
  const [formData, setFormData] = useState({ reviewText: '', rating: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/review/create', { ...formData, gameId }, { headers: { 'User-id':userId } });
      alert('Review created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Review</h2>
      {/* <input type="text" name="gameId" placeholder="Game ID" onChange={handleChange} required /> */}
      <textarea name="reviewText" placeholder="Review" onChange={handleChange} required></textarea>
      <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default CreateReview;
