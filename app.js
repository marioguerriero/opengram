import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

import '!style!css!sass!./node_modules/grommet/scss/vanilla/index.scss';

window.onload = function() {
    ReactDOM.render(<AppRoutes/>, document.getElementById('app'));
};