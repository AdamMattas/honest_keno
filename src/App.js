import React, { Component } from "react";
import logo from "./logo.svg";
import CardTable from "./components/common/cardTable";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Honest Keno</h1>
        <CardTable />
      </React.Fragment>
    );
  }
}

export default App;
