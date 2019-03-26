import React, { Component } from 'react';
import './App.css';

import Nav from './components/Nav/Nav'
// import AddTime from './components/Schedule/AddTime'
// import DisplayDay from './components/Schedule/DisplayDay'
// import Schedule from './components/Schedule/Schedule'

import routes from './routes'

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Nav />
        {/* <DisplayDay /> */} 
        {/* <Schedule/> */}
        {routes}
      </div>
    );
  }
}

export default App;
