import React, { Component } from 'react';
// import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import Index from '../../containers/colorComponents';

import { Router } from 'react-chrome-extension-router';
class Popup extends Component {
  render() {
    return (
      <Router>
        <Index />
      </Router>
    );
  }
}

export default Popup;
