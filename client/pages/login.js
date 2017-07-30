import React from 'react'

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

import { LoginForm } from './../components/Forms';

import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../redux/store';

import { authRequest } from '../redux/user_actions';

class Page extends React.Component {
  render() {
    return(<div>
      <Head />

      <Header />

      <LoginForm />

      <Footer />

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(authRequest, dispatch)
  };
}

export default withRedux(initStore, null, mapDispatchToProps)(Page);
