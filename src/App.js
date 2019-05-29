import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import logo from "./logo.svg";
import NavBar from "./components/navBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <header className="App-header">
          <h1>Honest Keno</h1>
        </header>
        <main className="container">
          <Switch>
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
