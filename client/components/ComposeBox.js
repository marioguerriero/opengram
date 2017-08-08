import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Panel, Grid, Col, Row, FieldGroup, Image,
  FormGroup, FormControl, Button } from 'react-bootstrap';

import { addPost } from './../redux/post_actions';

class ComposeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publisher: this.props.user._id,
      message: '',
      media: null
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
    this.props.addPost(this.state, this.props.user.token);
    this.setState({message:'', file:null})
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} md={4}> <Image src={this.props.user.avatar} circle /> </Col>
            <Col xs={6} md={4}> <form onSubmit={this.handleSubmit}>
              <FormControl
                id="formPhoto"
                type="file"
                label="Photo"
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
