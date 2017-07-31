import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Panel, Button, Glyphicon } from 'react-bootstrap';

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
        <Image src={this.props.post.media} />
        <p>{this.prpops.post.message}</p>
        <Button bsSize="small" onClick={this.handleLikeClick}><Glyphicon glyph="hearth" /></Button>
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
