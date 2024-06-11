import React from "react";
import Navbar from "./Navbar";

const Search = () => {
    return(
        <div>
       <Navbar/>
       
        <form>
            <input type="text" placeholder="Search for games...."/>
            <button type="submit">Search</button>
        </form>
        </div>
    )
}

export default Search