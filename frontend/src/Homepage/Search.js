import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import searchIcon from './images/searchIcon.png'

const Search = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = async (query) => {
    try {
      const response = await fetch(`http://localhost:4000/game/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Game not found');
      }
      const data = await response.json();
      setGames(data);
    } catch (error) {
      alert('Please enter a correct game');
      console.error('Error fetching game data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(search);
  };


  return (
    <div>
      <div id="main-container">
        <div id="searchbar">
          <form onSubmit={handleSubmit}>
            <div id="input-wrapper">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                value={search}
                />
              <button type="submit"><img src={searchIcon}></img></button>
            </div>
          </form>
        </div>
        {/* temo */ }
  <div id="recent-releases">
    {games.length > 0 ? (
      games.map((game) => (
        <Link to={`../Game/${game.igdbId}`}><div key={game.id} className="game-card">
          {game.coverUrl && <img src={game.coverUrl} alt={game.name} />}
          <h3>{game.name}</h3>
        </div></Link>
      ))
    ) : (
      <p>No results found</p>
    )}
  </div>
      </div >
    </div >
  );
};

export default Search;
