import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../App.css'
function Movie(props) {
    const params = useParams();
    const [movie, setMovie] = React.useState(null);
    const [recommendations, setRecommendations] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/movie/${params.id}`).then((res) => {
            console.log(res.data.original_title);
            setMovie(res.data);
            setLoading(false);
        });
        console.log(props, params);
    }, [params, props])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/movie/${params.id}/recommendations`)
            .then((res) => {
                console.log("Recommendations:", res.data);
                setRecommendations(res.data);
            })
            .catch((err) => console.error("Error fetching recommendations:", err));
    }, [params.id]);

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className="movie-container">
            <div>
                <div className="movie-page-outer">
                    <div className="movie-page" style=
                        {{
                            backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: '100vh',
                            filter: 'blur(5px)',
                            '-webkit-filter': 'blur(5px)',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: -1
                        }} 
                    />
                    <div className="movie-title">
                        <h1>{movie.original_title}</h1>
                    </div>
                    <div className="movie-player">
                        <iframe
                            title='Movie'
                            src={`https://vidsrc.in/embed/movie?tmdb=${params.id}`}
                            allow='autoplay; fullscreen'
                            allowFullScreen='yes'
                            frameBorder='no'
                            style={{width: '80%', height: '80%'}}
                        />
                    </div>
                </div>
            </div>
            <div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {recommendations.map((rec) => (
                        <li key={rec.id} style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "10px",
                                borderRadius: "5px",
                                backgroundColor: "transparent",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={() => (window.location.href = `${rec.id}`)}
                        >
                                <img
                                    src={`https://image.tmdb.org/t/p/w92${rec.poster_path}`}
                                    alt={rec.original_title}
                                    style={{ marginRight: "10px", borderRadius: "5px" }}
                                />
                                <div>
                                    <h5 style={{ margin: 0 }}>{rec.original_title}</h5>
                                    <p style={{ margin: 0, fontSize: "0.9em", color: "#111" }}>{rec.release_date}</p>
                                </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Movie;
