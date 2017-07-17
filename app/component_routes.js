import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { homeRedirect } from './components/RouteHandlers'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import PostPage from './components/PostPage';
import NotFoundPage from './components/NotFoundPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';



export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="register" component={RegisterPage} onEnter={homeRedirect} />
        <Route path="login" component={LoginPage} onEnter={homeRedirect} />
        <Route path="user/:id" component={UserPage}/>
        <Route path="post/:id" component={PostPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);