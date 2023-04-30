import './Main.css'
import React from 'react'
import MyForm from './form/Form.js';
import axios from 'axios';
import Map from './map/Map.js';

const ACCESS_TOKEN = process.env.REACT_APP_LIQKEY;



export default class Main extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        searchQuery:'apple',
        response:{},
        showResults:true,
        error:null};
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

        //update state with most important city
        this.setState(prevState=> ({...prevState,
                      response:filteredResponseData,
                      showResults:true
                      }));

      } catch (error) {
        this.setState(prevState => ({...prevState,error:error.response.status}));
        console.log(error.response.value);
      };
    };


  render () {
    console.log(this.state);
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
        </div>
      </>
    );
  };
};