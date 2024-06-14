import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import '../styles/Profile.css';
import Register from '../register';
import Login from '../login';

// import { useUser } from '../context/userContext';

const Profile = ({ user, handleLogin }) => {
  // const { user } = useUser();
  // const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState([])

  console.log(user)

  const fetchReviews = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/review/user/${id}`)
      if (!response.ok) {
        throw new Error('Reviews not found')
      }

      const reviews = await response.json()

      setReviews(reviews)
      // console.log(reviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  useEffect(() => {
    fetchReviews(user._id)
  }, [])


  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          {/* <p>Number of Reviews: {user.reviewCount}</p> */}

          <h1>My Reviews</h1>
          {reviews != "[]" ? (
            reviews.map((review) => (
              <div key={review._id} id="recent-releases">
                <p>Rating: {review.rating}</p>
                <p>Text: {review.reviewText}</p>
                <p>Date: {review.createdAt}</p>
            </div>
            ))
          ) : (
            <p>No reviews</p>
          )}
        </div>
      ) : (
        <>
            <p>Login to view your profile</p>
            <Login onLogin={handleLogin} />
            <br/>
            <p>Don't have a profile yet?</p>
            <Register />
        </>
      )}

    </div>
  );
};

export default Profile;
