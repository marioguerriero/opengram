import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Panel, Button, Glyphicon, Row, Col } from 'react-bootstrap';

/**
* This component requires a post prop to work fine. In fact its only
* goal is to display the information contained in the passed prop
*/

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  handleLikeClick() {

  }

  render() {
    return (
      <Panel>
      <Row>
        <Col sm={1} md={1}> {/*<Image src={this.props.post.media} />*/} </Col>
        <Col sm={23} md={11}> <p>{this.props.post.publisher}</p> </Col>
      </Row>
        {/*<Image src={this.props.post.media} />*/}
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
