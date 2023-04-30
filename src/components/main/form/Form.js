import './Form.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



export default class MyForm extends React.Component {


  render () {
    return (
        <Form 
          className='formFull'
          onSubmit={this.props.handlerSubmit}
          >
          <Form.Group 
            className="formGroup"
            as={Row} 
            controlId="exampleForm.ControlInput1">

                <Form.Control 
                  className="formControl" 
                  type="text" 
                  placeholder="enter city name here" 
                  onChange={this.props.handlerFormUpdate}
                  />
   



                <Button 
                  className="formButton" 
                  variant="primary" 
                  type="submit"
                  >
                  Explore!
                </Button>


          </Form.Group>
        </Form>
    );
  }
}