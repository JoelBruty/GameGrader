import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import Navbar from "./Navbar";
import './Search.css';


const Game = () => {
  const [ game, setGame ] = useState([])
  const { id } = useParams()

  const fetchGameData = async (gameid) => {
    try {
      const response = await fetch(`http://localhost:4000/game/details?id=${gameid}`)
      if (!response.ok) {
        throw new Error('Game not found')
      }

      const data = await response.json()
      setGame(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching game data:', error)
    }
  }

  // fetchGameData(id)

  return (
    <div>
      <Navbar />
      <div id="main-container">
        <p>{id}</p>

        {game != undefined ? (
          game.map((game) => (
            <div key={game.id}>
              {game.coverUrl && <p>{game.name}</p>}
            </div>
          ))
        ) : (
          <p>Game not found</p>
        )}
      </div>
    </div>
  );
};

export default Game;
