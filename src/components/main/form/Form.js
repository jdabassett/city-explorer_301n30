import './Form.css';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



export default class MyForm extends React.Component {


  render () {
    return (
      <div className='formContainer'>
        <Form 
          className='formFull'
          onSubmit={this.props.handlerSubmit}
          >
          <Form.Group 
            as={Row} 
            controlId="exampleForm.ControlInput1">
            <Row className="formRow">
              <Col xxs="5" xs="7" sm="8" md='9' lg='9'>
                <Form.Control 
                  className="formInput" 
                  type="text" 
                  placeholder="enter city name here" 
                  onChange={this.props.handlerFormUpdate}
                  />
              </Col>
              <Col className="buttonColumn">
                <Button 
                  className="formButton" 
                  variant="primary" 
                  type="submit"
                  >
                  Explore!
                </Button>
              </Col>
            </Row>

          </Form.Group>
        </Form>
      </div>
    );
  }
}