/**
 * Error handler middleware
 *
 */
function errorHandler(error, req, res, next) {
    res.status(500).send({
        error: error
    });
}

module.exports = errorHandler;