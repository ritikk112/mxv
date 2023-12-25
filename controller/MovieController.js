const _ = require('lodash');
const axios = require('axios');
const async = require('async');

// Express Controller for Movie related things
module.exports = {
    recommend: async (req, res) => {
        console.log('inside recommend');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.TMDB_API_BASE_URL}/3/movie/now_playing?language=en-US&page=${req.query.page || 1}&api_key=${process.env.TMDB_API_KEY}`,
            headers: { }
            };
        
            axios.request(config)
            .then((response) => {
                const movieList = response.data.results;
                console.log(movieList);
                res.send(movieList);
            })
            .catch((error) => {
            console.log(error);
            });
        
        //   axios.get(`${process.env.STREAM_API_URL}/vapi/movie/new`)
        //     .then((response) => {
        //         const movieList = _.filter(response.data.result.items, (item) => !_.isEmpty(item.tmdb_id)),
        //         tmdb_ids = _.map(movieList, (item) => item.tmdb_id);
        //       res.send(movieList);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
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
            url: `${process.env.TMDB_API_BASE_URL}/3/search/keyword?page=${req.query.page || 1}&query=${req.query.query}&api_key=${process.env.TMDB_API_KEY}`,
            headers: { }
        };

        // use something like async auto to run these in parallel

        async.auto({
            search: (callback) => {
                axios.request(config)
                .then((response) => {
                    const movieList = response.data.results;
                    callback(null, movieList);
                })
                .catch((error) => {
                console.log(error);
                });
            },
            movieDetails: ['search', (results, callback) => {
                console.log('~``~~```~~~``~~~', results.search);
                const movieList = [_.head(results.search)];

                async.mapLimit(movieList, 5, (movie, callback) => {
                    let config = {
                        method: 'get',
                        url: `${process.env.TMDB_API_BASE_URL}/3/movie/${movie.id}?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
                        headers: { }
                    };
                    axios.request(config)
                    .then((response) => {
                        callback(null, response.data);
                    })
                    .catch((error) => {
                    console.log(error);
                    });
                }, (err, results) => {
                    callback(null, results);
                });
            }]
        }, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                console.log(results.movieDetails);
                res.send(results.movieDetails);
            }
        });
    }
};