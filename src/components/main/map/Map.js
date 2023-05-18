
import React from 'react'
import Card from 'react-bootstrap/Card';
import Error from '../error/Error.js';
import './Map.css'


const ACCESS_TOKEN = process.env.REACT_APP_LIQKEY;

export default class Map extends React.Component {
  render () {
    return (
        <div className="mapContainer">
          <h1 className="sectionHeader">City Map:</h1>
          {this.props.error?
            <Error
              error={this.props.error}
              errorHandler={this.props.errorHandler}
            />:
            <Card 
              // sx={{width: {sx: 1.0,sm: 250, md: 350,},}}
              style={{width: {sx: 1.0,sm: 250, md: 350,},backgroundColor:'var(--green)', border:'3px solid var(--green)'}}>
              <Card.Img 
                variant="top" 
                src={`https://maps.locationiq.com/v3/staticmap?key=${ACCESS_TOKEN}&center=${this.props.responseLocation.lat},${this.props.responseLocation.lon}&size=600x600&zoom=12&path=fillcolor:%2390EE90|weight:2|color:blue|17.452945,78.380055|17.452765,78.382026|17.452020,78.381375|17.452045,78.380846|17.452945,78.380055`}
                alt="Map is on it's way!"></Card.Img>
              <Card.Body>
                <Card.Title>{this.props.responseLocation.display_name}</Card.Title>
                <Card.Text>{`Latitude: ${this.props.responseLocation.lat}`}</Card.Text>
                <Card.Text>{`Longitude: ${this.props.responseLocation.lon}`}</Card.Text>
              </Card.Body>
            </Card>}
        </div>
    );
  }
}