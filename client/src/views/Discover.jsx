import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import EntityCard from '../components/EntityCard';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import './Discover.css';

const GenreButton = ({ id, name, onClick, isSelected }) => {
  const handleClick = () => {
    onClick(id, name);
  };

  return (
    <ListItem role="none">
      <ListItemButton
        onClick={handleClick}
        role="menuitem"
        className={`genre-button ${isSelected ? 'selected' : ''}`}
      >
        {name}
      </ListItemButton>
    </ListItem>
  );
};

const Discover = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(28); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const observerRef = useRef();

  const fetchGenres = async () => {
    try {
      console.log('Fetching genres...');
      console.log(`${process.env.REACT_APP_BACKEND_URL}/api/genres`);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/genres`);
      console.log('Genres fetched:', response.data);
      setGenres(response.data);
    } catch (err) {
      console.error('Error fetching genres:', err);
      setError('Failed to fetch genres');
    }
  };

  const fetchMovies = async (id, page) => {
    if (!id) return;
    setLoading(true);
    try {
      console.log(`Fetching movies for genre ${id}, page ${page}`);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/genres/${id}?page=${page}`
      );
      console.log('Movies fetched:', response.data);
      setMovies((prevMovies) => [...prevMovies, ...response.data]);
    } catch (err) {
      console.error('Error fetching genre movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (id) => {
    setSelectedGenre(id);
    setMovies([]);
    setPage(1);
    fetchMovies(id, 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(selectedGenre, page);
    }
  }, [page]);

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <Box className="discover-container">
      <h1>Browse by Genres</h1>
      {error && <p className="error-message">{error}</p>}
      <List
        role="menubar"
        orientation="horizontal"
        className="genres-list"
      >
        {genres.map((genre) => (
          <GenreButton
            key={genre.id}
            id={genre.id}
            name={genre.name}
            onClick={handleButtonClick}
            isSelected={selectedGenre === genre.id}
          />
        ))}
      </List>
      <Box className="movies-container">
        {movies.map((movie) => (
          <EntityCard
            key={movie.id}
            movie={movie}
            title={movie.title}
            overview={movie.overview}
            year={movie.release_date?.split('-')[0] || 'N/A'}
            imageBackdrop={movie.backdrop_path}
            id={movie.id}
          />
        ))}
      </Box>
      <div ref={observerRef} className="observer-div"></div>
      {loading && <p className="loading-message">Fetching your next flix...</p>}
    </Box>
  );
};

export default Discover;
