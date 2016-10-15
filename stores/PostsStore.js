import AppDispatcher from './../dispatcher/AppDispatcher';
import PostsConstants from '../util/PostsConstants';
import EventEmitter from 'events';

const TIMELINE_LOAD = 'timeline-load';

class PostsStoreClass extends EventEmitter {
    loadTimeline() {
        // TODO
        this.emit(TIMELINE_LOAD);
    }
}

const PostsStore = new PostsStoreClass();

PostsStore.dispatch = AppDispatcher.register(action => {
    switch(action.actionType) {
        case PostsConstants.POST_LOAD:
            break;

        case PostsConstants.POST_CREATE:
            break;

        case PostsConstants.POST_DELETE:
            break;

        case PostsConstants.POST_UPDATE:
            break;

        case PostsConstants.TIMELINE_LOAD:
            this.loadTimeline();
            break;

        default:
    }
});

export default PostsStore;