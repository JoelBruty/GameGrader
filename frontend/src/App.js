import React, { useState } from 'react'
import Register from './register'
import Login from './login'
import CreateReview from './createReview'
// import { UserProvider } from './context/userContext';
import axios from 'axios';
import { BrowserRouter as Router, Routes,Route,} from 'react-router-dom';
import Home from './Homepage/Home';
import Search from './Homepage/Search';
import Profile from './Homepage/Profile';
import Game from './Homepage/Game';
import Navbar from './Homepage/Navbar';


function App() {
  const [user, setUser] = useState("");

  const TwitchAuth = async () => {
    await axios.post('http://localhost:4000/game/twitchauth')
  }

  TwitchAuth()

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };
  return (
    // <UserProvider>
    <Router>
      <div className="App">
        <Navbar/>
        {user ? (
          <>
            <p>Welcome, {user.username}</p>
          </>
        ) : (
          <>
            <p>Welcome, Guest</p>
          </>
        )}
        <br/>
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
          element={<Profile user={user} handleLogin={handleLogin}/>}
          />
          <Route
          path='/game/:id'
          element={<Game user={user} handleLogin={handleLogin}/>}
          />
        </Routes>
      </div>
    </Router>
    // </UserProvider>
  );
}

export default App;
