const _ = require('lodash');
const axios = require('axios');
const async = require('async');

module.exports = {
    getGenres: async (req, res) => {
        console.log('inside getGenres');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.TMDB_API_BASE_URL}/3/genre/movie/list?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
            headers: {}
        };
        axios.request(config)
            .then((response) => {
                console.log('Genres fetched:', response.data.genres);
                res.json(response.data.genres); // Send genres as a JSON response
            })
            .catch((error) => {
                console.error('Error fetching genres:', error.message);
                res.status(500).json({ error: 'Failed to fetch genres' });
            });
    },

    discoverMovies: async (req, res) => {
        const genreId = req.params.id; // Extract the genre ID from the URL
        const page = req.query.page || 1; // Default to page 1 if no page is specified
        console.log(`Fetching movies for genre ID: ${genreId}, Page: ${page}`);

        let discoverMoviesConfig = {
                method: 'get',
                url: `${process.env.TMDB_API_BASE_URL}/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.TMDB_API_READ_KEY}` // Ensure you set TMDB_API_READ_KEY in your environment variables
                }
            },
            discoverTvConfig = {
                method: 'get',
                url: `${process.env.TMDB_API_BASE_URL}/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc`,
                headers: {}
            };

        async.auto({
            movies: (callback) => {
                axios.request(discoverMoviesConfig)
                    .then((response) => {
                        console.log(`Movies fetched for genre ID: ${genreId}, Page: ${page}`);
                        callback(null, response.data.results);
                    })
                    .catch((error) => {
                        console.error('Error fetching movies:', error.message);
                        callback(error);
                    });
            },
            tv: (callback) => {
                axios.request(discoverTvConfig)
                    .then((response) => {
                        console.log(`TV shows fetched for genre ID: ${genreId}, Page: ${page}`);
                        callback(null, response.data.results);
                    })
                    .catch((error) => {
                        console.error('Error fetching TV shows:', error.message);
                        callback(error);
                    });
            },
            recommendations: ['movies', 'tv', (results, callback) => {
                const movieList = _.map(results.movies, (movie) => {
                        return {
                            ...movie,
                            id: `movie~${movie.id}`,
                        }
                    }),
                    tvList = _.map(results.tv, (tv) => {
                        return {
                            ...tv,
                            id: `tv~${tv.id}`,
                        }
                    }),
                    entityList = _.orderBy([...movieList, ...tvList], ['vote_count'], ['desc']);

                callback(null, entityList);
            }]
        }, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Failed to fetch movies' });
            } else {
                res.json(results.recommendations);
            }
        });
    },

    getRecommendations: async (req, res) => {
        const movieId = req.params.movieId; // Extract the movie ID from the URL
        const page = req.query.page || 1; // Default to page 1 if no page is specified
        console.log(`Fetching recommendations for movie ID: ${movieId}, Page: ${page}`);

        let config = {
            method: 'get',
            url: `${process.env.TMDB_API_BASE_URL}/3/movie/${movieId}/recommendations?language=en-US&page=${page}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_READ_KEY}` // Ensure you set TMDB_API_READ_KEY in your environment variables
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(`Recommendations fetched for movie ID: ${movieId}, Page: ${page}`);
                res.json(response.data.results); // Send recommendations as a JSON response
            })
            .catch((error) => {
                console.error('Error fetching recommendations:', error.message);
                res.status(500).json({ error: 'Failed to fetch recommendations' });
            });
    }
};
