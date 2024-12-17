import React from 'react';

const VidIframe = (props) => {
    return (
        <iframe
            title="Movie"
            src={`http://localhost:3001/video/proxy?url=${encodeURIComponent(
                `https://vidsrc.me/embed/${props.type}?tmdb=${props.id}${props.type === 'tv' ? '&season=1&episode=1' : ''}`
            )}`}
            allow="autoplay; fullscreen"
            allowFullScreen="yes"
            sandbox='allow-scripts allow-same-origin'
            style={{
                border: 'none',
            }}
        />
    );
};

export default VidIframe;
