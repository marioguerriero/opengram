import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { Panel, Grid, Col, Row, FieldGroup, Image,
  FormGroup, FormControl, Button } from 'react-bootstrap';

class ComposeBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Panel>
        <Grid>
          <Row>
            <Col xs={6} md={4}> <Image src={this.props.user.avatar} circle /> </Col>
            <Col xs={6} md={4}> <form onSubmit={this.handleSubmit}>
              <FormControl
                id="formPhoto"
                type="file"
                label="Photo"
                help="asd"
              />

              <FormGroup controlId="formContent">
                <FormControl componentClass="textarea" placeholder="Content" />
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
      </Panel>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeBox);
