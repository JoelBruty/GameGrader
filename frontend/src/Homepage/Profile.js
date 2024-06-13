import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Profile = () => {
    const { user } = useUser();
    const [profileData, setProfileData] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/profile/getprofile/${user._id}`);
          setProfileData(response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
  
      if (user) {
        fetchProfile();
      }
    }, [user]);
  
    return (
      <div>
        <h1>User Profile</h1>
        {profileData ? (
          <div>
            <p>Username: {profileData.username}</p>
            <p>Joined: {new Date(profileData.createdAt).toLocaleDateString()}</p>
            <p>Number of Reviews: {profileData.reviewCount}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    );
  };
  
  export default Profile;