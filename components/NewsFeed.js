import React from 'react';

import PostsStore from '../stores/PostsStore';

import { Box } from 'grommet';

import ComposeBox from './ComposeBox';

import autobind from 'autobind-decorator';

export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
        PostsStore.on('timeline-load', this.onTimelineUpdate);
    }

    @autobind
    onTimelineUpdate() {

    }

    render() {
        return(
          <Box alignContent='center' justify='center'>
              <ComposeBox/>
              <div>{this.state.posts}</div>
          </Box>
        );
    }
}