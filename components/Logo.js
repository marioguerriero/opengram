import React from 'react';
import { Image } from 'grommet';

export default React.createClass({
    render: function() {
        return <Image src='/assets/logo.png' size={this.props.size} />;
    }
});