import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Navbar from "./Navbar";
import './Search.css';


const Game = () => {
  const [game, setGame] = useState([])
  const { id } = useParams()

  useEffect(() => {

    const fetchGameData = async (gameid) => {
      try {
        const response = await fetch(`http://localhost:4000/game/details?id=${gameid}`)
        if (!response.ok) {
          throw new Error('Game not found')
        }

        const data = await response.json()

        const formattedData = data.map(game => ({
          id: game.id,
          name: game.name,
          collection: game.collection.name,
          coverUrl: game.cover ? `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg` : null,
          companies: game.involved_companies,
          platforms: game.platforms,
          release_dates: game.release_dates,
          summary: game.summary,
          websites: game.websites,
          similar_games: game.similar_games
        }))

        setGame(formattedData)
        console.log(data)

      } catch (error) {
        console.error('Error fetching game data:', error)
      }
    }

    fetchGameData(id)
  }, [])

  return (
    <div>
      {console.log(game)}
      <Navbar />
      <div id="main-container">

        {game != undefined ? (
          game.map((game) => (
            <div key={game.id}>
              {
                <div>
                  <p>ID: {game.id}</p>
                  <p>Game: {game.name}</p>
                  <p>Collection: {game.collection}</p>
                  <p><img src={game.coverUrl}></img></p>
                </div>}
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
