import React, { Component } from 'react';
import Steps from './steps/Steps.js';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Campaign Creation</h1>
        </header>
        <Steps></Steps>
      </div>
    );
  }

}

export default App;
