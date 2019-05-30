import React, { Component } from "react";
import logo from "./logo.svg";
import Card from "./components/card";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Honest Keno</h1>
        <Card />
      </div>
    );
  }
}

export default App;
