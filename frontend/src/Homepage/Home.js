import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import './styles/app.css'; 
import './styles/home.css'; 

const Home = () => {
    const [recentReleases, setRecentReleases] = useState([]);

    useEffect(() => {
        const fetchRecentReleases = async () => {
            try {
                const response = await fetch('http://localhost:4000/game/recent');
                if (!response.ok) {
                    throw new Error('Failed to fetch recent releases');
                }
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
                            {game.coverUrl && <img src={game.coverUrl} alt={game.name} />}
                            <h3>{game.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;

