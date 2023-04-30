import './Map.css'
import React from 'react'
import Card from 'react-bootstrap/Card';

const ACCESS_TOKEN = process.env.REACT_APP_LIQKEY;

export default class Map extends React.Component {
  render () {
    // console.log(this.props.response)
    return (
        <div className="mapContainer">
          <Card 
            // sx={{width: {sx: 1.0,sm: 250, md: 350,},}}
            style={{width: {sx: 1.0,sm: 250, md: 350,},backgroundColor:'var(--green)', border:'3px solid var(--green)'}}>
            <Card.Img 
              variant="top" 
              src={`https://maps.locationiq.com/v3/staticmap?key=${ACCESS_TOKEN}&center=${this.props.response.lat},${this.props.response.lon}&size=600x600&zoom=12&path=fillcolor:%2390EE90|weight:2|color:blue|17.452945,78.380055|17.452765,78.382026|17.452020,78.381375|17.452045,78.380846|17.452945,78.380055`}></Card.Img>
            <Card.Body>
              <Card.Title>{this.props.response.display_name}</Card.Title>
              <Card.Text>{`Latitude: ${this.props.response.lat}`}</Card.Text>
              <Card.Text>{`Longitude: ${this.props.response.lon}`}</Card.Text>
            </Card.Body>
          </Card>
        </div>
    );
  }
}