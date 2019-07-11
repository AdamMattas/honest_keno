import React, { Component } from "react";
// import logo from "./logo.svg";
import NavBar from "./components/navBar";
import Background from "./components/background";
import Machine from "./components/machine";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Background />
        <h1>Honest Keno</h1>
        <Machine />
      </div>
    );
  }
}

export default App;
