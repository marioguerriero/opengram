import React from 'react'

import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../redux/store';

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

import UserProfile from './../components/UserProfile';

class Page extends React.Component {
  static getInitialProps ({ query: { username, id } }) {
    return { username, id };
  }

  render() {
    return(<div>
      <Head />

      <Header />

      <UserProfile id={this.props.id} />

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
