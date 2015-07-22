/**
 * Route middleware
 * Handles API endpoint request that does not match any endpoint.
 *
 * @param req
 * @param res
 * @param next
 */
function unmatchedRouteHandler(req, res, next) {
    req.app.all('*', function(req, res) {
        var msg = 'API endpoint not found, please check your request method and URI.';
        res.status(404).send(msg);
    });

    next();
}

module.exports = unmatchedRouteHandler;