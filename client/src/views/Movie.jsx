import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import VidIframe from "../components/VidIframe";
import EpisodeList from "../components/EpisodeList";
import EntityCard from "../components/EntityCard";

function Movie(props) {
    const params = useParams();
    const [entity, setEntity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const [type, setType] = useState(null);
    const [tvPointer, setTvPointer] = useState({
        season: 1,
        episode: 1,
    });

    useEffect(() => {
        const [parsedType, parsedId] = params.id.split("~");
        setType(parsedType);
    
        const fetchEntity = async () => {
            try {
                const endpoint =
                    parsedType === "tv"
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
    
        // Scroll to the top when params.id changes
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling animation
        });
    
        fetchEntity();
    }, [params]);
    

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/movie/${params.id.split("~")[1]}/recommendations`
                );
                setRecommendations(response.data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [params.id]);

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (!entity) {
        return <div className="error-container">Failed to load entity.</div>;
    }

    return (
        <div className="movie-page-outer">
            {/* Background Image */}
            <div
                className="movie-page"
                style={{
                    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${entity.backdrop_path})`,
                    zIndex: 1,
                }}
            />
    
            {/* Content Wrapper */}
            <div className="movie-content-wrapper">
                {/* Movie Title */}
                <div className="movie-title">
                    <h1>{entity.original_title || entity.original_name}</h1>
                </div>
    
                {/* Video Player */}
                <div className="movie-player">
                    <VidIframe
                        episode={tvPointer.episode}
                        season={tvPointer.season}
                        id={params.id.split("~")[1]}
                        type={type}
                    />
                </div>
    
                {/* Episode List */}
                {type === "tv" && (
                    <div className="episode-list">
                        <EpisodeList
                            seasons={entity.seasons || []}
                            changePointer={setTvPointer}
                            id={params.id.split("~")[1]}
                            type={type}
                        />
                    </div>
                )}
    
                {/* Recommendations Section */}
                <div className="recommendations-section">
                    <h3>Recommendations</h3>
                    <div className="recommendations-grid">
                        {recommendations.map((recEntity) => (
                            <EntityCard key={recEntity.id} movie={recEntity} className="entity-card" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Movie;
