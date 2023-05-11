import './Main.css'
import React from 'react'
import MyForm from './form/Form.js';
import axios from 'axios';
import Map from './map/Map.js';
import Error from './error/Error.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Weather from './weather/Weather.js';
import Movies from './movies/Movies.js';

// import moviesData from '../../data_movies.json';
// import weatherData from '../../data_weather.json';
// import locationData from '../../data_location.json';


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

        errorLocationIQ:null,
        errorWeather:null,
        errorMovies:null
      };
    };

    handlerClearError = (type) => {
      console.log(type);
      switch(type){
        case 'locationIQ': this.setState(prevState => ({...prevState, errorStatus:null})); break;
        case 'weatherBit': this.setState(prevState => ({...prevState, errorStatus:null})); break;
        case 'movies': this.setState(prevState => ({...prevState,errorMovies:null})); break;
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

    handlerSubmit = async(e) => {
      e.preventDefault();
      if (this.state.previousSearchQuery !== this.state.searchQuery){
        console.log('triggered')
        try {
          //fetch data from locationIQ
          let requestData0 = {
            url:`https://us1.locationiq.com/v1/search?key=${LIQKEY_TOKEN}&q=${this.state.searchQuery}&format=json`,
            method:'GET'};
          let responseLocation = await axios(requestData0);

          //filter response to select the most 'important' response
          let filteredResponseLocation = responseLocation.data.sort((a,b)=>b.importance-a.importance)[0]
          let IconUrl = `https://maps.locationiq.com/v3/staticmap?key=${LIQKEY_TOKEN}&center=${filteredResponseLocation.lat},${filteredResponseLocation.lon}&size=600x600&zoom=12&path=fillcolor:%2390EE90|weight:2|color:blue|17.452945,78.380055|17.452765,78.382026|17.452020,78.381375|17.452045,78.380846|17.452945,78.380055`

          // fetch weather data from my server
          let cityName = filteredResponseLocation.display_name.split(",")[0].toLowerCase();
  
          if (cityName !==null || cityName !== undefined){
            // for weather data
            try {
              let requestData1 = {
                url: `${SERVER}/weather?lat=${filteredResponseLocation.lat}&lon=${filteredResponseLocation.lon}&searchQuery=${cityName}`,
                method:'GET'}
              let responseDataWeather = await axios(requestData1);
              // for movie data
              let requestData2 = {
                url: `${SERVER}/movies?searchQuery=${cityName}`,
                method:'GET'}
              let responseDataMovies = await axios(requestData2);
              //update state with most important city
              this.setState(prevState=> ({...prevState,
                responseWeather:responseDataWeather.data,
                responseMovies:responseDataMovies.data
                }));

            } catch (error) {
              this.setState(prevState => ({...prevState,
                previousSearchQuery:'',
                showResults:false,
                responseLocation:{},
                mapQuery:"",
                showError:true,
                responseWeather:[],
                responseMovies:[],
                errorStatus:error.response}));
            }
            }


          //update state with most important city
          this.setState(prevState=> ({...prevState,
                        previousSearchQuery:prevState.searchQuery,
                        responseLocation:filteredResponseLocation,
                        showResults:true,
                        mapQuery:IconUrl,
                        showError:false,
                        errorStatus:null,
                        }));

        } catch (error) {
          this.setState(prevState => ({...prevState,
                                        previousSearchQuery:'',
                                        searchQuery:'',
                                        showResults:false,
                                        responseLocation:{},
                                        mapQuery:"",
                                        showError:true,
                                        responseWeather:[],
                                        errorStatus:error.response}));
        };
    };
    };


  render () {
    // console.log(this.state.errorStatus)
    // console.log(this.state.showError);
    // console.log(this.state.responseWeather);
    // console.log(this.state.responseLocation);
    // console.log(this.state.responseMovies);
    return (
        <div className="mainContainer">
          <Container>
            <Row className="mainRow">
              <Col xs="11" sm="10" md="9" lg="8" className="mainColumn">
                <MyForm 
                  searchQuery={this.state.searchQuery}
                  handlerFormUpdate={this.handlerFormUpdate}
                  handlerSubmit={this.handlerSubmit}
                  displayCelsius={this.displayCelsius}
                  />              
              </Col>
            </Row>
            <Row className="mainRow">
              <Col xs="11" sm="10" md="9" lg="8" className="mainColumn">
                {this.state.showResults?
                  <>
                    {this.state.errorWeather?
                      <Error
                        errorStatus={this.state.errorWeather.status} 
                        handlerClearError={()=>this.handlerClearError('weatherBit')}
                      />:
                      <Weather responseWeather={this.state.responseWeather}/>}

                    <Map responseLocation={this.state.responseLocation}/>

                    {this.state.errorMovies?
                      <Error
                        errorStatus={this.state.errorMovies.status} 
                        handlerClearError={()=>this.handlerClearError('movies')}
                      />:
                      <Movies responseMovies={this.state.responseMovies} />}
                  </>:
                  null
                }
                {this.state.errorLocationIQ?
                  <Error 
                    errorStatus={this.state.errorLocationIQ.status} 
                    handlerClearError={()=>this.handlerClearError('locationIQ')}
                    />:
                    null}                        
              </Col>
            </Row>
          </Container>
        </div>
    );
  };
};