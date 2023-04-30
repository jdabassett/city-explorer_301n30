import './Map.css'
import React from 'react'
import Card from 'react-bootstrap/Card';

export default class Map extends React.Component {
  render () {
    console.log(this.props.response)
    return (
      <>
        <div className="mapContainer">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.response.icon}/>
            <Card.Body>
              <Card.Title>{this.props.response.display_name}</Card.Title>
              <Card.Text>{`Latitude: ${this.props.response.lat}, Longitude: ${this.props.response.lon}`}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}