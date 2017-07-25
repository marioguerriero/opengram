import React from 'react';

import Head from 'next/head';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (<Head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.31.1/react-bootstrap.min.js"></script>
        {this.props.children}
      </Head>
    );
  }
}
