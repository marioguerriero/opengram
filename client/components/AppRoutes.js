import React from 'react';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import routes from '../component_routes';

export default React.createClass({
    render: function() {
        return <Router history={browserHistory} routes={routes}/>;
    }
});