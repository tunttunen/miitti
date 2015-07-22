/**
 * Error logger middleware
 *
 */
function errorLogger(error, req, res, next) {
    console.error(error.stack);
    next(error);
}

module.exports = errorLogger;