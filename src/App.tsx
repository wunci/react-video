import React, { Component } from "react";
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";
import Login from "./pages/Login/login";
import Me from "./pages/Me/me";
import More from "./pages/More/more";
import Search from "./pages/Search/searchPage";
import Toast from "./common/Toast/Toast";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  // constructor(props){
  //   super(props)
  // }
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <Toast />
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/video/:id" component={Detail} />
            <Route path="/login" component={Login} />
            <Route path="/me" component={Me} />
            <Route path="/movie" component={More} />
            <Route path="/tv" component={More} />
            <Route path="/zy" component={More} />
            <Route path="/all" component={More} />
            <Route path="/search" component={Search} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state: { toast: Object }) {
  return {
    toast: state.toast
  };
}

function mapDispatchToProps(dispatch: Object) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
