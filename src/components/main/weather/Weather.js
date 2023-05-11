import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WeatherCard from './weatherCard/WeatherCard.js';
import Error from '../error/Error.js'



export default class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  };

  render () {
    let WeatherCardArray = this.props.responseWeather.map((item,idx) => {
      return <Col key={idx}>
                <WeatherCard 
                  name={item.name}
                  description={item.description_F}
                  key={idx}
                  />
              </Col>});
    return(
      <div className='weatherContainer'>
        <h1 className="sectionHeader">Weather Forecast:</h1>
        {this.props.error?

          <Error
            error={this.props.error}
            errorHandler={this.props.errorHandler}
          />:

          <Container>
            <Row className="mainRow">
                {WeatherCardArray}
            </Row>
          </Container>
        }
      </div>
    )
  }
}

