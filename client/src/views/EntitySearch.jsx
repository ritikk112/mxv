import React, { useEffect, useState } from 'react';
import axios from "axios";
import EntityCard from "../components/EntityCard";
import { useSearchParams } from "react-router-dom";
import Input from '@mui/joy/Input';
import { Button } from '@mui/joy';

const EntitySearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [entityList, setEntityList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get('query') || "";
        if (query) {
            setSearchTerm(query);
            fetchEntities(query);
        }
    }, [searchParams]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const updateSearchParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const fetchEntities = (query) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/entity/search?query=${query}`)
            .then((response) => {
                console.log(response.data);
                if (response.data.length === 0) {
                    alert("No results found");
                }
                setEntityList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching entities:", error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            updateSearchParam('query', searchTerm);
            fetchEntities(searchTerm);
        } else {
            alert("Please enter a valid search term.");
        }
    };

    return (
        <div className='search-page'>
            <div className='search-box'>
                <Input
                    placeholder="Search for movies or TV shows"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <Button variant="outlined" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </div>
            <div className='entity-recommendation-list'>
                {entityList.map((entity) => (
                    <EntityCard key={entity.id} movie={entity} />
                ))}
            </div>
        </div>
    );
};

export default EntitySearch;
