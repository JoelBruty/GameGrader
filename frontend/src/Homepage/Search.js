import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import './styles/search.css'; 


const Search = () => {

    const [game, setGame] = useState([])
    const [search, setSearch] = useState("")


    const fetchData = async () => {
        try {
            const response = await fetch()
            if (!response.ok) {
                throw new Error("Game not found")
            }
            const data = await response.json()
            setGame(data.results)
        }
        catch (error) {
            alert("Please enter a correct game")
            console.error("Error fetching game data:", Error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData(search)
    }





    return (
        <div>
            <Navbar />
            <div id="main-container">
                <div id="searchbar">
                    <form onSubmit={handleSubmit}>
                        <div id="input-wrapper">
                            <input type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Enter Game"
                                value={search} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Search