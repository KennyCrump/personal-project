import React, { Component } from 'react';
import './App.css';

import Nav from './components/Nav/Nav'
import Schedule from './components/Schedule/Schedule'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Schedule />
      </div>
    );
  }
}

export default App;
