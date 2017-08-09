import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Panel, Grid, Col, Row, FieldGroup, Image,
  FormGroup, FormControl, Button } from 'react-bootstrap';

import { addPost } from './../redux/post_actions';

import 'isomorphic-fetch';

class ComposeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publisher: this.props.user._id,
      message: '',
      media: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Request to upload the media file
    const formData = new FormData();
    var fileData = document.querySelector('input[type="file"]').files[0];
    formData.append('media', fileData);

    const headers = {
      //'Content-Type': 'multipart/form-data',
      'x-access-token': this.props.user.token
    }
    const init = {
      headers,
      method: 'POST',
      body: formData
    };
    fetch('/api/upload', init).then(res => {
      if(res.status >= 400) {
        // TODO: handle error
      }
      else {
        return res.json();
      }
    }).then(data => {
      // Request to upload post
      this.setState({media:data.path});
      this.props.addPost(this.state, this.props.user.token);
      this.setState({message:'', media:''});
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} md={4}> <Image src={this.props.user.avatar} circle /> </Col>
            <Col xs={6} md={4}> <form onSubmit={this.handleSubmit}>
              <FormControl
                name="media"
                type="file"
              />

              <FormGroup controlId="formContent">
                <FormControl componentClass="textarea" placeholder="Content"
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange} />
              </FormGroup>

              <Button type="submit">
                Post
              </Button>

              <Button type="reset">
                Reset
              </Button>
            </form></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: bindActionCreators(addPost, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeBox);
