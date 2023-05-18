import React from 'react';
import Error from '../error/Error.js';
import './BusinessesCarousel.css';
import Carousel from 'react-bootstrap/Carousel';



export default class BusinessesCarousel extends React.Component {


  render () {
    // console.log(this.state.activeKey);
    let BusinessArray= this.props.responseBusinesses.map((item,idx) => {
      return  <Carousel.Item className="carouselItem" interval={5000} key={idx}>
                  <img
                    style={{maxHeight:'300px',objectFit:'cover'}}
                    className="d-block w-100"
                    src={`${item.image_url}`}
                    alt={`${item.name}`}
                  />
                  <Carousel.Caption>
                    <div className="carouselCaption">
                      <h3><a className="carouselTitle" 
                        href={item.url}>{item.name}</a></h3>
                      <p>{`${item.rating} rating with ${item.review_count} reviews`}</p>
                      <p>{`Price: ${item.price}`}</p>
                      <p>{`Location: ${item.location.join(" ")}`}</p>
                      <p onClick={()=>navigator.clipboard.writeText(`${item.phone}`)}>
                        {`Phone Number: ${item.display_phone}`}</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
      
              });
    // console.log(this.props.responseBusinesses);
    return(

      <div className="carouselContainer">
        <h1 className="sectionHeader">Great Restaurants:</h1>
        {this.props.error?

          <Error
            error={this.props.error}
            errorHandler={this.props.errorHandler}
          />:
          <Carousel>
            {BusinessArray}
          </Carousel>
          }
      </div>
    )
  }
}
