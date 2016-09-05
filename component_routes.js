var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var Layout = require('./components/Layout');
var IndexPage = require('./components/IndexPage');
var UserPage = require('./components/UserPage');
var PostPage = require('./components/PostPage');
var NotFoundPage = require('./components/NotFoundPage');

var routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="user/:id" component={UserPage}/>
        <Route path="post/:id" component={PostPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);

module.exports = routes;