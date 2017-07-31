import React from 'react'

import Head from './../components/Head';
import Footer from './../components/Footer';

import Header from './../components/Header';

import { RegisterForm } from './../components/Forms';

import { Panel } from 'react-bootstrap';

import withRedux from 'next-redux-wrapper';

import { initStore } from '../redux/store';

class Page extends React.Component {
  render() {
    return(<div>

    <Head />

    <Header />

    <Panel><RegisterForm /></Panel>

    <Footer />

    </div>);
  }
}

export default withRedux(initStore, null, null)(Page);
