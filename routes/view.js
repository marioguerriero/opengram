var express = require('express');
var config = require('./../config');

var routes = require('../component_routes');

var React = require('react');
var RouterContext = require('react-router').RouterContext;
var renderToString = require('react-dom/server').renderToString;
var match = require('react-router').match;

var NotFoundPage = require('./../components/NotFoundPage');

var router = express.Router();

router.get('*', function(req, res) {
    match({ routes: routes, location: req.url }, function(error, redirectLocation, renderProps) {
        // in case of error display the error message
        if(error)
            return res.status(500);

        // in case of redirect propagate the redirect to the browser
        if(redirectLocation)
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

        // generate the React markup for the current route
        var markup;
        if(renderProps) {
            // if the current route matched we have renderProps
            markup = renderToString(<RouterContext {...renderProps}/>);
        } else {
            // otherwise we can render a 404 page
            markup = renderToString(<NotFoundPage/>);
            res.status(404);
        }

        // render the index template with the embedded React markup
        return res.render('index', { markup: markup });
    })
});

module.exports = router;