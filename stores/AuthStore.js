import AppDispatcher from './../dispatcher/AppDispatcher'
import AuthCostants from './../util/AuthConstants'
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

function setUser(profile, token) {
    if (!localStorage.getItem('id_token')) {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
    }
}

function removeUser() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
}


class AuthStoreClass extends EventEmitter {
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    isAuthenticated() {
        return (localStorage.getItem('id_token'));
    }


    getUser() {
        return localStorage.getItem('profile');
    }

    getJwt() {
        return localStorage.getItem('id_token');
    }
}

const AuthStore = new AuthStoreClass();

AuthStore.dispatch = AppDispatcher.register(action => {
    switch(action.actionType) {
        case AuthCostants.LOGIN_USER:
            setUser(action.profile, action.token);
            AuthStore.emitChange();
            break;
        case AuthCostants.LOGOUT_USER:
            removeUser();
            AuthStore.emitChange();
            break;
        default:
    }
});

export default AuthStore;