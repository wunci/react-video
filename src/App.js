import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home/home'
import Detail from './pages/Detail/detail'
import Login from './pages/Login/login'
import Me from './pages/Me/me'
import {
  BrowserRouter as Router,
  Route,
  // Switch,
  // Redirect
} from 'react-router-dom'
class App extends Component {
  // constructor(props){
  //   super(props)
  // }
  render() {
    return (
      <div className="App">

          <Router>
            <div>
              <Route exact path='/' component={Home}/>
              <Route path='/home' component={Home}/>
              <Route path='/video/:id' component={Detail}/>
              <Route path='/login' component={Login}/>
              <Route path='/me' component={Me}/>

            </div>
          </Router>
      </div>
    );
  }
}

export default App;
