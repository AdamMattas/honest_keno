import React, { Component } from "react";
import logo from "./logo.svg";
import Card from "./components/common/card";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Honest Keno</h1>
        <Card />
      </React.Fragment>
    );
  }
}

export default App;
