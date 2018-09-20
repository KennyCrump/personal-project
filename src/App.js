import React, { Component } from 'react';
import './App.css';

import Nav from './components/Nav/Nav'
import AddTime from './components/Schedule/AddTime'
import DisplayDay from './components/Schedule/DisplayDay'
import Schedule from './components/Schedule/Schedule'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <AddTime />
        <DisplayDay />
        <Schedule/>
      </div>
    );
  }
}

export default App;
