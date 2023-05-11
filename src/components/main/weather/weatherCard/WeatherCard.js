import React from 'react';
import './WeatherCard.css';
import Card from 'react-bootstrap/Card';


export default class WeatherCard extends React.Component {
  imagePath = (description) => {
    switch (true){
      case (description.includes('rain')): return "/images/rainy-image_daoudi-aissa.png";
      case (description.includes('sun')): return "/images/sunny-image_max-saeling.png";
      case (description.includes('cloud')): return "/images/cloudy-image_jerome.png";
      default: return "/images/partly-cloudy-image_sean-oulashin.png";
    }
  }

  render () {
    return(
      <div className='weatherContainer'>
          <Card style={{width: '10rem', height:'20rem',backgroundColor:'var(--pink)', border:'3px solid var(--pink)'}}>
            <Card.Img variant="top" src={this.imagePath(this.props.description)} />
            <Card.Body className='cardBody'>
              <Card.Title style={{fontSize:'0.8em',fontWeight:'bold'}}>Date: {this.props.name}</Card.Title>
              <Card.Text style={{fontSize:'0.8em'}}>
                <i style={{fontStyle:'normal', fontWeight:'bold'}}>Forecast:</i> {this.props.description}
                </Card.Text>
            </Card.Body>
          </Card>
      </div>
    )
  }
}

