import React from 'react'

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

import { RegisterForm } from './../components/Forms';

import { Panel, Alert } from 'react-bootstrap';

import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';

import { initStore, cleanErr } from '../redux/store';

class Page extends React.Component {
  static getInitialProps ({ query: { err } }) {
    return { err };
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

    return(<div>

    <Head />

    <Header />

    {alert}

    <Panel><RegisterForm /></Panel>

    <Footer />

    </div>);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cleanErr: bindActionCreators(cleanErr, dispatch)
  };
}

export default withRedux(initStore, null, mapDispatchToProps)(Page);
