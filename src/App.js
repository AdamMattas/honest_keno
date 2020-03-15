import React, { Component } from "react";
import ReactGA from "react-ga";
//import { createBrowserHistory } from "history";
// import logo from "./logo.svg";
import Navbar from "./components/navBar";
import Background from "./components/background";
import Machine from "./components/machine";
import "./App.scss";

ReactGA.initialize("159342205");

//const history = createBrowserHistory();

// useEffect(() => {
// Initialize google analytics page view tracking
// history.listen(location => {
//   ReactGA.set({ page: location.pathname }); // Update the user's current page
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });
// });

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Background />
        <Machine />
      </React.Fragment>
    );
  }
}

export default App;
