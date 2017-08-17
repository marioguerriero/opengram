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
  static getInitialProps ({ query: { err, successMsg } }) {
    return { err, successMsg };
  }

  render() {
    let alert = null;
    if(this.props.err) {
      alert = (<Alert bsStyle="danger" >
          <h4>Oh snap! You got an error!</h4>
          <p>{this.props.err}</p>
        </Alert>)
      this.props.cleanErr();
    }
    else if(this.props.successMsg) {
      alert = (<Alert bsStyle="success" >
          <p>{this.props.successMsg}</p>
          </Alert>);
    }
    return(<div>
      <Head />

      <Header />

      {alert}

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
