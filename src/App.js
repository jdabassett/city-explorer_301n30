import './App.css';
import React from 'react'
import Main from './components/main/Main.js'
import Header from './components/header/Header.js'
import Footer from './components/footer/Footer.js'

export default class App extends React.Component {
  render () {
    return (
      <>
        <div className="appContainer">
          <Header/>
          <Main/>
          <Footer/>
        </div>

      </>
    );
  }
}

