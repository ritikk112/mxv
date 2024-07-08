// userInPath.js

// Middleware function to check if user is in path
const userInPathMiddleware = (req, res, next) => {
    console.log('checking if user is in pathj', req.user.id, req.params.id)
    // Check if user is in path
    // Replace this with your own logic to check if the user is in the path

    if (req.user.id === req.params.id) {
        // User is in path, continue to the next middleware or route handler
        next();
    } else {
        // User is not in path, send an error response
        res.status(403).json({ error: 'Cannot update details for other user' });
    }
};

module.exports = userInPathMiddleware;