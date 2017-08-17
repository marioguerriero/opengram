import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Glyphicon, Grid, Col, Row, Button } from 'react-bootstrap';

import { profileRequest, followRequest, defollowRequest, userPostsRequest } from './../redux/user_actions';

import PostList from './PostList';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.onHandleFollow = this.onHandleFollow.bind(this);
    this.onHandleDefollow = this.onHandleDefollow.bind(this);
  }

  onHandleFollow() {
    this.props.follow(this.props.profile._id, this.props.user.token);
  }

  onHandleDefollow() {
    this.props.defollow(this.props.profile._id, this.props.user.token);
  }

  componentWillMount() {
    // Request to load user's profile
    this.props.profileRequest(this.props.id, this.props.user.token);

    // Request to load posts of the given user
    this.props.userPostsRequest(this.props.id, this.props.user.token);
  }

  componentWillReceiveProps(nextProp) {
    let { isFetching } = this.props;

    if(isFetching !== nextProp.isFetching) {
      this.forceUpdate();
    }
  }

  render() {
    let avatar = <Glyphicon style={{fontSize: 150}} glyph="picture" />;
    if(this.props.profile && this.props.profile.avatar) {
      avatar = <img src={this.props.profile.avatar} alt='Media file' />;
    }

    let followBtn = null;
    if(this.props.user && this.props.user._id !== this.props.id) {
      if(this.props.user.following.indexOf(this.props.id) >= 0) {
        followBtn = (<Button disabled={this.props.isFetching} onClick={this.onHandleDefollow} bsStyle="warning">
          {this.props.isFetching ? 'Loading...' : 'Defollow'}
        </Button>);
      }
      else {
        followBtn = <Button disabled={this.props.isFetching} onClick={this.onHandleFollow} bsStyle="primary">
          {this.props.isFetching ? 'Loading...' : 'Follow'}
        </Button>;
      }
    }

    return (
      <Grid>
        <Row>
          <Col sm={4} md={3}>{avatar}</Col>
          <Col sm={1} md={9}>
            <p>{this.props.profile ? this.props.profile.username : ''}</p>
            {followBtn}
          </Col>
        </Row>

        <Row><PostList /></Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({ profile, user, isFetching }) => ({ profile, user, isFetching })

const mapDispatchToProps = (dispatch) => {
  return {
    profileRequest: bindActionCreators(profileRequest, dispatch),
    userPostsRequest: bindActionCreators(userPostsRequest, dispatch),
    follow: bindActionCreators(followRequest, dispatch),
    defollow: bindActionCreators(defollowRequest, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
