import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css'
import VidIframe from "../components/VidIframe";
import EpisodeList from "../components/EpisodeList";

function Movie(props) {
    const params = useParams();
    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = React.useState([]);
    const [type, setType] = useState(null);

    useEffect(() => {
        const [parsedType, parsedId] = params.id.split('~');
        setType(parsedType);

        const fetchEntity = async () => {
            try {
                const endpoint =
                    parsedType === 'tv'
                        ? `${process.env.REACT_APP_BACKEND_URL}/api/tv/${parsedId}`
                        : `${process.env.REACT_APP_BACKEND_URL}/api/movie/${parsedId}`;

                const response = await axios.get(endpoint);
                setEntity(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching entity:", error);
                setLoading(false);
            }
        };

        fetchEntity();
    }, [params]);

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
        return <div>Loading...</div>;
    }

    if (!entity) {
        return <div>Failed to load entity.</div>;
    }

    return (
        <div className="movie-page-outer">
            {/* Background image */}
            <div
                className="movie-page"
                style={{
                    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${entity.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100vh",
                    filter: "blur(5px)",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            />
            {/* Movie title */}
            <div className="movie-title">
                <h1>{entity.original_title || entity.original_name}</h1>
            </div>
            {/* Video Player */}
            <div className="movie-player">
                <VidIframe id={params.id.split('~')[1]} type={type} />
            {/* {
                type === 'tv' && (<div className="episode-list">
                    <EpisodeList id={params.id.split('~')[1]} type={type} />
                </div>)
            } */}
            </div>
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
    );
}

export default Movie;
