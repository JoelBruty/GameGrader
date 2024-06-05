import React, {useState} from 'react'
import './App.css';
import Register from './register'
import Login from './login'
import CreateReview from './createReview'


function App() {
  const [user, setUser] = useState(null)
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser)
  }

  return (
    <div className="App">
      <h1>Game review app</h1>
      {user (
        <>
        <p>Welcome, {user.username}</p>
        <CreateReview userId={user._id}/>
        </>
      ) : (
        <>
        <Register />
        <Login onLogin={handleLogin}/>
        </>
      )}
    </div>
  );
}

export default App;
