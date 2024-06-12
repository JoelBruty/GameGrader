import React, { useState } from 'react'
import './App.css';
import Register from './register'
import Login from './login'
import CreateReview from './createReview'
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Homepage/Home';
import Navbar from './Homepage/Navbar';
import Search from './Homepage/Search';
import Profile from './Homepage/Profile';

function App() {
  const [user, setUser] = useState(null);

  const TwitchAuth = async () => {
    await axios.post('http://localhost:4000/game/twitchauth')
  }

  TwitchAuth()

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/search'
            element={<Search />}
          />
          <Route
          path='/profile'
          element={<Profile/>}
          />
        </Routes>



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
    </Router>
  );
}

export default App;
