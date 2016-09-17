import AppDispatcher from './../dispatcher/AppDispatcher'
import UsersConstants from '../util/UsersConstants'
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

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
            UsersStore.emitChange();
            break;

        case UsersConstants.LOGOUT_USER:
            removeUser();
            UsersStore.emitChange();
            break;

        case UsersConstants.REGISTER_USER:

            break;

        default:
    }
});

export default UsersStore;