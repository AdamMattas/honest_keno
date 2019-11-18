import React, { Component } from "react";
// import logo from "./logo.svg";
import NavBar from "./components/navBar";
import Background from "./components/background";
import Machine from "./components/machine";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Background />
        <Machine />
      </React.Fragment>
    );
  }
}

export default App;
