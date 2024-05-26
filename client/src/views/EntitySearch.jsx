import React from 'react';
import axios from "axios";
import EntityCard from "../components/EntityCard";
import { useState } from "react";

const EntitySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [entityList, setEntityList] = useState([]);

    const [searchType, setSearchType] = useState("movie");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Perform search based on searchTerm and searchType
        // You can use axios to make the API request
        // For example:
        axios.get(`http://localhost:3001/api/entity/search?query=${searchTerm}`)
            .then((response) => {
                console.log(response.data, searchTerm);
                setEntityList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div>
                <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
                <label>
                    <input type="radio" value="movie" checked={searchType === "movie"} onChange={handleSearchTypeChange} />
                    Movie
                </label>
                <label>
                    <input type="radio" value="tv" checked={searchType === "tv"} onChange={handleSearchTypeChange} />
                    TV Show
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className='entity-recommendation-list'>
                {entityList.map((entity) => (
                    <EntityCard key={entity.id} movie={entity} />
                ))}
            </div>
        </>
    );
};

export default EntitySearch;