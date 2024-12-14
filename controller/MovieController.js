const _ = require('lodash');
const axios = require('axios');
const async = require('async');

// Express Controller for Movie related things
module.exports = {
    recommend: async (req, res) => {
        console.log("Inside recommended")
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.TMDB_API_BASE_URL}/3/movie/now_playing?language=en-US&page=${req.query.page || 1}&api_key=${process.env.TMDB_API_KEY}`,
            headers: { }
            };
        
            axios.request(config)
            .then((response) => {
                const movieList = response.data.results;
                res.send(movieList);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    getMovie: async (req, res) => {
        console.log('inside getMovie');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.TMDB_API_BASE_URL}/3/movie/${req.params.id}?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
            headers: { }
            };
            axios.request(config)
            .then((response) => {
                const movie = response.data;
                res.send(movie);
                console.log(movie);
            })
            .catch((error) => {
            console.log(error);
            });
    },

    search: async (req, res) => {
        let config = {
            method: 'get',
            url: `${process.env.TMDB_API_BASE_URL}/3/search/movie?page=${req.query.page || 1}&query=${req.query.query}&api_key=${process.env.TMDB_API_KEY}`,
            headers: { }
        };

        async.auto({
            searchMovie: (callback) => {
                axios.request(config)
                .then((response) => {
                    const movieList = response.data.results;
                    callback(null, movieList);
                })
                .catch((error) => {
                console.log(error);
                });
            },
            searchTv: (callback) => {
                let config = {
                    method: 'get',
                    url: `${process.env.TMDB_API_BASE_URL}/3/search/tv?page=${req.query.page || 1}&query=${req.query.query}&api_key=${process.env.TMDB_API_KEY}`,
                    headers: { }
                };
                axios.request(config)
                .then((response) => {
                    const movieList = response.data.results;
                    callback(null, movieList);
                })
                .catch((error) => {
                console.log(error);
                });
            },
            movieDetails: ['searchMovie','searchTv', (results, callback) => {
                const movieList = results.searchMovie,
                 tvList = results.searchTv,
                 entityList = _.orderBy([...movieList, ...tvList], ['vote_count'], ['desc']);

                callback(null, entityList);
            }]
        }, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(results.movieDetails);
            }
        });
    }
};