import React, { Component, Suspense, lazy } from 'react';
// import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
const Index = lazy(() => import('../../containers/colorComponents'));
// import Index from '../../containers/colorComponents';
// import Loader from 'react-loader-spinner';

import { Router } from 'react-chrome-extension-router';
class Popup extends Component {
  render() {
    return (
      <Suspense
        fallback={
          <div>
            {/* <Loader
              type="RevolvingDot"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            /> */}
          </div>
        }
      >
        <Router>
          <Index />
        </Router>
      </Suspense>
    );
  }
}

export default Popup;
