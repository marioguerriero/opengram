import React from 'react';

import UsersStore from '../stores/UsersStore';

/**
 * This function redirects register and login resources which are
 * about to be rendered to the home page if the requesting user is
 * already logged in
 * @param nextState
 * @param replace
 */
let homeRedirect = (nextState, replace) => {
    if(nextState.location.pathname == '/login' || nextState.location.pathname == '/register') {
        if(UsersStore.isAuthenticated()) {
            replace({ nextPathname: nextState.location.pathname }, '/');
        }
    }
};

export { homeRedirect }