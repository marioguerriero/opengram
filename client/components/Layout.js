import React from 'react';

import { App } from 'grommet';
import Header from './Header';
import Footer from './Footer';

import UsersStore from './../stores/UsersStore';

export default class extends React.Component {
    constructor(props) {
        super(props);

        UsersStore.init();
    }

    render() {
        return <App>
            <Header>

            </Header>
            <div className='app-content'>
                {this.props.children}
            </div>
            <Footer>

            </Footer>
        </App>;
    }
};
