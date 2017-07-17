import AppDispatcher from './../dispatcher/AppDispatcher';
import PostsConstants from '../util/PostsConstants';
import EventEmitter from 'events';

const TIMELINE_LOAD = 'timeline-load';
const POST_CREATE = 'post-create';
const POST_LOAD = 'post-load';
const MULTIPLE_POST_LOAD = 'multiple-post-load';
const POST_UPDATE = 'post-update';
const POST_DELETE = 'post-delete';

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
            this.emit(POST_LOAD, action.post);
            break;

        case PostsConstants.MULTIPLE_POST_LOAD:
            this.emit(MULTIPLE_POST_LOAD, action.posts);
            break;

        case PostsConstants.POST_CREATE:
            this.emit(POST_CREATE, action.post);
            break;

        case PostsConstants.POST_DELETE:
            this.emit(POST_DELETE);
            break;

        case PostsConstants.POST_UPDATE:
            this.emit(POST_UPDATE, action.post);
            break;

        case PostsConstants.TIMELINE_LOAD:
            this.loadTimeline();
            break;

        default:
    }
});

export default PostsStore;