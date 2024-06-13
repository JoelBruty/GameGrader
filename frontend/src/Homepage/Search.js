import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import './Search.css';

const Search = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = async (query) => {
    try {
      const response = await fetch(`http://localhost:4000/search?q=${query}`);
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
      <Navbar />
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
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
        <div id="search-results">
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game.id} className="game-card">
                {game.cover && <img src={`https:${game.cover.url}`} alt={game.name} />}
                <h3>{game.name}</h3>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
