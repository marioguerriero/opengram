import React from 'react'

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';


export default class extends React.Component {
  static getInitialProps ({ query: { id } }) {
    return { id };
  }

  render() {
    return(<div>

    <Head />

    <Header />

    <p>Post details: {this.props.id}</p>

    <Footer />

    </div>);
  }
}
