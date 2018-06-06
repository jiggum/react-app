/* external */
import React, { PureComponent } from 'react';

/* internal */
import RouteSample from 'component/common/RouteSample/RouteSample';

/* asset */
import logo from 'asset/common/logo.svg';

/* feature */
import './App.css';

class App extends PureComponent {
  render() {
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
