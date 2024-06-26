import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; 
import '../styles/Home.css'; 

const Home = () => {
  const [recentReleases, setRecentReleases] = useState([]);

  useEffect(() => {
    const fetchRecentReleases = async () => {
      try {
        const response = await fetch('http://localhost:4000/game/recent');
        const data = await response.json();

        const formattedData = data.map(game => ({
          id: game.game.id,
          name: game.game.name,
          coverUrl: game.game.cover ? `https://images.igdb.com/igdb/image/upload/t_720p/${game.game.cover.image_id}.jpg` : null
        }));

        setRecentReleases(formattedData);
      } catch (error) {
        console.error('Error fetching recent releases:', error);
      }
    };

    fetchRecentReleases();
  }, []);

  return (
    <>
      <div id="main-container">
        <h1>Recent Releases</h1>
        <div id="recent-releases">
          {recentReleases.length > 0 ? (
            recentReleases.map(game => (
              <Link to={`Game/${game.id}`}><div key={game.id} className="game-card">
                {game.coverUrl && <img src={game.coverUrl} alt={game.name}/>}
                <h3>{game.name}</h3>
              </div></Link>
            ))
          ) : (
            <p>No recent releases available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

// const Home = () => {
//   const [recentReleases, setRecentReleases] = useState([]);

//   useEffect(() => {
//     const fetchRecentReleases = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/game/recent');
//         const data = await response.json();
//         console.log(data)
//         setRecentReleases(data);

//         let gameIds = Object.keys(data).map(id => data[id].game.id)
//         let gameNames = Object.keys(data).map(id => data[id].game.name)
//         let gameCovers = Object.keys(data).map(id => data[id].game.cover.image_id)
//         // console.log(gameIds, gameNames, gameCovers)
//         console.log(`https://images.igdb.com/igdb/image/upload/t_720p/${gameCovers[0]}.jpg`)

//       } catch (error) {
//         console.error('Error fetching recent releases:', error);
//       }
//     };

//     fetchRecentReleases();
//   }, []);
// return (
//     <>
//       <Navbar />
//       <div id="main-container">
//         <h1>Recent Releases</h1>
//         <div id="recent-releases">
//           {Array.isArray(recentReleases) ? (
//             recentReleases.map((game) => (
//               <div key={game.id} className="game-card">
//                 {game.cover && <img src={game.cover.url} alt={game.name} />}
//                 <h3>{game.name}</h3>
//               </div>
//             ))
//           ) : (
//             <p>No recent releases available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

