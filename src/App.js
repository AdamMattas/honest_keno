import React, { Component } from "react";
// import logo from "./logo.svg";
import Machine from "./components/machine";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Honest Keno</h1>
        <Machine />
      </div>
    );
  }
}

export default App;
