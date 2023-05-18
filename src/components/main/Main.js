import './Main.css'
import React from 'react'
import MyForm from './form/Form.js';
import axios from 'axios';
import Map from './map/Map.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Weather from './weather/Weather.js';
import Movies from './movies/Movies.js';
import BusinessesCarousel from './businessCarousel/BusinessesCarousel.js';

// import moviesData from '../../data_movies.json';
// import weatherData from '../../data_weather.json';
// import locationData from '../../data_location.json';
// import businessesData from '../../data_businesses.json';


//import global variables
const LIQKEY_TOKEN = process.env.REACT_APP_LIQKEY;
const SERVER = process.env.REACT_APP_SERVER;

export default class Main extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        previousSearchQuery:'',
        mapQuery:'',
        searchQuery:'',

        showResults:false,
        responseLocation:{},
        responseWeather:[],
        responseMovies:[],
        responseBusinesses:[],

        errorLocation:null,
        errorWeather:null,
        errorMovies:null,
        errorBusinesses:null
      };
    };

    handlerClearError = (type) => {
      console.log('clear error handler');
      switch(type){
        case 'location': this.setState(prevState => ({...prevState,           
                errorLocation:null,
                showResults:true})); 
                break;
        case 'weather': this.setState(prevState => ({...prevState, 
                errorWeather:null,
                showResults:true})); 
                break;
        case 'movies': this.setState(prevState => ({...prevState,
                errorMovies:null,
                showResults:true})); 
                break;
        case 'businesses': this.setState(prevState => ({...prevState,
                errorBusinesses:null,
                showResults:true})); 
                break;
        default: break;
      };
    }

    handlerFormUpdate = (e) => {
      e.preventDefault();
      if(e.target.value){
        this.setState(prevState=>({...prevState,searchQuery:e.target.value}))
        // console.log(e.target.value);
      };
    };

    // for weather data
    weatherRequest = async(lat,lon) => {
        let requestWeather = {
          url: `${SERVER}/weather?lat=${lat}&lon=${lon}`,
          method:'GET'}
        axios(requestWeather)
          .then(res => this.setState(prevState => ({
            ...prevState,
            responseWeather:res.data,
            errorWeather:null})))
          .catch(error=> this.setState(prevState => ({
            ...prevState,
            responseWeather:[],
            errorWeather:error.response})))
    }
    
    // for movie data
    moviesRequest = (cityName) => {
      let requestMovies = {
        url: `${SERVER}/movies?searchQuery=${cityName}`,
        method:'GET'}
      axios(requestMovies)
        .then(res => this.setState(prevState => ({
          ...prevState,
          responseMovies:res.data,
          errorMovies:null})))
        .catch(error => this.setState(prevState => ({
          ...prevState,
          responseMovies:[],
          errorMovies:error.response})))
    }

    // for weather data
    businessesRequest = async(cityName) => {
      let requestBusinesses = {
        url: `${SERVER}/businesses?searchQuery=${cityName}`,
        method:'GET'}
      axios(requestBusinesses)
        .then(res => this.setState(prevState => ({
          ...prevState,
          responseBusinesses:res.data,
          errorBusinesses:null})))
        .catch(error=> this.setState(prevState => ({
          ...prevState,
          responseBusinesses:[],
          errorBusinesses:error.response})))
  }

    handlerSubmit = async(e) => {

      e.preventDefault();
        let requestLocation = {
          url:`https://us1.locationiq.com/v1/search?key=${LIQKEY_TOKEN}&q=${this.state.searchQuery}&format=json`,
          method:'GET'};
        
        axios(requestLocation)
          .then(res => res.data.sort((a,b)=> b.importance-a.importance)[0])
          .then(filteredObject => { 
                this.setState(prevState=> ({...prevState,
                          previousSearchQuery:prevState.searchQuery,
                          mapQuery:`https://maps.locationiq.com/v3/staticmap?key=${LIQKEY_TOKEN}&center=${filteredObject.lat},${filteredObject.lon}&size=600x600&zoom=12&path=fillcolor:%2390EE90|weight:2|color:blue|17.452945,78.380055|17.452765,78.382026|17.452020,78.381375|17.452045,78.380846|17.452945,78.380055`,
                          searchQuery:filteredObject.display_name.split(",")[0],
                          showResults:true,
                          responseLocation:filteredObject,
                          errorLocation:null,}));

                let cityName = filteredObject.display_name.split(",")[0].toLowerCase();
                let lat = filteredObject.lat;
                let lon = filteredObject.lon;
                this.weatherRequest(lat,lon);
                this.moviesRequest(cityName);  
                this.businessesRequest(cityName);        
          })
          .catch(error => this.setState((prevState) => ({
              ...prevState,
              previousSearchQuery:'',
              mapQuery:"",
              searchQuery:'',
              showResults:true,
              responseLocationIQ:{},
              responseWeather:[],
              responseMovies:[],
              errorLocation:error.response
          })))
        



    };


  render () {
    // console.log(this.state.responseBusinesses);
    return (
        <div className="mainContainer">
          <Container>
            <Row className="mainRow">
              <Col xs="11" sm="10" md="9" lg="8" className="mainColumn">
                <MyForm 
                  searchQuery={this.state.searchQuery}
                  handlerFormUpdate={this.handlerFormUpdate}
                  handlerSubmit={this.handlerSubmit}
                  />              
              </Col>
            </Row>
            <Row className="mainRow">
              <Col xs="11" sm="10" md="9" lg="8" className="mainColumn">
                {this.state.showResults?
                  <>
                    <Weather 
                      error={this.state.errorWeather}
                      errorHandler={()=>this.handlerClearError('weather')}
                      responseWeather={this.state.responseWeather}/>

                    <Map 
                      error={this.state.errorLocationIQ}
                      errorHandler={()=>this.handlerClearError('location')}
                      responseLocation={this.state.responseLocation}/>

                    <BusinessesCarousel
                      error={this.state.errorBusinesses}
                      errorHandler={()=>this.handlerClearError('businesses')}
                      responseBusinesses={this.state.responseBusinesses} /> 

                    <Movies 
                      error={this.state.errorMovies}
                      errorHandler={()=>this.handlerClearError('movies')}
                      responseMovies={this.state.responseMovies} />
                  </>:
                  null
                }
               
              </Col>
            </Row>
          </Container>
        </div>
    );
  };
};