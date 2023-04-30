import './App.css';
import React from 'react'
import Main from './components/main/Main'
import Header from './components/header/Header'
// import Footer from './components/footer/Footer'


export default class App extends React.Component {
  render () {
    return (
      <>
        <div className="appContainer">
          <Header/>
          <Main/>
          {/* <Footer/> */}
        </div>

      </>
    );
  }
}

