import React from 'react';

import autobind from 'autobind-decorator';

import { Box, Button, FormField, Image } from 'grommet';

import UsersStore from './../stores/UsersStore';

export default class ComposeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: UsersStore.getUser()
        };
        UsersStore.addListener('change', this.onChangeListener);
    }

    @autobind
    onChangeListener() {
        this.setState({ user: UsersStore.getUser() });
    }

    @autobind
    onPost() {

    }

    componentWillUnmount() {
        UsersStore.removeListener('change', this.onChangeListener);
    }

    render() {
        return(
            <Box>
                <Box direction='row'>
                    <Box>
                        <Image size='thumb' src={this.state.user.avatar} />
                    </Box>
                    <Box>
                        <FormField label='What are you thinking about?' >
                            <input id='post-body' type='text' rows='5' />
                        </FormField>
                    </Box>
                </Box>
                <Box direction='row'>
                    <Box>
                        { /* Stay empty for now */ }
                    </Box>
                    <Box align='end'>
                        <Button label='Post' onClick={this.onPost} />
                    </Box>
                </Box>
            </Box>
        );
    }
}