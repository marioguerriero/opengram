import React from 'react';

import { Box } from 'grommet';

import ComposeBox from './ComposeBox';

export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
    }

    render() {
        return(
          <Box alignContent='center' justify='center'>
              <ComposeBox/>
          </Box>
        );
    }
}