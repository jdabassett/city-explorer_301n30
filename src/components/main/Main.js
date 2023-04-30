import './Main.css'
import React from 'react'
import MyForm from './form/Form.js';
import axios from 'axios';
import Map from './map/Map.js';
import Error from './error/Error.js'

const ACCESS_TOKEN = process.env.REACT_APP_LIQKEY;



export default class Main extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        searchQuery:'apple',
        response:{},
        mapQuery:'',
        showResults:false,
        errorStatus:null};
    };

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
                      errorStatus:null
                      }));

      } catch (error) {
        this.setState(prevState => ({...prevState,errorStatus:error.response}));
        // console.log(error.response.value);
      };
    };


  render () {
    console.log(this.state.errorStatus)
    // console.log(typeof(this.state.error));
    return (
      <>
        <div className="mainContainer">
          <MyForm 
            searchQuery={this.state.searchQuery}
            handlerFormUpdate={this.handlerFormUpdate}
            handlerSubmit={this.handlerSubmit}
            />
          {this.state.showResults?
            <Map
              response={this.state.response}
            />:
            null
          }
          {this.state.error?
            <Error 
            errorStatus={this.state.error} />:
            null          }
        </div>
      </>
    );
  };
};