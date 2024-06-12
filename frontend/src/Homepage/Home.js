import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import '../styles/App.css'; 
import '../styles/Home.css'; 

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Home = () => {
  const [recentReleases, setRecentReleases] = useState([]);

  useEffect(() => {
    const fetchRecentReleases = async () => {
      try {
        const response = await fetch('http://localhost:4000/game/recent');
        const data = await response.json();
        setRecentReleases(data);
      } catch (error) {
        console.error('Error fetching recent releases:', error);
      }
    };

    fetchRecentReleases();
  }, []);

  return (
    <>
      <Navbar />
      <div id="main-container">
        <h1>Recent Releases</h1>
        <div id="recent-releases">
          {recentReleases.map(game => (
            <div key={game.id} className="game-card">
              {game.cover && <img src={game.cover.url} alt={game.name} />}
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

