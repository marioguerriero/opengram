import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Panel, Button, Glyphicon, Row, Col } from 'react-bootstrap';

import 'isomorphic-fetch';

/**
* This component requires a post prop to work fine. In fact its only
* goal is to display the information contained in the passed prop
*/

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  handleLikeClick() {

  }

  componentWillMount() {
    // Retrieve user's name
    let callback = (function(user) {
      this.setState({username: user.username});
    }).bind(this);

    fetch('/api/user/' + this.props.post.publisher, {
      headers: {
        'x-access-token': this.props.user.token,
      }
    })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(callback);
  }

  render() {
    return (
      <Panel>
      <Row>
        <Col sm={1} md={1}><Glyphicon glyph="user" /></Col>
        <Col sm={1} md={1}><p>{this.state.username}</p></Col>
      </Row>
        <Glyphicon style={{'font-size': 150}} glyph="picture" />
        <p>{this.props.post.message}</p>
        <Button bsSize="small" onClick={this.handleLikeClick}><Glyphicon glyph="star" /></Button>
      </Panel>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
