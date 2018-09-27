import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoContainer from './containers/PhotoContainer';
import Header from './common/Header';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <PhotoContainer />
      </div>
    );
  }
}

export default App;
