import React, {useState} from 'react'
import './App.css';
import Register from './register'
import Login from './login'
import CreateReview from './createReview'

import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  const TwitchAuth = async() => {
    await axios.post('http://localhost:4000/game/twitchauth')
  }

  TwitchAuth()

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };
  return (
    <div className="App">
      <h1>Game Review App</h1>
      {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <CreateReview userId={user._id} />
        </>
      ) : (
        <>
          <Register />
          <Login onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
