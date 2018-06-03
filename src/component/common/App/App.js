import React, { Component } from 'react';
import logo from '../../../asset/common/logo.svg';
import RouteSample from '../RouteSample/RouteSample';
import './App.css';

class App extends Component {
  render() {
    debugger
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RouteSample />
      </div>
    );
  }
}

export default App;
