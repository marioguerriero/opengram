import React from 'react'

import { Panel } from 'react-bootstrap';

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';
import ComposeBox from './../components/ComposeBox';
import PostList from './../components/PostList';

import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../redux/store';

import { addPost, deletePost, modifyPost, fetchTimeline } from '../redux/post_actions';

class Page extends React.Component {
  render() {
    const { user } = this.props;

    let content = <h1>Hello, World!</h1>; // TODO: use some default page
    if(this.props.loggedIn) {
      this.props.fetchTimeline(user.token);
      content = (<Panel><ComposeBox /><PostList /></Panel>)
    }

    return(<div>

      <Head />

      <Header />

      {content}

      <Footer />

    </div>);
  }
}

const mapStateToProps = ({ loggedIn, user }) => ({ loggedIn, user })

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: bindActionCreators(addPost, dispatch),
    modifyPost: bindActionCreators(modifyPost, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch),
    fetchTimeline: bindActionCreators(fetchTimeline, dispatch)
  };
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Page);
