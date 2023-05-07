import './Error.css';
import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default class Error extends React.Component {
  render () {
    let errorStatusCode = parseInt(this.props.errorStatus.status);
    let errorResponse = () => {switch (true){
      case (300< errorStatusCode && errorStatusCode< 400): return <p>The server is telling us that the address we are using is no longer the correct location for the services we are looking for.</p>;
      case (400< errorStatusCode && errorStatusCode< 500): return <p>The server is telling us that the text we send in a search doesn't match any of their records. Either it is misspelled or isn't in their database.</p>;
      case (500< errorStatusCode && errorStatusCode< 600): return <p>Oh this is a rare error. The server recieved our request and refuses to share data with us. At least the problem isn't on our end of things.</p>;
      default: return null;
    }}
    // console.log(this.props.errorStatus.status);
    // console.log(typeof(errorStatusCode))
    return (
        <div className="errorContainer">
          <Alert 
            variant="danger" 
            onClose={this.props.handlerClearError} 
            dismissible
            >
            <Alert.Heading>{`Oh no! You got a ${this.props.errorStatus.status} error!`}</Alert.Heading>
            {errorResponse()}
          </Alert>
        </div>
    );
  }
}