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
        response:{},
        mapQuery:'',
        showResults:false,
        showError:false,
        errorStatus:{}};
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
        //make request object
        let requestData = {
          url:`https://us1.locationiq.com/v1/search?key=${ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`,
          method:'GET'
        };
        

        //fetch data
        let responseData = await axios(requestData);

        //filter response to select the most 'important' response
        let filteredResponseData = responseData.data.sort((a,b)=>b.importance-a.importance)[0]

        let IconUrl = `https://maps.locationiq.com/v3/staticmap?key=${ACCESS_TOKEN}&center=${filteredResponseData.lat},${filteredResponseData.lon}&size=600x600&zoom=12&path=fillcolor:%2390EE90|weight:2|color:blue|17.452945,78.380055|17.452765,78.382026|17.452020,78.381375|17.452045,78.380846|17.452945,78.380055`

        //update state with most important city
        this.setState(prevState=> ({...prevState,
                      searchQuery:"",
                      response:filteredResponseData,
                      showResults:true,
                      mapQuery:IconUrl,
                      showError:false,
                      errorStatus:null
                      }));

      } catch (error) {
        this.setState(prevState => ({...prevState,
                                      showResults:false,
                                      response:{},
                                      mapQuery:"",
                                      showError:true,
                                      errorStatus:error.response}));
        // console.log(error.response.value);
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
                    response={this.state.response}
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