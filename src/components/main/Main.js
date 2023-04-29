import './Main.css'
import React from 'react'
import Form from './form/Form.js';

export default class Main extends React.Component {
  render () {
    return (
      <>
        <div className="mainContainer">
          <p>Main Boogers</p>
          <Form/>
        </div>
      </>
    );
  }
}