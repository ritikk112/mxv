import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
function Movie(props) {
    const params = useParams();
    const [movie, setMovie] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/movie/${params.id}`).then((res) => {
            console.log(res.data.original_title);
            setMovie(res.data);
            setLoading(false);
        });
        console.log(props, params);
    }, [params, props])

    if (loading) {
        return <div>loading...</div>;
    }

    return (
    <div className="movie-page-outer">
        {/* use image as background in the movie page */}
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
                style={{width: '100%', height: '100%'}}
            />
        </div>
    </div>
    );
}

export default Movie;
