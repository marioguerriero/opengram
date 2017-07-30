import React from 'react'

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

export default class extends React.Component {
  static getInitialProps ({ query: { username } }) {
    return { username };
  }

  render() {
    return(<div>
      <Head />

      <Header />

      <p>This is the profile of {this.props.username}</p>

      <Footer />

    </div>);
  }
}
