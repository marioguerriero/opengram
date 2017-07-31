import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Panel, Button, Glyphicon } from 'react-bootstrap';

import Post from './Post';

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  handleLikeClick() {

  }

  render() {
    let postList = [];
    if(this.props.posts) {
      postList = this.props.posts.map((post) => {
        <Post post={post} />
      });
    }

    const content = postList.length > 0 ? postList : <h4>No posts yet</h4>;

    return (
      <Panel>
        {content}
      </Panel>
    );
  }
}

const mapStateToProps = ({ user, posts }) => ({ user, posts })

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
