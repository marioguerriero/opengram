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

  componentWillReceiveProps(nextProp) {
    let { posts } = this.props;

    if(JSON.stringify(posts) !== JSON.stringify(nextProp.posts)) {
      this.forceUpdate();
    }
  }

  render() {
    let { posts } = this.props;

    let postList = []
    if(posts != null && posts.length > 0) {
      postList = posts.map((post) => {
        return <Post post={post} />
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
