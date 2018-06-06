/* external */
import React, { PureComponent } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

/* internal */
import Navigation from 'component/common/Navigation/Navigation';
import Example from 'container/common/Example/Example';

/* asset */

/* feature */
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Route path="/example" component={Example} />
        </div>
      </Router>
    );
  }
}

export default App;
