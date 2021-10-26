import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsContainer from './components/NewsContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route key="general" exact path="/"><NewsContainer pageSize={15} country="in" category="general" /></Route>
          <Route key="science" exact path="/science"><NewsContainer pageSize={15} country="in" category="science" /></Route>
          <Route key="business" exact path="/business"><NewsContainer pageSize={15} country="in" category="business" /></Route>
          <Route key="technology" exact path="/technology"><NewsContainer pageSize={15} country="in" category="technology" /></Route>
          <Route key="entertainment" exact path="/entertainment"><NewsContainer pageSize={15} country="in" category="entertainment" /></Route>
        </Switch>
      </Router>
    )
  }
}