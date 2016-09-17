import React from 'react';

import { App } from 'grommet';
import Header from './Header';
import Footer from './Footer';

export default React.createClass({
    render: function () {
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
});
