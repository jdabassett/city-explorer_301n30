import './Form.css';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default class MyForm extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='formContainer'>
        <Form 
          className='formFull'
          onSubmit={this.props.handlerSubmit}
          >
          <Form.Group 
            as={Row} 
            className="mb-10" 
            controlId="exampleForm.ControlInput1">
            <Form.Label 
              className="formLabel" 
              column sm="1"
              >Email address</Form.Label>
            <Col sm="10">
              <Form.Control 
                className="formInput" 
                type="text" 
                placeholder="enter city name here" 
                onChange={this.props.handlerFormUpdate}
                />
            </Col>
            <Col>
              <Button className="formButton" column sm="1" variant="primary" type="submit">
                Explore!
              </Button>
            </Col>

          </Form.Group>
        </Form>
      </div>
    );
  }
}