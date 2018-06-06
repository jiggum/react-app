/* external */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from 'registerServiceWorker';

/* internal */
import App from 'component/common/App/App';
import initStore from 'store';

/* feature */
import './index.scss';

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
