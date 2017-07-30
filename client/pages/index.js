import React from 'react'

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../redux/store';

import { addPost, deletePost, modifyPost } from '../redux/post_actions';

class Page extends React.Component {
  render() {
    const { user } = this.props;

    let greeting = <h1>Hello, World!</h1>
    if(this.props.loggedIn) {
      greeting = <h1>Hello, {this.props.user.username}</h1>
    }

    return(<div>

      <Head />

      <Header />

      {greeting}

      <Footer />

    </div>);
  }
}

const mapStateToProps = ({ loggedIn, user }) => ({ loggedIn, user })

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: bindActionCreators(addPost, dispatch),
    modifyPost: bindActionCreators(modifyPost, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch)
  };
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Page);
