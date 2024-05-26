// search page
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EntityCard from "../components/EntityCard";
import { useState } from "react";
import { Link } from "react-router-dom";

function Search() {
    const params = useParams();
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState(false);
    
    useEffect(() => {
        axios
        .get(`http://localhost:3001/api/entity/search?movie=${params.query}`)
        .then((res) => {
            console.log(res.data);
            setMovies(res.data);
            setLoading(false);
        });
        console.log(params);
    }, [params]);
    
    const handleSearch = (e) => {
        e.preventDefault();
        axios
        .get(`http://localhost:3001/api/entity/search?movie=${search}`)
        .then((res) => {
            console.log(res.data);
            setMovies(res.data);
            setLoading(false);
        });
        setSearched(true);
    };
    
    // if (loading) {
    //     return <div>loading...</div>;
    // }
    
    return (
        <div>
        <div className="search-bar">
            <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
            </form>
        </div>
        <div className="search-results">
            {searched && movies.length === 0 ? (
            <h1>No results found</h1>
            ) : (
            movies.map((movie, index) => (
                <Link
                to={`/stream/movie/${movie.id}`}
                className="entity-card-title-outer"
                >
                <div
                    style={{
                    backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_bestv2${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    width: "200px",
                    height: "300px",
                    overflow: "hidden",
                    }}
                    className="entity-card-outer"
                >
                    <h1 className="entity-card-title">{movie.original_title}</h1>
                    <div className="entity-card-body">
                    <p>{movie.overview}</p>
                    </div>
                </div>
                </Link>
            ))
            )}
        </div>
        </div>
    );
    }
    
    export default Search;