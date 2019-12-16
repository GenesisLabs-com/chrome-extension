import React, { Component, Suspense, lazy } from 'react';
// import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
const Index = lazy(() => import('../../containers/colorComponents'));
// import Index from '../../containers/colorComponents';

import { Router } from 'react-chrome-extension-router';
class Popup extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loadinggg</div>}>
        <Router>
          <Index />
        </Router>
      </Suspense>
    );
  }
}

export default Popup;
