import { useState } from "react";
import { Link } from "react-router-dom";

function EntityCard({ movie }) {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
        to={`/stream/movie/${movie.id}`}
        className={`entity-card-title-outer ${isHovered && "entity-card-title-outer-hovered"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div style={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_bestv2${movie.backdrop_path || movie.poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                width: '200px',
                height: '300px',
                overflow: 'hidden',
            }}
            className="entity-card-outer"
        >
                <h1 className="entity-card-title">{movie.original_title}</h1>
                {isHovered && (
                    <div className="entity-card-body">
                        <p>{movie.overview}</p>
                    </div>
                )
                }
        </div>
    </Link>
  );
}

export default EntityCard;