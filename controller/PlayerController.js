const _ = require('lodash');
const axios = require('axios');

module.exports = {
    proxyVideo: async (req, res) => {
        const { url } = req.query; // Accept the URL as a query parameter
        if (!url) {
            return res.status(400).json({ error: 'Missing URL parameter' });
        }

        try {
            // Fetch the content from the provided URL
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': req.headers['user-agent'],
                },
                timeout: 10000, // Set timeout for 10 seconds
            });

            let content = response.data;

            // Remove `debugger;` statements
            content = content.replace(/debugger;/g, '');

            // Remove specific script tags (e.g., disable-devtool)
            content = content.replace(
                /<script[^>]*src=["']https:\/\/cdn\.vidsrc\.stream\/disable-devtool[^>]*><\/script>/g,
                ''
            );

            // Forward the content with appropriate headers
            res.set('Content-Type', response.headers['content-type']);
            res.send(content);
        } catch (error) {
            console.error('Error fetching content:', error.message);

            // Handle different error cases
            if (error.response) {
                // Error returned by the external server
                return res.status(error.response.status || 502).json({
                    error: `Failed to fetch content. Server responded with ${error.response.status}`,
                });
            } else if (error.code === 'ECONNABORTED') {
                // Timeout error
                return res.status(504).json({ error: 'Request timed out' });
            } else {
                // Unknown server error
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    },
};
