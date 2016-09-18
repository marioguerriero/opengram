import React from 'react';

import { Link } from 'react-router';

import autobind from 'autobind-decorator';

import { Header, Box, Title, Menu, Search,
    Anchor, Button, Image } from 'grommet';

import UserSettings from 'grommet/components/icons/base/UserSettings';

import Logo from './Logo';

import UsersStore from './../stores/UsersStore';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: UsersStore.getUser()
        };

        UsersStore.addListener('change', this.onUsersStoreChange);
    }

    @autobind
    onUsersStoreChange() {
        this.setState({ user: UsersStore.getUser() });
    }

    @autobind
    renderUserContent() {
        if(this.state.user) {
            return <Box direction='row' justify='between' pad='small'>
                <Search inline={true} className='flex' placeHolder='Search' />
                <Menu direction='row' align='center' responsive={false}>
                    <Anchor href='#'>
                        <Image size='thumb' src={this.state.user.avatar} />
                    </Anchor>
                    <Anchor href='#'>
                        <UserSettings />
                    </Anchor>
                </Menu>
            </Box>
        }
        else {
            return <Menu inline={true} direction='row' >
                <Link to="/register"><Button label='Register' onClick={function(){}}/></Link>
                <Link to="/login"><Button label='Login' primary={true} onClick={function(){}} /></Link>
            </Menu>
        }

    }

    render() {
        return <Header justify='between'>
            <Link to='/'>
                <Title>
                    <Logo size='thumb' />
                    Opengram
                </Title>
            </Link>
            {this.renderUserContent()}
        </Header>;
    }
}