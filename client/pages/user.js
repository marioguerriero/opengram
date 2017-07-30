import React from 'react'

import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../redux/store';

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

class Page extends React.Component {
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

const mapStateToProps = ({ loggedIn }) => ({ loggedIn })

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Page);
