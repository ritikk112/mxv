import * as React from 'react';
import axios from "axios";
import EntityCard from '../components/EntityCard';

const HomePage = () => {
  const baseURL = "http://localhost:3001/api/movie/recommend";
  const [movies, setMovies] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setMovies(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1 className='homepage-heading'>  </h1>
      <div className='entity-recommendation-list'>
        {movies.map((movie, index) => (
          <EntityCard
            movie={movie}
            key={index}
            title={movie.title}
            overview={movie.overview}
            year={movie.year}
            imageBackdrop={movie.backdrop_path}
            id={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
