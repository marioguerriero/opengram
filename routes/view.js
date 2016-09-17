import express from 'express';
import config from './../config';
import routes from '../component_routes';
import React from 'react';
import {RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import {match} from 'react-router';
import NotFoundPage from './../components/NotFoundPage';

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

export default router;