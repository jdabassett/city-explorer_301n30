import React from 'react';
import './WeatherCard.css';
import Card from 'react-bootstrap/Card';
import rainyImage from './images/rainy-image_daoudi-aissa.png';
import cloudyImage from './images/cloudy-image_jerome.png';
import sunnyImage from './images/sunny-image_max-saeling.png';
import partlyImage from './images/partly-cloudy-image_sean-oulashin.png';



export default class WeatherCard extends React.Component {
  imagePath = (description) => {
    switch (true){
      case (description.includes('rain')): return rainyImage;
      case (description.includes('sun')): return sunnyImage;
      case (description.includes('cloud')): return cloudyImage;
      default: return partlyImage;
    }
  }

  render () {
    return(
      <div className='weatherContainer'>
          <Card style={{width: '10rem', height:'20rem',backgroundColor:'var(--pink)', border:'3px solid var(--pink)'}}>
            <Card.Img variant="top" src={this.imagePath(this.props.description)} />
            <Card.Body className='cardBody'>
              <Card.Title style={{fontSize:'0.8em',fontWeight:'bold',marginTop:'1em'}}>Date: {this.props.name}</Card.Title>
              <Card.Text style={{fontSize:'0.8em',marginTop:'1em'}}>
                <i style={{fontStyle:'normal', fontWeight:'bold'}}>Forecast:</i> {this.props.description}
                </Card.Text>
            </Card.Body>
          </Card>
      </div>
    )
  }
}

