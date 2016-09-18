import AppDispatcher from './../dispatcher/AppDispatcher'
import UsersConstants from '../util/UsersConstants'
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';
const LOGIN_EVENT = 'login';
const LOGIN_FAILED_EVENT = 'login-failed';
const REGISTER_EVENT = 'register';

function isClient() {
    return (typeof window != 'undefined' && window.document);
}

function setUser(profile, token) {
    if(isClient())
        if (!localStorage.getItem('id_token')) {
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', token);
        }
}

function removeUser() {
    if(isClient()) {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }
}


class UsersStoreClass extends EventEmitter {
    addListener(eventName, cb) {
        this.on(eventName, cb)
    }

    isAuthenticated() {
        if(isClient())
            return (localStorage.getItem('id_token'));
    }

    getUser() {
        if(isClient())
            return localStorage.getItem('profile');
    }

    getJwt() {
        if(isClient())
            return localStorage.getItem('id_token');
    }
}

const UsersStore = new UsersStoreClass();

UsersStore.dispatch = AppDispatcher.register(action => {
    switch(action.actionType) {
        case UsersConstants.LOGIN_USER:
            setUser(action.profile, action.token);
            UsersStore.emit(LOGIN_EVENT);
            break;

        case UsersConstants.LOGOUT_USER:
            removeUser();
            UsersStore.emit(CHANGE_EVENT);
            break;

        case UsersConstants.REGISTER_USER:
            UsersStore.emit(REGISTER_EVENT);
            break;

        case UsersConstants.LOGIN_FAILED:
            UsersStore.emit(LOGIN_FAILED_EVENT, action.errorMessage);
            break;

        default:
    }
});

export default UsersStore;