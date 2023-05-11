import React from 'react';
import MovieCard from './movieCard/MovieCard.js';
import Accordion from 'react-bootstrap/Accordion';
import './Movies.css';
import Error from '../error/Error.js'



export default class Movies extends React.Component {
  constructor(props){
    super(props);
    this.state = {activeKey:null};
  };

  handlerSetActiveKey = (key) => {
    if (key===this.state.activeKey){
      this.setState(prevState => ({...prevState,activeKey:null}));
    } else {
      this.setState(prevState => ({...prevState,activeKey:key}));
    }
  }

  render () {
    // console.log(this.state.activeKey);
    let MovieCardArray = this.props.responseMovies.map((item,idx) => {
      return  <MovieCard 
                key={idx} 
                item={item} 
                eventKey={`${idx}`} 
                handlerSetActiveKey={()=>this.handlerSetActiveKey(`${idx}`)}/>
              });
    return(
      <div className="accordionContainer">
        <h1 className="sectionHeader">Featured In:</h1>
        {this.props.error?
          <Error
            error={this.props.error}
            errorHandler={this.props.errorHandler}
          />:
          <Accordion 
            activeKey={this.state.activeKey}>
            {MovieCardArray}
          </Accordion>
        }
      </div>
    )
  }
}
