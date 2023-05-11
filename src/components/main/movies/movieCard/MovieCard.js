import React from 'react';
import './MovieCard.css';

import Accordion from 'react-bootstrap/Accordion';



export default class MovieCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  };

  render () {
    return(
      <Accordion.Item 
        className="accordionItem"
        eventKey={this.props.eventKey}
        onClick={this.props.handlerSetActiveKey}>
          <Accordion.Header
            className="accordionHeader"
            >{this.props.item.title}</Accordion.Header>
          <Accordion.Body
            className="accordionBody"
            >
            <div className="accordionImageContainer">
              <img
                className='accordionImage'
                alt={this.props.title} 
                src={this.props.item.image_url}/>
            </div>
            <p
              className="accordionText"
              >Release Date: {this.props.item.released_on}</p>
            <p
              className="accordionText"
              >{this.props.item.overview}</p>
          </Accordion.Body>
      </Accordion.Item>
    )
  }
}
