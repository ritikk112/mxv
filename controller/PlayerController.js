const _ = require('lodash');
const axios = require('axios');

module.exports = {
    proxyVideo: async (req, res) => {
        const { url } = req.query; // Accept the URL as a query parameter
        if (!url) {
            return res.status(400).send('Missing URL parameter');
        }

        try {
            // Fetch the content from vidsrc
            const response = await axios.get(url, {
                headers: {
                    // Forward headers if required by vidsrc
                    'User-Agent': req.headers['user-agent'],
                },
            });

            let content = response.data;

                // Remove `debugger;` statements using a regex
                content = content.replace(/debugger;/g, '');
                // Remove the specific script tag
                content = content.replace(
                /<script[^>]*src=["']https:\/\/cdn\.vidsrc\.stream\/disable-devtool[^>]*><\/script>/g,
                ''
            );

                // Set appropriate headers and send the modified content
                res.set('Content-Type', response.headers['content-type']);
                res.send(content);

        } catch (error) {
            console.error('Error fetching content:', error);
            res.status(500).send('Failed to fetch content');
        }
    }
};