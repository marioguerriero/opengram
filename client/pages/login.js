import React from 'react'

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

import { Alert, Panel } from 'react-bootstrap';
import { LoginForm } from './../components/Forms';

import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import { initStore, cleanErr } from '../redux/store';

import { authRequest } from '../redux/user_actions';

class Page extends React.Component {
  static getInitialProps ({ query: { err } }) {
    return { err };
  }

  render() {
    let err = null;
    if(this.props.err) {
      err = (<Alert bsStyle="danger" >
          <h4>Oh snap! You got an error!</h4>
          <p>Invalid username or password</p>
        </Alert>)
      this.props.cleanErr();
    }

    return(<div>
      <Head />

      <Header />

      {err}

      <Panel><LoginForm /></Panel>

      <Footer />

      </div>
    );
  }
}

const mapStateToProps = ({ loggedIn }) => ({ loggedIn })

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(authRequest, dispatch),
    cleanErr: bindActionCreators(cleanErr, dispatch)
  };
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Page);
