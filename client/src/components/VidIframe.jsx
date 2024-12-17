import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VidIframe = (props) => {
    const [iframeSrc, setIframeSrc] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const videoUrl = `https://vidsrc.me/embed/${props.type}?tmdb=${props.id}${
            props.type === 'tv' ? `&season=${props.season || 1}&episode=${props.episode || 1}` : ''
        }`;

        const proxyUrl = `http://localhost:3001/video/proxy?url=${encodeURIComponent(videoUrl)}`;

        const checkProxy = async () => {
            try {
                // Use a GET request to validate proxy
                const response = await axios.get(proxyUrl);
                if (response.status >= 200 && response.status < 300) {
                    setIframeSrc(proxyUrl);
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (err) {
                console.error('Error loading video:', err.message);
                setError('Failed to load video. Please try again later.');
            }
        };

        checkProxy();
    }, [props.type, props.id, props.season, props.episode]);

    if (error) {
        return (
            <div className="error-container" style={{ textAlign: 'center', color: 'red' }}>
                <h3>{error}</h3>
            </div>
        );
    }

    return iframeSrc ? (
        <iframe
            title="Movie"
            src={iframeSrc}
            allow="autoplay; fullscreen"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
            style={{
                border: 'none',
                width: '100%',
                height: 'fit-content',
            }}
        />
    ) : (
        <div>Loading...</div>
    );
};

export default VidIframe;
