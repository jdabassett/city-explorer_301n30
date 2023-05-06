import './Main.css'
import React from 'react'
import MyForm from './form/Form.js';
import axios from 'axios';
import Map from './map/Map.js';
import Error from './error/Error.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ACCESS_TOKEN = process.env.REACT_APP_LIQKEY;



export default class Main extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        searchQuery:'',
        responseLocation:{},
        mapQuery:'',
        showResults:false,
        showError:false,
        errorStatus:{},
        responseWeather:[]
      };
    };

    handlerClearError = () => {
      this.setState(prevState => ({...prevState,
                                    showError:false,
                                    errorStatus:null}))
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
      try {
        //fetch data from locationIQ
        let requestData0 = {
          url:`https://us1.locationiq.com/v1/search?key=${ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`,
          method:'GET'};
        let responseLocation = await axios(requestData0);

        //filter response to select the most 'important' response
        let filteredResponseLocation = responseLocation.data.sort((a,b)=>b.importance-a.importance)[0]
        let IconUrl = `https://maps.locationiq.com/v3/staticmap?key=${ACCESS_TOKEN}&center=${filteredResponseLocation.lat},${filteredResponseLocation.lon}&size=600x600&zoom=12&path=fillcolor:%2390EE90|weight:2|color:blue|17.452945,78.380055|17.452765,78.382026|17.452020,78.381375|17.452045,78.380846|17.452945,78.380055`

        // fetch weather data from my server
        let cityName = filteredResponseLocation.display_name.split(",")[0].toLowerCase();
        let requestData1 = {
          url: `http://localhost:3001/weather?lat=${filteredResponseLocation.lat}&lon=${filteredResponseLocation.lon}&searchQuery=${cityName}`,
          method:'GET'}
        let responseDataWeather = await axios(requestData1);


        //update state with most important city
        this.setState(prevState=> ({...prevState,
                      searchQuery:"",
                      responseLocation:filteredResponseLocation ||{},
                      showResults:true,
                      mapQuery:IconUrl,
                      showError:false,
                      errorStatus:null,
                      responseWeather:responseDataWeather.data||[]
                      }));

      } catch (error) {
        this.setState(prevState => ({...prevState,
                                      showResults:false,
                                      responseLocation:{},
                                      mapQuery:"",
                                      showError:true,
                                      responseWeather:[],
                                      errorStatus:error.response}));
      };
    };


  render () {
    // console.log(this.state.errorStatus)
    // console.log(typeof(this.state.error));
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
                  <Map
                    responseLocation={this.state.responseLocation}
                  />:
                  null
                }
                {this.state.showError?
                  <Error 
                    errorStatus={this.state.errorStatus} 
                    handlerClearError={this.handlerClearError}
                    />:
                    null}                        
              </Col>
            </Row>
          </Container>
        </div>
    );
  };
};